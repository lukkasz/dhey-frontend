import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface AuthResponseData {
  token: string
}

@Injectable({providedIn: 'root'})
export class AuthService {
  
  constructor(private http: HttpClient) {}
  
  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'http://localhost:3000/login', 
      {
        email: email,
        password: password
      }
    )
  }
}