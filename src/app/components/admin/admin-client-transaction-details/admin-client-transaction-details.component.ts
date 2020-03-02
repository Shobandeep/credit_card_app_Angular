import { Component, OnInit } from '@angular/core';
import { UserStateService } from 'src/app/services/user-state-store/user-state.service';
import { ServerService } from 'src/app/services/server/server.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-client-transaction-details',
  templateUrl: './admin-client-transaction-details.component.html',
  styleUrls: ['./admin-client-transaction-details.component.css']
})
export class AdminClientTransactionDetailsComponent implements OnInit {

  private serverURL: String;
  private transactionId: string;

  private serverHasError: boolean = false;

  private orderTotal: any;
  private orderItems: any;
  private card: string;


  constructor(
    private adminState: UserStateService,
    private server: ServerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.serverURL = environment.serverURL;
    this.transactionId = this.adminState.currentUser.transactionId;

    // if admin navigated to this page without first selecting a transaction,
    // quickily check if their last viewed card, redirect there, if that is null as
    // well, take them back to cards to select a card
    if(this.transactionId === '') {
      if(this.adminState.currentUser.card)
        this.router.navigate(['admin_client_transactions']);
      else
        this.router.navigate(['admin_client_cards']);
    }
    this.card = this.adminState.currentUser.card.creditCardNumber;

    this.server.getClientTransactionDetails(this.adminState.currentUser).subscribe(response => {
      if(response.error) {
        this.serverHasError = true;
      }
      else {
        this.orderTotal = response.total;
        this.orderItems = response.orderItems;
      }
    });
  }

}
