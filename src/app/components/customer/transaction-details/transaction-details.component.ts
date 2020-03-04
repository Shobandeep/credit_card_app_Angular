import { environment } from '../../../../environments/environment';
import { UserStateService } from 'src/app/services/user-state-store/user-state.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/services/server/server.service';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css']
})
export class TransactionDetailsComponent implements OnInit {

  public serverURL: String;
  public transactionId: string;
  public serverHasError: boolean = false;
  public orderTotal: any;
  public orderItems: any;
  public card: string;


  constructor(
    private userState: UserStateService,
    private server: ServerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.serverURL = environment.serverURL;
    this.transactionId = this.userState.currentUser.transactionId;

    // if user navigated to this page without first selecting a transaction,
    // quickily check if their last viewed card, redirect there, if that is null as
    // well, take them back to cards to select a card
    if(this.transactionId === '') {
      if(this.userState.currentUser.card)
        this.router.navigate(['card_transactions']);
      else
        this.router.navigate(['cards']);
    }
    this.card = this.userState.currentUser.card.creditCardNumber;

    this.server.getTransactionDetails(this.userState.currentUser).subscribe(response => {
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
