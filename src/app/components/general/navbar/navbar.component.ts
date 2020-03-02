import { CartStateService } from '../../../services/cart-state-store/cart-state.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserStateService } from 'src/app/services/user-state-store/user-state.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  private userLoggedIn = false;
  private userSubscription: Subscription;
  private cartSubscription: Subscription;
  private currentUser: User;
  private isAdmin = false;
  private cartItems: number;

  constructor(
    private userState: UserStateService,
    private cartState: CartStateService
    ) {}

  ngOnInit() {
    this.userSubscription = this.userState.getUserObservable().subscribe(user => {
      this.currentUser = user;
      // make sure we have a valid token
      this.userLoggedIn = this.userState.isLoggedIn();
      this.isAdmin = this.userState.currentUser.isAdmin;
    });
    this.cartSubscription = this.cartState.getCartObservable().subscribe(cart => {
      this.cartItems = 0;
      cart.forEach(item => this.cartItems += item.quantity);
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.cartSubscription.unsubscribe();
  }

}
