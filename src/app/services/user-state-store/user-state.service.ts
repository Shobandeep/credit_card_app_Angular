import { User } from '../../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

// const deafultUser: User = {
//   firstName: 'John',
//   lastName: 'Doe',
//   authToken: 'eyJhbGciOiJIUzI1NiJ9.am9obkBnbWFpbC5jb20.AJCnVOZthqYCvEgcwIbiVA74e3yrmRscq0CmypDs7Tc',
//   card: null,
//   transactionId: ''
// }

const deafultUser:User = {
  firstName: '',
  lastName: '',
  // JWT token used to authenticate a user
  authToken: '',
  // used by (admin)_card_transactions component to fetch transactions
  card: null,
  // used by (admin)_transaction_details component to fetch transaction details
  transactionId: '',
  // the following is exclusive to admin
  isAdmin: false,
  // the current client the admin is viewing
  currentClient: null,
  // since we want /admin_card_transaction_details to still work (is user manually
  // navigates there, it should show the last thing they were looking at so we can't overwrite the values
  // that component is using), which is why this object is needed
  vendorTransactionDetails: null
}

@Injectable({
  providedIn: 'root'
})
export class UserStateService {

  // default, meaning no one is logged in
  private userSubject = new BehaviorSubject<User>(deafultUser);

  constructor() {
    let storedUser = JSON.parse(localStorage.getItem('user'));
    // if there is a stored user in the browser memory, restore it
    if(storedUser == null) {
      localStorage.setItem('user', JSON.stringify(deafultUser));
    }
    else {
      this.setUser(storedUser);
    }
  }

  // a component will call this menthod when they need to keep track of who
  // is currently logged in
  getUserObservable(): Observable<User> {
    return this.userSubject.asObservable();
  }

  get currentUser() {
    return this.userSubject.getValue();
  }

  setCard(card: any) {
    let newUser = this.currentUser;
    newUser.card = card;
    this.setUser(newUser);
  }

  setTransactionId(transactionId: string) {
    let newUser = this.currentUser;
    newUser.transactionId = transactionId;
    this.setUser(newUser);
  }
  
  setCurrentClient(customer:any) {
    let newUser = this.currentUser;
    newUser.currentClient = {
      customerId: customer.customerId,
      isActive: customer.isActive,
      firstName: customer.firstName,
      lastName: customer.lastName
    };
    this.setUser(newUser);
  }

  setTransactionDetails(details) {
    //admin only action
    if(!this.currentUser.isAdmin)
      return;
    let newUser = this.currentUser;
    newUser.vendorTransactionDetails = details;
    this.setUser(newUser);
  }

  login(authToken, firstName, lastName, isAdmin) {
    let newUser = {
      firstName: firstName,
      lastName: lastName,
      authToken: authToken,
      card: null,
      transactionId: '',
      isAdmin: isAdmin,
      currentClient: null,
      vendorTransactionDetails: null
    };
    this.setUser(newUser);
  }

  isLoggedIn(): boolean {
    return this.currentUser.authToken !== '';
  }

  logout() {
    this.setUser(deafultUser);
  }

  private setUser(user: User) {
    this.userSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }
}
