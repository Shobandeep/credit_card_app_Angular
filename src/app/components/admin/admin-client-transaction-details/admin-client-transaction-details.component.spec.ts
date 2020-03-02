import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClientTransactionDetailsComponent } from './admin-client-transaction-details.component';

describe('AdminClientTransactionDetailsComponent', () => {
  let component: AdminClientTransactionDetailsComponent;
  let fixture: ComponentFixture<AdminClientTransactionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminClientTransactionDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminClientTransactionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
