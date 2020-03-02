import { UserStateService } from '../../../services/user-state-store/user-state.service';
import { Observable } from 'rxjs';
import { ServerService } from 'src/app/services/server/server.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private serverHasError: boolean = false;
  private inputError: boolean = false;
  private serverError: string;
  private registerAttempt: Observable<any>;

  constructor(private server: ServerService, private userState: UserStateService, private router: Router) { }

  ngOnInit() {
  }

  submitForm(status, data) {
    
    if(
      data.firstName === ''
      || data.lastName === ''
      || data.userEmail === ''
      || data.userPassword === ''
    ) this.inputError = true;

    // reject form if the fields aren't valid
    if(status === 'INVALID')
      return;
    
    this.registerAttempt = this.server.registerUser({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.userEmail,
      password: data.userPassword
    })

    this.registerAttempt.subscribe(data => {
      if(data.error) {
        this.serverError = data.error;
        this.serverHasError = true;
      }
      else {
        // user created, log them in and redirect to cards
        this.userState.login(data.authToken, data.firstName, data.lastName, false);
        this.router.navigate(['cards']);
      }
    })
  }

}
