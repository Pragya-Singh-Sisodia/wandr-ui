export interface WeatherDay {

  date: string;

  temperature: number;

  feelsLike: number;

  condition: string;

  precipitationChance: number;

  humidity: number;

  windSpeed: number;

}

export interface WeatherData {

  location: string;

  days: WeatherDay[];

}