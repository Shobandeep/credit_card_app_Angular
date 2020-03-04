import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server/server.service';
import { Router, ChildActivationStart } from '@angular/router';
import { UserStateService } from 'src/app/services/user-state-store/user-state.service';

@Component({
  selector: 'app-admin-vendor-transaction-details',
  templateUrl: './admin-vendor-transaction-details.component.html',
  styleUrls: ['./admin-vendor-transaction-details.component.css']
})
export class AdminVendorTransactionDetailsComponent implements OnInit {

  public serverHasError: boolean = false;
  public orderItems: any;
  public orderTotal: string;
  public card: string;
  public serverURL: string;


  constructor(
    private server: ServerService, 
    private router: Router,
    private adminState: UserStateService
  ) {}

  ngOnInit() {
    this.serverURL = environment.serverURL;
    this.server.getVendorTransactionDetails(this.adminState.currentUser).subscribe(response => {
      if(response.error)
        this.serverHasError;
      else {
        this.card = this.adminState.currentUser.vendorTransactionDetails.cardNumber;
        this.orderTotal = response.total;
        this.orderItems = response.orderItems;
      }
    });
  }

  goBack() {
    this.router.navigate(['/admin_vendor_list', this.adminState.currentUser.vendorTransactionDetails.redirectBack])
  }

}
