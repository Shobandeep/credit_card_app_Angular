import { VendorItem, CartItem } from '../../models/item.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

const deafultCart: CartItem[] = [];

@Injectable({
  providedIn: 'root'
})
export class CartStateService {
  
  // default cart
  private cartSubject = new BehaviorSubject<CartItem[]>(deafultCart);
  private maxItems = 10;
  private maxItemQuantity = 10;

  constructor(private http: HttpClient) {
    let storedCart = JSON.parse(localStorage.getItem('cart'));
    // if there is a stored cart in the browser memory, restore it
    if(storedCart == null) {
      localStorage.setItem('cart', JSON.stringify(deafultCart));
    }
    else {
      this.cartSubject.next(storedCart);
    }
  }

  // a component will call this menthod so they can keep track of 
  // the cart
  getCartObservable(): Observable<CartItem[]> {
    return this.cartSubject.asObservable();
  }

  get currentCart():CartItem[] {
    return this.cartSubject.getValue();
  }

  get total():number {
    let total = 0;
    this.currentCart.forEach(item => total += item.quantity * item.item.price);
    return total;
  }

  get maxitemsAllowed():number {
    return this.maxItems;
  }

  get maxitemQuantityAllowed():number {
    return this.maxItemQuantity;
  }

  isFull(): boolean {
    return this.cartSubject.getValue().length == this.maxItems;
  }

  // flush all items from the cart
  resetCart() {
    this.cartSubject.next(deafultCart);
    localStorage.setItem('cart', JSON.stringify(deafultCart));
  }

  // if item already exists in the cart, increment it's amount by 1
  // to a maximum of maxItemQuanttiy, if it does not exist, add it
  // will return boolean if it was successful not not
  additem(itemToAdd: VendorItem): boolean {
    // get the value of the current cart and see of the item is already in the cart
    let newCart = this.currentCart;
    let itemIndex = newCart.findIndex(cartItem => {
      return cartItem.item.itemId == itemToAdd.itemId;
    });

    if(itemIndex == -1) {
      let cartItemToAdd: CartItem = {
        item: itemToAdd,
        quantity: 1
      }
      newCart = [...newCart, cartItemToAdd];
    }
    else if(newCart[itemIndex].quantity < this.maxItemQuantity) {
      newCart[itemIndex].quantity++;
    }
    else {
      // this is the maximum allowed quantity, return false
      return false;
    }
    // update the cart state and it's state in the storage
    this.cartSubject.next(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    return true;
  }

  // if item already exists in the cart, decrement it's amount by 1
  // if there is only one, remove it
  removeItem(itemToRemove: VendorItem) {
        // get the value of the current cart and see of the item is already in the cart
        let newCart = this.currentCart;
        let itemIndex = newCart.findIndex(cartItem => {
          return cartItem.item.itemId == itemToRemove.itemId;
        });
        // if item isn't even in the cart, stop here
        if(itemIndex == -1)
          return;    

        if(newCart[itemIndex].quantity > 1) {
            newCart[itemIndex].quantity--;
        }
        else {
          // if there is only 1 item quantity, remove it
          newCart = newCart.filter( cartItem => {
            return cartItem.item.itemId != itemToRemove.itemId;
          });
        }
        // update the cart state and it's state in the storage
        this.cartSubject.next(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
  }

}
