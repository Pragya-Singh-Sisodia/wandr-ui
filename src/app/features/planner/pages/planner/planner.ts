import { Component } from '@angular/core';

import {
  TRANSPORT_OPTIONS,
  STAY_OPTIONS,
  INTEREST_OPTIONS
} from '../../constants/planner-options';
import { DESTINATIONS } from '../../../../core/constants/destinations';
import { Destination } from '../../../../shared/models/destination.model';
import { Itinerary } from '../../models/itinerary.model';
import { PlannerService } from '../../services/planner.service';
import { inject } from '@angular/core';
import { PlannerForm } from '../../models/planner-form.model';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
@Component({
  selector: 'app-planner',
   standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './planner.html',
  styleUrl: './planner.css',
})
export class Planner { 
  errorMessage = '';
  isLoading = false;
  private plannerService = inject(PlannerService);
  generatedTrip?: Itinerary;
  destinations: Destination[] = DESTINATIONS;
  selectedInterests: string[] = [];
  transportOptions = TRANSPORT_OPTIONS;

stayOptions = STAY_OPTIONS;

interestOptions = INTEREST_OPTIONS;
plannerForm = new FormGroup({

  from: new FormControl('', Validators.required),

  destination: new FormControl('', Validators.required),

  startDate: new FormControl('', Validators.required),

  endDate: new FormControl('', Validators.required),

  budget: new FormControl('', [
    Validators.required,
    Validators.min(1)
  ]),

  travelers: new FormControl(1, [
    Validators.required,
    Validators.min(1)
  ]),

  transport: new FormControl('Car', Validators.required),

  stay: new FormControl('Hotel', Validators.required),

  interests: new FormControl([])

});
showFormValue() {

  if (this.plannerForm.invalid) {

    this.plannerForm.markAllAsTouched();

    return;

  }

  this.errorMessage = '';
  this.isLoading = true;

  const form: PlannerForm = {

    from: this.plannerForm.value.from ?? '',

    destination: this.plannerForm.value.destination ?? '',

    startDate: this.plannerForm.value.startDate ?? '',

    endDate: this.plannerForm.value.endDate ?? '',

    budget: Number(this.plannerForm.value.budget ?? 0),

    travelers: Number(this.plannerForm.value.travelers ?? 1),

    transport: this.plannerForm.value.transport ?? 'Car',

    stay: this.plannerForm.value.stay ?? 'Hotel',

    interests: this.selectedInterests

  };

  try {

    this.generatedTrip =
      this.plannerService.generateTrip(form);

    console.log('Generated trip:', this.generatedTrip);

  } catch (error) {

    console.error('Trip generation failed:', error);

    this.generatedTrip = undefined;

    this.errorMessage =
      'Unable to generate your itinerary. Please try again.';

  } finally {

    this.isLoading = false;

  }

}
onInterestChange(event: Event, interest: string) {

  const checked = (event.target as HTMLInputElement).checked;

  if (checked) {

    this.selectedInterests.push(interest);

  } else {

    this.selectedInterests =
      this.selectedInterests.filter(i => i !== interest);

  }

}
}
