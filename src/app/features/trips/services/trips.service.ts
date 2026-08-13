import { Injectable, inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { SavedTrip } from '../models/saved-trip.model';

@Injectable({
  providedIn: 'root'
})
export class TripsService {

  private readonly storageKey = 'wandr_saved_trips';

  private platformId = inject(PLATFORM_ID);

  getTrips(): SavedTrip[] {

    if (!isPlatformBrowser(this.platformId)) {

      return [];

    }

    const storedTrips =
      localStorage.getItem(this.storageKey);

    if (!storedTrips) {

      return [];

    }

    try {

      return JSON.parse(storedTrips) as SavedTrip[];

    } catch (error) {

      console.error(
        'Unable to load saved trips:',
        error
      );

      return [];

    }

  }

  saveTrip(trip: SavedTrip): void {

    if (!isPlatformBrowser(this.platformId)) {

      return;

    }

    const trips = this.getTrips();

    trips.push(trip);

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(trips)
    );

  }

  deleteTrip(id: string): void {

    if (!isPlatformBrowser(this.platformId)) {

      return;

    }

    const trips =
      this.getTrips().filter(
        trip => trip.id !== id
      );

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(trips)
    );

  }

}