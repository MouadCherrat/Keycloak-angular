import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { AdminInfoComponent } from './components/admin-info/admin-info.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './auth/auth.interceptor';
import { KeycloakService } from './keycloak/keycloak.service';

export function kcFactory(kcService: KeycloakService) {
  return () => kcService.init();
}

@NgModule({
  declarations: [
    AppComponent,
    AdminInfoComponent,
    ForbiddenComponent,
    AdminPageComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      deps: [KeycloakService],
      useFactory: kcFactory,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
