import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClientTransactionsComponent } from './admin-client-transactions.component';

describe('AdminClientTransactionsComponent', () => {
  let component: AdminClientTransactionsComponent;
  let fixture: ComponentFixture<AdminClientTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminClientTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminClientTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
