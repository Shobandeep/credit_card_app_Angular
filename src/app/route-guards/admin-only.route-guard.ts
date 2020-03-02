import { UserStateService } from '../services/user-state-store/user-state.service';
import { Injectable } from '@angular/core';
import { CanActivate,
         ActivatedRouteSnapshot,
         RouterStateSnapshot,
         UrlTree,
         Router} from '@angular/router';

// this guard will verify if admin is allowed into a particular route 
@Injectable()
export class AdminOnlyRouteGuard implements CanActivate {

    constructor(private adminState: UserStateService, private router: Router) {} 
    
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
        if(this.adminState.currentUser.isAdmin && this.adminState.isLoggedIn())
            return true;
        else
            return this.router.parseUrl('/unauthorized');
    }
}