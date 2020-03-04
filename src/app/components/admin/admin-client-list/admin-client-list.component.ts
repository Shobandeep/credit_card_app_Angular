import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server/server.service';
import { Router } from '@angular/router';
import { UserStateService } from 'src/app/services/user-state-store/user-state.service';

@Component({
  selector: 'app-admin-client-list',
  templateUrl: './admin-client-list.component.html',
  styleUrls: ['./admin-client-list.component.css']
})
export class AdminClientListComponent implements OnInit {

  public serverHasError: boolean = false;
  public customers: any[];

  


  constructor(
    private server: ServerService, 
    private router: Router,
    private adminState: UserStateService
  ) {}

  ngOnInit() {
    this.server.getAllClients(this.adminState.currentUser).subscribe(response => {
      if(response.error)
        this.serverHasError = true;
      else
        this.customers = response;
    });
  }

  showCards(customer) {
    this.adminState.setCurrentClient(customer);
    this.router.navigate(['admin_client_cards']);
  }

}
