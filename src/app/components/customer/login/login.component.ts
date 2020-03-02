import { UserStateService } from '../../../services/user-state-store/user-state.service';
import { Observable } from 'rxjs';
import { ServerService } from 'src/app/services/server/server.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private serverHasError:boolean = false;
  private inputError: boolean = false;
  private serverError: string;
  private loginAttempt: Observable<any>;
  private shouldRedirect: boolean = false;
  private redirectTo: string;

  constructor(
    private server: ServerService, 
    private userState: UserStateService, 
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {}

  ngOnInit() {
    // if there is a page you should redirect to after loggin in, note it here
    let next = this.activatedRoute.snapshot.paramMap.get('next');
    if(next === 'checkout') {
      this.redirectTo = '/select_card';
      this.shouldRedirect = true;
    }
      
  }

  submitForm(status, data) {

    if(data.userEmail === '' || data.userPassword === '')
      this.inputError = true;

    // reject form if the fields aren't valid
    if(status === 'INVALID')
      return;
    

    this.loginAttempt = this.server.tryLogin({
      email: data.userEmail,
      password: data.userPassword
    })

    this.loginAttempt.subscribe(data => {
      if(data.error) {
        this.serverError = data.error;
        this.serverHasError = true;
      }
      else {
        // update User store and redirect to the next page
        this.userState.login(data.authToken, data.firstName, data.lastName, false);
        if(this.shouldRedirect)
          this.router.navigate([this.redirectTo]);
        else
          this.router.navigate(['cards']);
      }
    })

  }

}
