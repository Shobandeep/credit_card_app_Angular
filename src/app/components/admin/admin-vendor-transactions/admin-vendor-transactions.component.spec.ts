import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVendorTransactionsComponent } from './admin-vendor-transactions.component';

describe('AdminVendorTransactionsComponent', () => {
  let component: AdminVendorTransactionsComponent;
  let fixture: ComponentFixture<AdminVendorTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminVendorTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVendorTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
