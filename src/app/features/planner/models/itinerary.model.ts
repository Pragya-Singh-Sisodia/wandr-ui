export interface ItineraryDay {

  day: number;

  title: string;

  description: string;

}

export interface BudgetBreakdown {

  transport: number;

  stay: number;

  food: number;

  activities: number;

}

export interface Itinerary {

  title: string;

  days: ItineraryDay[];

  estimatedBudget: BudgetBreakdown;

  packingList: string[];

}