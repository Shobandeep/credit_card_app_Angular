import { UserStateService } from 'src/app/services/user-state-store/user-state.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { ServerService } from 'src/app/services/server/server.service';

@Component({
  selector: 'app-admin-vendor-transactions',
  templateUrl: './admin-vendor-transactions.component.html',
  styleUrls: ['./admin-vendor-transactions.component.css']
})
export class AdminVendorTransactionsComponent implements OnInit {

  public serverHasError: boolean = false;
  public vendorName: string;
  public serverURL: string;
  public transactions: any;


  constructor(
    private activatedRoute: ActivatedRoute, 
    private server: ServerService, 
    private router: Router,
    private adminState: UserStateService
    ) {}

  ngOnInit() {
    this.vendorName = this.activatedRoute.snapshot.paramMap.get('vendorName');
    this.serverURL = environment.serverURL;
    this.server.getVendorTransactions(this.adminState.currentUser, this.vendorName).subscribe(response => {
      if(response.error)
        this.serverHasError = true;
      else
        this.transactions = response
    });
  }

  showDetails(transaction) {
    this.adminState.setTransactionDetails({
      transactionId: transaction.transactionId,
      customerId: transaction.customerId,
      // used by the back button to come back
      redirectBack: this.vendorName,
      cardNumber: transaction.cardNumber
    });
    this.router.navigate(['/admin_vendor_transaction_details']);
  }

}
