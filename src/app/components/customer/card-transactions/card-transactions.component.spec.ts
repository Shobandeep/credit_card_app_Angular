import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTransactionsComponent } from './card-transactions.component';

describe('CardTransactionsComponent', () => {
  let component: CardTransactionsComponent;
  let fixture: ComponentFixture<CardTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
