// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './modules/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';

// service
import { ServerService } from './services/server/server.service';
import { UserStateService } from 'src/app/services/user-state-store/user-state.service';

// components
import { AppComponent } from './components/app.component';
import { NavbarComponent } from './components/general/navbar/navbar.component';
import { HomepageComponent } from './components/general/homepage/homepage.component';
import { LogoutComponent } from './components/general/logout/logout.component';
import { LoginComponent } from './components/customer/login/login.component';
import { RegisterComponent } from './components/customer/register/register.component';
import { VendorItemsComponent } from './components/vendors/vendor-items/vendor-items.component';
import { VendorListComponent } from './components/vendors/vendor-list/vendor-list.component';
import { CardsComponent } from './components/customer/cards/cards.component';
import { UnauthorizedComponent } from './components/general/unauthorized/unauthorized.component';
import { ShoppingcartComponent } from './components/general/shoppingcart/shoppingcart.component';
import { SelectCardComponent } from './components/customer/select-card/select-card.component';
import { CardTransactionsComponent } from './components/customer/card-transactions/card-transactions.component';
import { TransactionDetailsComponent } from './components/customer/transaction-details/transaction-details.component';
import { PaymentComponent } from './components/general/payment/payment.component';
import { AdminMenuComponent } from './components/admin/admin-menu/admin-menu.component';
import { AdminVendorListComponent } from './components/admin/admin-vendor-list/admin-vendor-list.component';
import { AdminVendorTransactionsComponent } from './components/admin/admin-vendor-transactions/admin-vendor-transactions.component';
import { PageNotFoundComponent } from './components/general/page-not-found/page-not-found.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { AdminClientListComponent } from './components/admin/admin-client-list/admin-client-list.component';
import { AdminClientCardsComponent } from './components/admin/admin-client-cards/admin-client-cards.component';
import { AdminClientTransactionsComponent } from './components/admin/admin-client-transactions/admin-client-transactions.component';
import { AdminVendorTransactionDetailsComponent } from './components/admin/admin-vendor-transaction-details/admin-vendor-transaction-details.component';
import { AdminClientTransactionDetailsComponent } from './components/admin/admin-client-transaction-details/admin-client-transaction-details.component';

// route guards
import { UserBypassRouteGuard } from './route-guards/customer-bypass.route-guard';
import { UserOnlyRouteGuard } from './route-guards/user-only.route-guard';
import { AdminBypassRouteGuard } from './route-guards/admin-bypass.route-guard';
import { AdminOnlyRouteGuard } from './route-guards/admin-only.route-guard';
import { InstructionsComponent } from './components/general/instructions/instructions.component';
import { PaymentRouteGuard } from './route-guards/payment.route-guard';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    LogoutComponent,
    LoginComponent,
    RegisterComponent,
    VendorItemsComponent,
    VendorListComponent,
    CardsComponent,
    UnauthorizedComponent,
    PageNotFoundComponent,
    ShoppingcartComponent,
    SelectCardComponent,
    CardTransactionsComponent,
    TransactionDetailsComponent,
    PaymentComponent,
    AdminMenuComponent,
    AdminVendorListComponent,
    AdminVendorTransactionsComponent,
    PageNotFoundComponent,
    AdminLoginComponent,
    AdminVendorTransactionDetailsComponent,
    AdminClientListComponent,
    AdminClientCardsComponent,
    AdminClientTransactionsComponent,
    AdminClientTransactionDetailsComponent,
    InstructionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ServerService,
    UserStateService,
    UserOnlyRouteGuard,
    UserBypassRouteGuard,
    AdminBypassRouteGuard,
    AdminOnlyRouteGuard,
    PaymentRouteGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
