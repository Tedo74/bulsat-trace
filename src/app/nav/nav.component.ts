import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserAuthService } from '../auth/user-auth.service';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: [ './nav.component.css' ]
})
export class NavComponent implements OnInit, OnDestroy {
	isAuth = false;
	authSubscription: Subscription;
	constructor(private authService: UserAuthService) {}

	ngOnInit(): void {
		this.authSubscription = this.authService.authChange.subscribe((authStatus) => {
			this.isAuth = authStatus;
		});
	}

	ngOnDestroy() {
		this.authSubscription.unsubscribe();
	}
}
