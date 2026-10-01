import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHighcharts } from 'highcharts-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHighcharts({
      instance: () => import('highcharts/esm/highcharts').then((m) => m.default),
      modules: () => [
        import('highcharts/esm/modules/accessibility'),
        import('highcharts/esm/themes/dark-unica'),
      ],
    }),
  ],
};
