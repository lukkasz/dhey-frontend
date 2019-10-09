import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Injectable({ providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService, 
    private router: Router,
    private store: Store<fromApp.AppState>){}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ): boolean | Promise<boolean> | Observable<boolean> {
    //return !!this.authService.token
    return this.store.select('auth').pipe(
      take(1),
      map(authData => {
        //const isAuth = !!user;
        if(authData.isAuth) {
          return true
        }
        this.router.navigate(['/']);
        return false
    }))
  } 

  //samo provjera tokena...
  // canActivate(): boolean{
  //   if (!this.authService.token) {
  //     this.router.navigate(['/']);
  //     return false;
  //   }
  //   return true;
  // }
}