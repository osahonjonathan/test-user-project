import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { DialogModule } from 'primeng/dialog';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { UserComponent } from './user/user.component';
import { TokenInterceptor } from './token-interceptor/token-interceptor';
import { AuthGuard } from './guards/auth.guard';
import { HomePageComponent } from './home-page/home-page.component';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [AppComponent, LoginComponent, UserComponent, HomePageComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    PasswordModule,
    HttpClientModule,
    DialogModule,
    ToastModule,

    InputTextModule,
    AppRoutingModule,
    ButtonModule,
  ],
  providers: [
    AuthService,
    UserService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
