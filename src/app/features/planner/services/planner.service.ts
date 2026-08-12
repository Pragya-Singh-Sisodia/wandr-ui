import { Injectable } from '@angular/core';

import { PlannerForm } from '../models/planner-form.model';
import { Itinerary,ItineraryDay } from '../models/itinerary.model';

@Injectable({
  providedIn: 'root'
})
export class PlannerService {

generateTrip(form: PlannerForm): Itinerary {

  const travelers = Number(form.travelers) || 1;
  const budget = Number(form.budget) || 0;

  // Calculate number of trip days
  const startDate = new Date(form.startDate);
  const endDate = new Date(form.endDate);

  const differenceInTime =
    endDate.getTime() - startDate.getTime();

  const calculatedDays =
    Math.floor(differenceInTime / (1000 * 60 * 60 * 24)) + 1;

  const tripDays =
    Math.max(1, calculatedDays);

  // Transport
  let transportPerPerson = 2500;

  if (form.transport === 'Bus') {
    transportPerPerson = 1200;
  }

  if (form.transport === 'Train') {
    transportPerPerson = 1800;
  }

  if (form.transport === 'Bike') {
    transportPerPerson = 1000;
  }

  const transport =
    transportPerPerson * travelers;

  // Stay
  let stayPerPersonPerNight = 4500;

  if (form.stay === 'Hostel') {
    stayPerPersonPerNight = 2000;
  }

  if (form.stay === 'Resort') {
    stayPerPersonPerNight = 7000;
  }

  const nights =
    Math.max(0, tripDays - 1);

  const stay =
    stayPerPersonPerNight *
    travelers *
    nights;

  // Food
  const food =
    1000 *
    travelers *
    tripDays;

  // Activities
  const activityCount =
    form.interests?.length ?? 0;

  const activities =
    Math.max(
      1000,
      activityCount * 750
    ) *
    travelers;

  const estimatedTotal =
    transport +
    stay +
    food +
    activities;

  // Keep estimated cost within user's budget
  let finalTransport = transport;
  let finalStay = stay;
  let finalFood = food;
  let finalActivities = activities;

  if (
    budget > 0 &&
    estimatedTotal > budget
  ) {

    const scale =
      budget / estimatedTotal;

    finalTransport =
      Math.round(transport * scale);

    finalStay =
      Math.round(stay * scale);

    finalFood =
      Math.round(food * scale);

    finalActivities =
      Math.round(activities * scale);

  }

  // Generate itinerary
  const days: ItineraryDay[] = [];

  for (let day = 1; day <= tripDays; day++) {

    if (day === 1) {

      days.push({

        day: day,

        title: 'Arrival',

        description:
          `Travel from ${form.from} to ${form.destination} by ${form.transport} and check into your ${form.stay}.`

      });

    } else if (day === tripDays) {

      days.push({

        day: day,

        title: 'Departure',

        description:
          `Enjoy breakfast, do some shopping in ${form.destination} and begin your return journey to ${form.from}.`

      });

    } else {

  let description =
    `Explore famous attractions in ${form.destination}, enjoy local cuisine and discover the local markets.`;

  const interests = form.interests ?? [];

  if (interests.includes('Nature')) {

    description =
      `Explore the natural beauty of ${form.destination}, visit scenic viewpoints and enjoy the surrounding landscapes.`;

  }

  if (interests.includes('Adventure')) {

    description =
      `Enjoy an adventurous day in ${form.destination}, with outdoor activities, scenic trails and exciting experiences.`;

  }

  if (interests.includes('History')) {

    description =
      `Discover the history of ${form.destination}, by visiting forts, heritage sites and historically significant places.`;

  }

  if (interests.includes('Food')) {

    description =
      `Experience the local food culture of ${form.destination}, by trying regional dishes, popular eateries and traditional cuisine.`;

  }

  if (interests.includes('Culture')) {

    description =
      `Experience the culture of ${form.destination}, through local traditions, markets, temples and cultural landmarks.`;

  }

  days.push({

    day: day,

    title: `Explore ${form.destination}`,

    description: description

  });

}

  }

  const activitiesList =
    form.interests ?? [];

  return {

    title: `${form.destination} Trip`,

    days: days,

    estimatedBudget: {

      transport: finalTransport,

      stay: finalStay,

      food: finalFood,

      activities: finalActivities

    },

    packingList: [

      'Identity Card',

      'Power Bank',

      'Water Bottle',

      'Comfortable Shoes',

      'Camera',

      ...(activitiesList.includes('Trekking')
        ? ['Trekking Shoes']
        : []),

      ...(activitiesList.includes('Beach')
        ? ['Sunscreen']
        : [])

    ]

  };

}

}