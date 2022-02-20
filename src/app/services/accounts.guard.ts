import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, of } from "rxjs";
import { UserAccountsService } from "./userAccounts.service";

@Injectable()
export class AccountsGuard implements CanActivate{
    constructor(private router: Router, private userAccountService: UserAccountsService){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
        return this.userAccountService.isUserAutherised$;
    }
}