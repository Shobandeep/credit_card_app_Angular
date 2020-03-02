import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVendorTransactionDetailsComponent } from './admin-vendor-transaction-details.component';

describe('AdminVendorTransactionDetailsComponent', () => {
  let component: AdminVendorTransactionDetailsComponent;
  let fixture: ComponentFixture<AdminVendorTransactionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminVendorTransactionDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVendorTransactionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
