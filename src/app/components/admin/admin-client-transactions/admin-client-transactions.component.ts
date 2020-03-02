import { Component, OnInit } from '@angular/core';
import { UserStateService } from 'src/app/services/user-state-store/user-state.service';
import { ServerService } from 'src/app/services/server/server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-client-transactions',
  templateUrl: './admin-client-transactions.component.html',
  styleUrls: ['./admin-client-transactions.component.css']
})
export class AdminClientTransactionsComponent implements OnInit {

  private serverHasError: boolean = false;
  private transactions: any[];
  private name: string;
  private card: any;

  constructor(
    private adminState: UserStateService,
    private server: ServerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.card = this.adminState.currentUser.card;
    let client = this.adminState.currentUser.currentClient;

    // admin navigated to this page without first selecting a card,
    // take them to the client cards page to select a card
    if(!this.card || !client) {
      this.router.navigate(['admin_client_cards']);
    }
    this.name = client.firstName + ' ' + client.lastName;

    this.server.getClientTransactions(this.adminState.currentUser).subscribe(
      response => {
        if(response.error)
          this.serverHasError = true;
        else 
          this.transactions = response;
      }
    );

  }

  showDetails(transaction) {
    this.adminState.setTransactionId(transaction.transactionId);
    this.router.navigate(['admin_client_transaction_details']);
  }

}
