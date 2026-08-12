import { Routes } from '@angular/router';

import { MainLayout } from './layouts/main-layout/main-layout';

import { Home } from './features/home/pages/home/home';
import { Planner } from './features/planner/pages/planner/planner';
import { Weather } from './features/weather/pages/weather/weather';
import { Assistant } from './features/assistant/pages/assistant/assistant';
import { Trips } from './features/trips/pages/trips/trips';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        component: Home
      },
      {
    path: 'destinations/:id',
    loadComponent: () =>
        import('./features/destinations/pages/destination-details/destination-details')
            .then(m => m.DestinationDetails)
},
      {
  path: 'planner',
  loadComponent: () =>
    import('./features/planner/pages/planner/planner')
      .then(m => m.Planner)
},
      {
        path: 'weather',
        component: Weather
      },
      {
        path: 'assistant',
        component: Assistant
      },
      {
        path: 'trips',
        component: Trips
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];