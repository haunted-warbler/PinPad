import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { IUserDetails } from "../interfaces/userDetails.interface";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class UserAccountsService {
    private validUser = new BehaviorSubject<boolean>(false);
    isUserAutherised$: Observable<boolean> = this.validUser.asObservable();

    constructor(private httpClient: HttpClient){}

    public fetchUserDetails(url: string): Observable<IUserDetails>{
       return this.httpClient.get<IUserDetails>(url);
    }

    public validateUser(val: boolean): void{
        this.validUser.next(val);
    }

}