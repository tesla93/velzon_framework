import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';
import { AppConsts } from '../AppConsts';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        
        // check if user data is in storage is logged in via API.
        if (sessionStorage.getItem(AppConsts.authorization.currentUser) && !this.authService.isTokenExpired() ) {
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
