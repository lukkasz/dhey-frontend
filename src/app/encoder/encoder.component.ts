import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { take} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { EncoderService } from './encoder.service';


@Component({
  selector: 'app-encoder',
  templateUrl: './encoder.component.html',
  styleUrls: ['./encoder.component.css']
})

export class EncoderComponent implements OnInit {

  constructor(
    private store: Store<fromApp.AppState>,
    private encoderService: EncoderService
    ) {}

  token: string = null;
  encodedString: string = null;
  inputString: string = null
  
  ngOnInit() {
    this.store.select('auth')
    .pipe(
      take(1),
    ).subscribe( authData => {
      this.token = authData.token;
    });
  }
  
  onSubmit(form: NgForm) {
    this.inputString = form.value.inputString;
  
    this.encoderService.sendStringToEncode(this.inputString, this.token)
    .subscribe( resData => {
      this.encodedString = resData.encodedString
    });
  }
}
