import { Injectable } from '@angular/core';
import {
	CanActivate,
	RouterStateSnapshot,
	ActivatedRouteSnapshot,
	Router
} from '@angular/router';
import { UserAuthService } from './user-auth.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(private authService: UserAuthService, private router: Router) {}
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (this.authService.isAuth()) {
			return true;
		} else {
			this.router.navigate([ '/login' ]);
		}
	}
}
