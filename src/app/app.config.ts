import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideAngularSvgIcon } from 'angular-svg-icon';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { interceptorProvider } from './core/interceptors/interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideAngularSvgIcon(),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideToastr(),
    interceptorProvider,
  ],
};
