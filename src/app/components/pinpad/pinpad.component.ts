import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/app.constants';
import { IAppContent, IPinPad } from 'src/app/interfaces/appContent.interface';
import { IUserDetails } from 'src/app/interfaces/userDetails.interface';
import { UserAccountsService } from 'src/app/services/userAccounts.service';

@Component({
  selector: 'app-pinpad',
  templateUrl: './pinpad.component.html',
  styleUrls: ['./pinpad.component.css']
})
export class PinpadComponent implements OnInit {

  public pinError:boolean = false;
  public maxLimit:boolean = false;
  public passcode:string = '';

  public appContent: IAppContent = require('./../../../assets/content.json');
  public pinPadContent: IPinPad;
  
  constructor(private userAccountsService: UserAccountsService, private router: Router) { 
    this.pinPadContent = this.appContent.pinPad;
  }

  ngOnInit(): void {
  }

  /**
   * helper method to return an array of ten integers to iterate numbers in template
   * @return Array<number>
   */
  public counter(numbers: number): Array<number> {
    return new Array(numbers);
  }

  /**
   * Concants the user entered PIN in pinpad 
   * @return void
   */
  public getValue(val: number): void{
    if(this.passcode.length < 4) {
      this.passcode = this.passcode.concat(String(val));
      this.maxLimit = false;
    }
    else{
      this.maxLimit = true;
    }
  }
  
  /**
   * clears last characters from passcode 
   * @return void
   */
  public removeLast(): void{
    this.passcode = this.passcode.substring(0,this.passcode.length - 1);
    this.pinError = false;
    this.maxLimit = false;
  }

  /**
   * validates user entered PIN and navigates to accounts page
   * @return void
   */
  public validateUser(): void{
    if(this.passcode === AppConstants.USER_PIN){
      this.userAccountsService.validateUser(true);
      this.router.navigateByUrl(AppConstants.ACCOUNTS_ROUTE);
    }
    else{
      this.pinError = true;
    }
  }

}
