export interface IAppContent {
    pinPad: IPinPad;
    accounts: IAccounts;
}

export interface IPinPad {
    pinLabel: string;
    errorMsg: string;
    clear: string;
    enter: string;
    zero: string; 
}

export interface IAccounts {
    hello: string;
    dob: string;
    savings: string;
    checking: string;
}
