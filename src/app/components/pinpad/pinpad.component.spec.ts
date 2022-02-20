import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserAccountsService } from 'src/app/services/userAccounts.service';

import { PinpadComponent } from './pinpad.component';

describe('PinpadComponent', () => {
  let component: PinpadComponent;
  let fixture: ComponentFixture<PinpadComponent>;
  let userAccountsService: UserAccountsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PinpadComponent ],
      providers: [ UserAccountsService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PinpadComponent);
    userAccountsService = TestBed.get(UserAccountsService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('pinpad', ()=> {
    it('should return an array of number of specified length', ()=> {
      const counterArr = component.counter(5);
      expect(counterArr.length).toEqual(5);
    });

    it('should concat the passcode on click of user entered pin if length is < 4', () => {
      component.passcode = "45";
      component.getValue(6);
      expect(component.passcode.length).toEqual(3);
      expect(component.maxLimit).toBeFalsy();
    });

    it('should throw maximum limit error if passcode length is already 4', () => {
      component.passcode = "4545";
      component.getValue(6);
      expect(component.passcode.length).toEqual(4);
      expect(component.maxLimit).toBeTruthy();
    });

    it('should clear the last character when user clicks clear button', () => {
      component.passcode = "4545";
      component.removeLast();
      expect(component.passcode.length).toEqual(3);
      expect(component.maxLimit).toBeFalsy();
      expect(component.pinError).toBeFalsy();
    });
    
    it('should validate the user entered passcode and navigate to account component', () => {
      component.passcode= "3434";
      const userAccountSpy = spyOn(userAccountsService,'validateUser')
      component.validateUser();
      expect(userAccountSpy).toHaveBeenCalledWith(true);
    });

    it('should give pin error if user enter PIN doesnt match with hardcoded value', () => {
      component.passcode= "3431";
      component.validateUser();
      expect(component.pinError).toBeTruthy();
    });
  });
  
});
