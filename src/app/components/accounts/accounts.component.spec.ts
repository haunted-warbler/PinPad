import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { IUserDetails } from 'src/app/interfaces/userDetails.interface';
import { UserAccountsService } from 'src/app/services/userAccounts.service';

import { AccountsComponent } from './accounts.component';

describe('AccountsComponent', () => {
  let component: AccountsComponent;
  let userAccountsService : UserAccountsService;
  let fixture: ComponentFixture<AccountsComponent>;
  const userDataMock : IUserDetails = require('./../../../assets/mock/userDetails.json');
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsComponent ],
      providers: [ UserAccountsService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsComponent);
    userAccountsService = TestBed.get(UserAccountsService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
      it('should call invokeUserDetails on component load', () => {
      const userDetailsSpy = spyOn(component as any, 'invokeUserDetails');
      component.ngOnInit();
      expect(userDetailsSpy).toHaveBeenCalled();
    });
    
    it('should call invokeUserDetails and give user details on success', () => {
      const fetchUserSpy = spyOn(userAccountsService, 'fetchUserDetails').and.returnValue(of(userDataMock));
      (component as any).invokeUserDetails();
      expect(fetchUserSpy).toHaveBeenCalled();
      expect(component.userDetails).toEqual(userDataMock);
    });

    it('should call invokeUserDetails and user details be undefined on failure ', () => {
      const error = new HttpErrorResponse({error: 'Not Found'});
      const fetchUserSpy = spyOn(userAccountsService, 'fetchUserDetails').and.returnValue(throwError(error));
      (component as any).invokeUserDetails();
      expect(fetchUserSpy).toHaveBeenCalled();
      expect(component.userDetails).toBeUndefined();
    });
  });
});
