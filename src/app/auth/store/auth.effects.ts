import { Actions, ofType, Effect } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as AuthAction from './auth.action';
import { AuthService } from '../auth.service'

@Injectable()
export class AuthEffects {

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthAction.LOGIN_START),
    switchMap((authData: AuthAction.LoginStart) => {
      return this.authService.login(authData.payload.email, authData.payload.password)
      .pipe(
        map(resData => new AuthAction.Login({ isAuth: !!resData.token, token: resData.token })), 
        catchError(error => of(new AuthAction.LoginFail(error.statusText)))
      );
    })
  );

  @Effect({dispatch: false})
  authSuccess = this.actions$.pipe(ofType(AuthAction.LOGIN), tap(() => {
    this.router.navigate(['/encoder']);
  }))

  constructor(
    private actions$: Actions,    
    private router: Router,
    private authService: AuthService) {}
}