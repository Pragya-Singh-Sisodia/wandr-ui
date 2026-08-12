import { Component, input } from '@angular/core';
import { Destination } from '../../models/destination.model';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-destination-card',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './destination-card.html'
})
export class DestinationCardComponent {

  destination = input.required<Destination>();

}