import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './components/accounts/accounts.component';
import { PinpadComponent } from './components/pinpad/pinpad.component';
import { AccountsGuard } from './services/accounts.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'pinpad'
  },
  {
    path: 'pinpad',
    component: PinpadComponent
  },
  {
    path: 'accounts',
    component: AccountsComponent,
    canActivate: [AccountsGuard]
  },
  {
    path: '**',
    component: PinpadComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AccountsGuard]
})
export class AppRoutingModule { }
