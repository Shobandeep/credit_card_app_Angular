import { Router } from '@angular/router';
import { UserStateService } from 'src/app/services/user-state-store/user-state.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from './../../../../environments/environment';
import { CartStateService } from 'src/app/services/cart-state-store/cart-state.service';
import { CartItem } from 'src/app/models/item.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit, OnDestroy {

  private serverURL: string;
  private cartSubscription: Subscription;
  private cartItems : CartItem[];
  private itemQuantityIsMax = false;
  private maxItemQuantityAllowed: number;
  private total: number;

  constructor(
    private cartState: CartStateService, 
    private userState: UserStateService, 
    private router: Router
    ) {}

  ngOnInit() {
    this.serverURL = environment.serverURL;
    this.total = 0;
    this.cartSubscription = this.cartState.getCartObservable().subscribe( items => {
      this.cartItems = items;
      this.total = 0;
      items.forEach( item => this.total += item.quantity * item.item.price);
    });
    
  }

  incrementItem(item) {
    if(!this.cartState.additem(item)) {
      this.maxItemQuantityAllowed = this.cartState.maxitemQuantityAllowed;
      this.itemQuantityIsMax = true;
    }
    else 
      this.itemQuantityIsMax = false;
  }

  decrementItem(item) {
    this.cartState.removeItem(item);
    if(this.itemQuantityIsMax)
      this.itemQuantityIsMax = false;
  }

  checkout() {
    // if a user is logged in, redirect them to select a card to checkout
    // we don't need to verify the authToken as the route guard already does this
    if(this.userState.currentUser.authToken !== '') {
      this.router.navigate(['select_card']);
    }
    else {
      // since a user is not logged in, have them log in first
      this.router.navigate(['login', 'checkout']);
    }
  }

  clearCart() {
    this.cartState.resetCart();
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }

}
