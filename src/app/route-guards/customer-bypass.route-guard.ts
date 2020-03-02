import { UserStateService } from '../services/user-state-store/user-state.service';
import { ServerService } from 'src/app/services/server/server.service';
import { Injectable } from '@angular/core';
import { CanActivate,
         ActivatedRouteSnapshot,
         RouterStateSnapshot, 
         Router,
         UrlTree} from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

// this guard will keep a user from loggin in again or registering if they are already logged in
@Injectable()
export class UserBypassRouteGuard implements CanActivate {

  constructor(
    private server: ServerService, 
    private userState: UserStateService, 
    private router: Router
    ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
      
      return this.server.checkUserAuth(this.userState.currentUser).pipe(
        map((res) => { 
            if(res.authorized) {
                return this.router.parseUrl('/cards');
            }
            // if this person is logged in as a admin, they're not allowed to login as user
            else if (this.userState.currentUser.isAdmin)
              return this.router.parseUrl('/unauthorized');
            return true;
        }
        )
      );
  }
}