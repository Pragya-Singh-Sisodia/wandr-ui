import { Component } from '@angular/core';
import { HOME_CONTENT } from '../../../../core/constants/home-content';
import { SectionTitleComponent } from '../../../../shared/components/section-title/section-title';
import { DestinationCardComponent } from '../../../../shared/components/destination-card/destination-card';
import { DESTINATIONS } from '../../../../core/constants/destinations';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ SectionTitleComponent,DestinationCardComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  content = HOME_CONTENT;
  destinations = DESTINATIONS;
}