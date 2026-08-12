import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-title',
  standalone: true,
  templateUrl: './section-title.html'
})
export class SectionTitleComponent {

  title = input.required<string>();

  subtitle = input.required<string>();

}