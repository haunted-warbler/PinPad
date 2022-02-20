import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AppConstants } from 'src/app/app.constants';
import { IAccounts, IAppContent } from 'src/app/interfaces/appContent.interface';
import { IUserDetails } from 'src/app/interfaces/userDetails.interface';
import { UserAccountsService } from 'src/app/services/userAccounts.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit, OnDestroy {

  public appContent: IAppContent = require('./../../../assets/content.json');
  public accountsContent: IAccounts;
  public userDetails: IUserDetails | undefined;
  unsubscribe$ : Subject<void> = new Subject<void>();

  constructor(private userDetailsService: UserAccountsService) { 
    this.accountsContent = this.appContent.accounts;
  }

  ngOnInit(): void {
    this.invokeUserDetails();
  }

  /**
   * invoke user details API (mock) to get the data on component load
   * @return void
   */
  private invokeUserDetails(): void{
    this.userDetailsService.fetchUserDetails(AppConstants.MOCK_URL).pipe(takeUntil(this.unsubscribe$)).subscribe((response: IUserDetails) => {
      if(response){
        this.userDetails = response;
      }
    }, (error: HttpErrorResponse) => {
        console.error('error fetching data');
    });
  }

  /**
   * Unsubscribe to subscription on component destroy
   * @return void
   */
  ngOnDestroy(): void{
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
