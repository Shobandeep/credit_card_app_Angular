import { UserStateService } from '../services/user-state-store/user-state.service';
import { Injectable } from '@angular/core';
import { CanActivate,
         ActivatedRouteSnapshot,
         RouterStateSnapshot,
         Router,
         UrlTree} from '@angular/router';

// this guard will verify if user is allowed into a particular route 
@Injectable()
export class UserOnlyRouteGuard implements CanActivate {

  constructor(private userState: UserStateService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if(!this.userState.currentUser.isAdmin && this.userState.isLoggedIn())
      return true;
    else
      return this.router.parseUrl('/unauthorized');
  }
}