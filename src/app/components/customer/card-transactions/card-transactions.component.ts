import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServerService } from 'src/app/services/server/server.service';
import { UserStateService } from 'src/app/services/user-state-store/user-state.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-transactions',
  templateUrl: './card-transactions.component.html',
  styleUrls: ['./card-transactions.component.css']
})
export class CardTransactionsComponent implements OnInit {

  public serverHasError: boolean = false;
  public transactions: any[];
  public name: string;
  public card: any;

  constructor(
    private userState: UserStateService,
    private server: ServerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.name = this.userState.currentUser.firstName + ' ' + this.userState.currentUser.lastName;
    this.card = this.userState.currentUser.card;

    // user navigated to this page without first selecting a card,
    // take them to the cards page to select a card
    if(!this.card) {
      this.router.navigate(['cards']);
    }

    this.server.getTransactions(this.userState.currentUser).subscribe(
      response => {
        if(response.error)
          this.serverHasError = true;
        else 
          this.transactions = response;
      }
    );

  }

  showDetails(transaction) {
    this.userState.setTransactionId(transaction.transactionId);
    this.router.navigate(['transaction_details']);
  }

}
