import { Component, OnInit } from '@angular/core';
import { NgForm, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.action';
//import { Login } from './store/auth.action';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoading: boolean = false;
  error: string = null;


  constructor(
    private router: Router,
    private store: Store<fromApp.AppState>  
  ) {}

  ngOnInit() {
    this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
    })
  }

  onSubmit(form: NgForm) {
    if(!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.store.dispatch(new AuthActions.LoginStart({email, password}));
   
    form.reset();
    
    
  }

}
