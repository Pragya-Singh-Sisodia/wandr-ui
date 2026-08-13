import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DESTINATIONS } from '../../../../core/constants/destinations';

import { WeatherService } from './services/weather.service';
import { WeatherData } from './models/weather.model';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './weather.html',
  styleUrl: './weather.css',
})
export class Weather {

  private weatherService = inject(WeatherService);

  destinations = DESTINATIONS;

  selectedDestination = '';

  weatherData?: WeatherData;

  isLoading = false;

  errorMessage = '';

checkWeather() {

  console.log(
    'Check Weather clicked:',
    this.selectedDestination
  );

  if (!this.selectedDestination) {

    this.errorMessage =
      'Please select a destination first.';

    this.weatherData = undefined;

    return;

  }

  this.isLoading = true;

  this.errorMessage = '';

  this.weatherData = undefined;

  try {

    this.weatherData =
      this.weatherService.getWeather(
        this.selectedDestination
      );

  } catch (error) {

    console.error(
      'Weather loading failed:',
      error
    );

    this.errorMessage =
      'Unable to load weather information. Please try again.';

  } finally {

    this.isLoading = false;

  }

}

}