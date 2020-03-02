import { VendorItem } from '../../models/item.model';
import { Observable } from 'rxjs';
import { RegisterUser, User } from '../../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
/*
  this service is meant to deal with all http requests to the server
  (you CAN argue that Vendor and User needed their own separate services and I agree,
  but it didn't make sense to do that for this project since I'm still learning the ropes and juggling 
  all the different parts would take away from that, if this is still here, I probably didn't get
  around to it)
*/
export class ServerService {

  private serverURL: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) {
    this.serverURL = environment.serverURL;
  }

  /*
    *******************
    * vendor requests *
    *******************
  */

  getVendors() {
    return this.http.get(this.serverURL+'vendors');
  }

  getVendorItems(vendorName: string): any {
    return this.http.get(this.serverURL+'vendoritems/'+vendorName) as Observable<VendorItem[]>;
  }

  /*
    *****************
    * User requests *
    *****************
  */

  // attempt to login a user
  tryLogin( userDetails: {email: string, password: string}) {
    return this.http.post(this.serverURL+'login', userDetails, this.httpOptions);
  }

  // register a new user
  registerUser(userToRegister: RegisterUser) {
    return this.http.post(this.serverURL+'register', userToRegister, this.httpOptions);
  }

  // verify if user should be logged in
  checkUserAuth(user: User): Observable<{authorized: boolean }> {
    return this.http.post(this.serverURL+'auth', user, this.httpOptions) as Observable<{authorized: boolean }>;
  }

  // apply for a new card
  addNewCard(user: User): any {
    return this.http.post(this.serverURL+'apply_for_card', user, this.httpOptions);
  }

  // get all the user's cards
  getCards(user: User): any {
    return this.http.post(this.serverURL+'cards', user, this.httpOptions);
  }

  // get all transactions for a given card
   getTransactions(user: User): any {
    return this.http.post(this.serverURL+'card_transactions', user, this.httpOptions);
  }

  // get all transaction details for a given transaction
  getTransactionDetails(user: User): any {
    return this.http.post(this.serverURL+'transaction_details', user, this.httpOptions);
  }

  // get all transaction details for a given transaction
  makePayment(cardPayment): any {
    return this.http.post(this.serverURL+'payment', cardPayment, this.httpOptions);
  }
  
  // make an order
  doOrder(order): any {
    return this.http.post(this.serverURL+'transaction', order, this.httpOptions);
  }

  /*
    ******************
    * Admin requests *
    ******************
  */
   // attempt to login a user
   tryAdminLogin( userDetails: {password: string}): any {
    return this.http.post(this.serverURL+'admin_login', userDetails, this.httpOptions);
  }

  // verify if admin should be logged in
  checkAdminAuth(user: User): Observable<{authorized: boolean }> {
    return this.http.post(this.serverURL+'admin_auth', user, this.httpOptions) as Observable<{authorized: boolean }>;
  }

  // attempt to login a user
  getVendorTransactions(admin: User, vendorName): any {
  return this.http.post(this.serverURL+'admin_vendor_transactions/' + vendorName, admin, this.httpOptions);
  }

  // get all transaction details for a given transaction
  getVendorTransactionDetails(user: User): any {
    return this.http.post(this.serverURL+'admin_vendor_transaction_details', user, this.httpOptions);
  }

  // get a list of all clients
  getAllClients(user: User): any {
    return this.http.post(this.serverURL+'admin_client_list', user, this.httpOptions);
  }

  // get a list of the client's credit cards
  getClientCards(user: User): any {
    return this.http.post(this.serverURL+'admin_client_cards', user, this.httpOptions);
  }

  // get a list of the client's credit cards
  setClientActivaton(user: User): any {
    return this.http.post(this.serverURL+'admin_set_active', user, this.httpOptions);
  }

  // get all transactions for a given card
  getClientTransactions(user: User): any {
    return this.http.post(this.serverURL+'admin_card_transactions', user, this.httpOptions);
  }

  // get all transaction details for a given transaction
  getClientTransactionDetails(user: User): any {
    return this.http.post(this.serverURL+'admin_transaction_details', user, this.httpOptions);
  }

}
