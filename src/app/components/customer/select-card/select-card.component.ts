import { environment } from '../../../../environments/environment';
import { CartItem } from '../../../models/item.model';
import { ServerService } from 'src/app/services/server/server.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserStateService } from 'src/app/services/user-state-store/user-state.service';
import { CartStateService } from 'src/app/services/cart-state-store/cart-state.service';
import { CreditCard } from 'src/app/models/credit-card.model';

@Component({
  selector: 'app-select-card',
  templateUrl: './select-card.component.html',
  styleUrls: ['./select-card.component.css']
})
export class SelectCardComponent implements OnInit {

  public serverURL: string;
  public total: number;
  public cartItems: CartItem[];
  public payloadItems: any[];
  public cards: CreditCard[];
  public cardPaidWith: number = 1000;
  public paymentSuccessful = false;
  public serverError = false;
  public paymentError = false;
  public insufficientFundsError = false;

  constructor(
    private cartState: CartStateService, 
    private userState: UserStateService, 
    private server: ServerService,
    private router: Router
    ) {}

  ngOnInit() {
    this.serverURL = environment.serverURL;
    // we want to save a snapshot of the cart here incase user changes the 
    // cart state
    this.total = this.cartState.total;
    this.payloadItems = new Array();
    this.cartItems = this.cartState.currentCart;
    this.cartItems.forEach( item => {
      this.payloadItems.push({
        itemId: item.item.itemId,
        quantity: item.quantity
      });
    });

    // if someone tries to navigate to this page without adding anything to
    // the cart, we redirect to home
    if(this.total <= 0) {
      this.router.navigate(['']);
    }
    this.loadCards(); 
  }

  loadCards() {
    this.server.getCards(this.userState.currentUser).subscribe(
      response => {
        // if there was any problem with the server, show an error message
        if(response.error) {
          this.serverError = true;
        }
        else {
          this.cards = response;
        }
      }
    );
  }

  makeOrder(card) {
    if( this.total < (card.creditLimit - card.creditBalance)) {
      // do payment
      let payload = {
        user: this.userState.currentUser,
        items: this.payloadItems,
        cardNumber: card.creditCardNumber
      };
      this.server.doOrder(payload).subscribe(response => {
        if(response.error)
          this.paymentError = true;
        else {
          // if payment way successful, show the confirmation
          // and clear the cart
          this.cardPaidWith = card.creditCardNumber
          this.cartState.resetCart();
          this.paymentSuccessful = true;
        }
      });
    }
    else
      this.insufficientFundsError = true;
  }

}
