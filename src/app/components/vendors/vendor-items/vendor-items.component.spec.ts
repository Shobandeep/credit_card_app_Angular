import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorItemsComponent } from './vendor-items.component';

describe('VendorItemsComponent', () => {
  let component: VendorItemsComponent;
  let fixture: ComponentFixture<VendorItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
