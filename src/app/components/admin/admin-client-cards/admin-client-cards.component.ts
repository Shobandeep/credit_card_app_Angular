import { Component, OnInit } from '@angular/core';
import { UserStateService } from 'src/app/services/user-state-store/user-state.service';
import { ServerService } from 'src/app/services/server/server.service';
import { Router } from '@angular/router';
import { CreditCard } from 'src/app/models/credit-card.model';

@Component({
  selector: 'app-admin-client-cards',
  templateUrl: './admin-client-cards.component.html',
  styleUrls: ['./admin-client-cards.component.css']
})
export class AdminClientCardsComponent implements OnInit {

  public serverHasError: boolean = false;
  public serverActiveError: boolean = false;
  public serverActiveSuccess: boolean = false;
  public serverActiveMsg: string;
  public cards: CreditCard[];
  public client: any;

  constructor(
    private adminState: UserStateService, 
    private server: ServerService, 
    private router: Router
  ) { }

  ngOnInit() {
    this.client = this.adminState.currentUser.currentClient;
    if(!this.client)
      this.router.navigate(['admin_client_list']);
    this.loadCards();
  }

  loadCards() {
    this.server.getClientCards(this.adminState.currentUser).subscribe(
      response => {
        // if there was any problem with the server, show an error message
        if(response.error) {
          this.serverHasError = true;
        }
        else {
          this.cards = response;
        }
      }
    );
  }

  showTransactions(card) {
    this.adminState.setCard(card);
    this.router.navigate(['admin_client_transactions']);
  }

  modifyClient() {
    this.server.setClientActivaton(this.adminState.currentUser).subscribe(response => {
      if(response.error)
        this.serverActiveError = true;
      else {
        // if the action was successful, record the changed customer attributes
        this.adminState.setCurrentClient(response);
        this.client = this.adminState.currentUser.currentClient;
        this.serverActiveMsg = (this.client.isActive) ? 'user activated!' : 'user deactivated';
        this.serverActiveSuccess = true;
      }
    });
  }

}
