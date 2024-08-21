import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { errorHandlerInterceptor } from './core/interceptors/error-handler.interceptor';
import { provideFrenchToast, ToastPosition } from 'ngx-french-toast';
import { credentialsHandlerInterceptor } from './core/interceptors/credentials-handler.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(
      withFetch(),
      withInterceptors([credentialsHandlerInterceptor, errorHandlerInterceptor])
    ),
    provideRouter(routes, withViewTransitions()),
    provideAnimationsAsync(),
    provideFrenchToast({
      defaultDuration: 3000,
      position: ToastPosition.BOTTOM_RIGHT,
      limit: 2,
      font: {
        contentFontSize: '12px',
        titleFontSize: '13px',
        family: 'Oxygen',
      },
    }),
  ],
};
