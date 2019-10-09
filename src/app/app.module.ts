import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { EncoderComponent } from './encoder/encoder.component';
import { AuthGuard } from './auth/auth.guard';
import * as fromApp from './store/app.reducer';
import { AuthEffects } from './auth/store/auth.effects';


const appRoute: Routes = [
  { path:'', component: AuthComponent},
  { path:'encoder', component: EncoderComponent, canActivate: [AuthGuard]},
  { path: '**', component: EncoderComponent, canActivate: [AuthGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    EncoderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects]),
    HttpClientModule,
    RouterModule.forRoot(appRoute)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
