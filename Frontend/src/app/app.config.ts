import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { credentialsHandlerInterceptor } from './core/interceptors/credentials-handler.interceptor';
import { errorHandlerInterceptor } from './core/interceptors/error-handler.interceptor';
import { ConfirmationService, MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(
      withFetch(),
      withInterceptors([credentialsHandlerInterceptor, errorHandlerInterceptor])
    ),
    provideAnimationsAsync(),
    MessageService,
    ConfirmationService,
  ],
};
