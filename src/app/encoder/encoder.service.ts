import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface EncoderResponseData {
  encodedString: string
}

@Injectable({providedIn: 'root'})
export class EncoderService {

  constructor(private http: HttpClient) {}
  sendStringToEncode(inputString: string, token: string) {
    return this.http.post<EncoderResponseData>(
      'http://localhost:3000/encoder', 
      { inputString: inputString },
      { headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    });
  }

}