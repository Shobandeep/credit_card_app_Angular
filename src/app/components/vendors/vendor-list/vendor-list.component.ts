import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server/server.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {

  private vendors : Observable<Object>;


  constructor(private server: ServerService, private router: Router) {
  
  }

  ngOnInit() {
    this.vendors = this.server.getVendors();
  }

  visitStore(vendor) {
    this.router.navigate(['store', vendor.name]);
  }


}
