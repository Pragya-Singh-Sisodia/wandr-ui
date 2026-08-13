import { Injectable } from '@angular/core';

import {
  WeatherData,
  WeatherDay
} from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  getWeather(location: string): WeatherData {

    const days: WeatherDay[] = [

      {
        date: '2026-08-13',
        temperature: 27,
        feelsLike: 28,
        condition: 'Partly Cloudy',
        precipitationChance: 30,
        humidity: 72,
        windSpeed: 12
      },

      {
        date: '2026-08-14',
        temperature: 26,
        feelsLike: 27,
        condition: 'Cloudy',
        precipitationChance: 45,
        humidity: 76,
        windSpeed: 14
      },

      {
        date: '2026-08-15',
        temperature: 25,
        feelsLike: 26,
        condition: 'Light Rain',
        precipitationChance: 65,
        humidity: 82,
        windSpeed: 16
      },

      {
        date: '2026-08-16',
        temperature: 27,
        feelsLike: 28,
        condition: 'Partly Cloudy',
        precipitationChance: 35,
        humidity: 70,
        windSpeed: 11
      }

    ];

    return {

      location: location,

      days: days

    };

  }

}