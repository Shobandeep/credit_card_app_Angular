import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClientCardsComponent } from './admin-client-cards.component';

describe('AdminClientCardsComponent', () => {
  let component: AdminClientCardsComponent;
  let fixture: ComponentFixture<AdminClientCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminClientCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminClientCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
