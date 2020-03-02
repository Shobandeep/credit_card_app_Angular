import { environment } from './../../../../environments/environment';
import { VendorItem } from '../../../models/item.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServerService } from 'src/app/services/server/server.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartStateService } from 'src/app/services/cart-state-store/cart-state.service';

@Component({
  selector: 'app-vendor-items',
  templateUrl: './vendor-items.component.html',
  styleUrls: ['./vendor-items.component.css']
})
export class VendorItemsComponent implements OnInit, OnDestroy {

  private vendorName: string;
  private serverURL: string;
  private products : VendorItem[];
  private cartIsFull = false;
  private itemQuantityIsMax = false;
  private maxitemsAllowed: number;
  private maxItemQuantityAllowed: number;


  constructor(
    private activatedRoute: ActivatedRoute, 
    private server: ServerService, 
    private cartState: CartStateService,
    private router: Router
    ) {}

  ngOnInit() {
    this.vendorName = this.activatedRoute.snapshot.paramMap.get('vendorName');
    this.serverURL = environment.serverURL;
    this.server.getVendorItems(this.vendorName).subscribe(response => {
      if(response.error)
        this.router.navigate(["**"]);
      else
        this.products = response;
    });

  }

  addToCart(product) {
    if(this.cartState.isFull()) {
      this.maxitemsAllowed = this.cartState.maxitemsAllowed;
      this.cartIsFull = true;
    }
    else if(!this.cartState.additem(product)) {
      this.maxItemQuantityAllowed = this.cartState.maxitemQuantityAllowed;
      this.itemQuantityIsMax = true;
    }
  }

  ngOnDestroy() {

  }

}
