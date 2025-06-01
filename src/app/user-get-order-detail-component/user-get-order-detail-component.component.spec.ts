import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGetOrderDetailComponentComponent } from './user-get-order-detail-component.component';

describe('UserGetOrderDetailComponentComponent', () => {
  let component: UserGetOrderDetailComponentComponent;
  let fixture: ComponentFixture<UserGetOrderDetailComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserGetOrderDetailComponentComponent]
    });
    fixture = TestBed.createComponent(UserGetOrderDetailComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
