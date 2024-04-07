import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LayoutsModule } from "./layouts/layouts.module";
import { PagesModule } from "./pages/pages.module";

// Auth
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { initFirebaseBackend } from './authUtils';

// Language
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// Store
import { AppInitializer } from './app-initializer';
import { ProjectHttpInterceptor } from './core/interceptors/project-httpInterceptor';
import { SharedModule } from './shared/shared.module';
import { JwtInterceptor } from './core/helpers/jwt.interceptor';
import { ErrorInterceptor } from './core/helpers/error.interceptor';
import { ApiInterceptor } from './core/data-service';


export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

if (environment.defaultauth === 'firebase') {
  initFirebaseBackend(environment.firebaseConfig);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    LayoutsModule,
    PagesModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ProjectHttpInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: (appInitializer: AppInitializer) => appInitializer.init(),
      deps: [AppInitializer],
      multi: true,
    },
    // HttpResponsesHandlersFactory,
    // {
    //   // provide: ErrorHandler,
    //   // useClass: ServerErrorHandler
    // },
    // { provide: API_BASE_URL, useFactory: () => AppConsts.remoteServiceBaseUrl },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
