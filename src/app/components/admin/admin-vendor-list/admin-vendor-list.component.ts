import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerService } from 'src/app/services/server/server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-vendor-list',
  templateUrl: './admin-vendor-list.component.html',
  styleUrls: ['./admin-vendor-list.component.css']
})
export class AdminVendorListComponent implements OnInit {

  private vendors : Observable<Object>;


  constructor(
    private server: ServerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.vendors = this.server.getVendors();
  }

  visitStore(vendor) {
    this.router.navigate(['admin_vendor_list', vendor.name]);
  }

}
