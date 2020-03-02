import { InstructionsComponent } from './../components/general/instructions/instructions.component';
import { AdminClientTransactionDetailsComponent } from './../components/admin/admin-client-transaction-details/admin-client-transaction-details.component';
import { AdminClientTransactionsComponent } from './../components/admin/admin-client-transactions/admin-client-transactions.component';
import { AdminClientListComponent } from './../components/admin/admin-client-list/admin-client-list.component';
import { AdminVendorTransactionDetailsComponent } from './../components/admin/admin-vendor-transaction-details/admin-vendor-transaction-details.component';
import { AdminVendorTransactionsComponent } from './../components/admin/admin-vendor-transactions/admin-vendor-transactions.component';
import { AdminVendorListComponent } from './../components/admin/admin-vendor-list/admin-vendor-list.component';
import { AdminMenuComponent } from './../components/admin/admin-menu/admin-menu.component';
import { AdminLoginComponent } from './../components/admin/admin-login/admin-login.component';
import { PaymentComponent } from './../components/general/payment/payment.component';
import { TransactionDetailsComponent } from '../components/customer/transaction-details/transaction-details.component';
import { CardTransactionsComponent } from '../components/customer/card-transactions/card-transactions.component';
import { SelectCardComponent } from '../components/customer/select-card/select-card.component';
import { ShoppingcartComponent } from './../components/general/shoppingcart/shoppingcart.component';
import { PageNotFoundComponent } from './../components/general/page-not-found/page-not-found.component';
import { UnauthorizedComponent } from './../components/general/unauthorized/unauthorized.component';
import { AdminClientCardsComponent } from '../components/admin/admin-client-cards/admin-client-cards.component';
import { CardsComponent } from './../components/customer/cards/cards.component';
import { RegisterComponent } from './../components/customer/register/register.component';
import { VendorListComponent } from './../components/vendors/vendor-list/vendor-list.component';
import { VendorItemsComponent } from './../components/vendors/vendor-items/vendor-items.component';
import { LoginComponent } from './../components/customer/login/login.component';
import { LogoutComponent } from '../components/general/logout/logout.component';
import { HomepageComponent } from './../components/general/homepage/homepage.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// guards
import { UserOnlyRouteGuard } from '../route-guards/user-only.route-guard';
import { UserBypassRouteGuard } from '../route-guards/customer-bypass.route-guard';
import { AdminBypassRouteGuard } from './../route-guards/admin-bypass.route-guard';
import { AdminOnlyRouteGuard } from './../route-guards/admin-only.route-guard';
import { PaymentRouteGuard } from './../route-guards/payment.route-guard';



const routes: Routes = [

  // admin routes
  {path: 'admin_login', component: AdminLoginComponent, canActivate: [AdminBypassRouteGuard]},
  {path: 'admin_menu', component: AdminMenuComponent, canActivate: [AdminOnlyRouteGuard]},

  {path: 'admin_client_list', component: AdminClientListComponent, canActivate: [AdminOnlyRouteGuard]},
  {path: 'admin_client_cards', component: AdminClientCardsComponent, canActivate: [AdminOnlyRouteGuard]},
  {path: 'admin_client_transactions', component: AdminClientTransactionsComponent, canActivate: [AdminOnlyRouteGuard]},
  {path: 'admin_client_transaction_details', component: AdminClientTransactionDetailsComponent, canActivate: [AdminOnlyRouteGuard]},

  {path: 'admin_vendor_list', component: AdminVendorListComponent, canActivate: [AdminOnlyRouteGuard]},
  {path: 'admin_vendor_list/:vendorName', component: AdminVendorTransactionsComponent, canActivate: [AdminOnlyRouteGuard]},
  {path: 'admin_vendor_transaction_details', component: AdminVendorTransactionDetailsComponent, canActivate: [AdminOnlyRouteGuard]},

  // customer routes
  {path: 'login', component: LoginComponent, canActivate: [UserBypassRouteGuard]},
  {path: 'login/:next', component: LoginComponent, canActivate: [UserBypassRouteGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [UserBypassRouteGuard]},

  {path: 'cards', component: CardsComponent, canActivate: [UserOnlyRouteGuard]},
  {path: 'card_transactions', component: CardTransactionsComponent, canActivate: [UserOnlyRouteGuard]},
  {path: 'transaction_details', component: TransactionDetailsComponent, canActivate: [UserOnlyRouteGuard]},
  {path: 'select_card', component: SelectCardComponent, canActivate: [UserOnlyRouteGuard]},

  // vendor routes
  {path: 'store', component: VendorListComponent},
  {path: 'store/:vendorName', component: VendorItemsComponent},

  // general routes
  {path: '', component: HomepageComponent},
  {path: 'instructions', component: InstructionsComponent},
  {path: 'cart', component: ShoppingcartComponent},
  {path: 'payment', component: PaymentComponent, canActivate: [PaymentRouteGuard]},
  {path: 'unauthorized', component: UnauthorizedComponent},
  {path: 'logout', component: LogoutComponent},
  {path: '**', component: PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }