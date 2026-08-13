import { Itinerary } from '../../planner/models/itinerary.model';

export interface SavedTrip {

  id: string;

  destination: string;

  from: string;

  startDate: string;

  endDate: string;

  travelers: number;

  transport: string;

  stay: string;

  itinerary: Itinerary;

}