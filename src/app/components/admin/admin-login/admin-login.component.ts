import { UserStateService } from 'src/app/services/user-state-store/user-state.service';
import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server/server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  public serverHasError:boolean = false;
  public serverError: string;


  constructor(
    private server: ServerService, 
    private router: Router,
    private userState: UserStateService
  ) {}

  ngOnInit() {
  }

  submitForm(status, data) {

    // reject form if the fields aren't valid
    if(status === 'INVALID')
      return;
    

    this.server.tryAdminLogin({ password: data.adminPassword }).subscribe( response => {
      if(response.error) {
        this.serverError = response.error;
        this.serverHasError = true;
      }
      else {
        this.userState.login(response.authToken, 'ADMIN', '', true);
        this.router.navigate(['admin_menu']);
      }

      
    });



  }


}
