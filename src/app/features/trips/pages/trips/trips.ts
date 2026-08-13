import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TripsService } from '../../services/trips.service';
import { SavedTrip } from '../../models/saved-trip.model';

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [],
  templateUrl: './trips.html',
  styleUrl: './trips.css',
})
export class Trips implements OnInit {

  private tripsService = inject(TripsService);

  private router = inject(Router);

  savedTrips: SavedTrip[] = [];
  selectedTrip?: SavedTrip;

  ngOnInit() {

    this.loadTrips();

  }

  loadTrips() {

    this.savedTrips =
      this.tripsService.getTrips();

  }

  goToPlanner() {

    this.router.navigate(['/planner']);

  }

 deleteTrip(id: string) {

  this.tripsService.deleteTrip(id);

  if (this.selectedTrip?.id === id) {

    this.selectedTrip = undefined;

  }

  this.loadTrips();

}
  viewTrip(trip: SavedTrip) {

  this.selectedTrip = trip;

}

}