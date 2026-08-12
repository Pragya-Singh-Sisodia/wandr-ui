import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DESTINATIONS } from '../../../../core/constants/destinations';
import { Destination } from '../../../../shared/models/destination.model';
import { inject } from '@angular/core';
@Component({
  selector: 'app-destination-details',
  imports: [],
  templateUrl: './destination-details.html',
  styleUrl: './destination-details.css',
})
export class DestinationDetails implements OnInit {private route = inject(ActivatedRoute);
  destination?: Destination;
  ngOnInit() {

  const id = Number(this.route.snapshot.paramMap.get('id'));

  this.destination = DESTINATIONS.find(
    destination => destination.id === id
  );

}
}


