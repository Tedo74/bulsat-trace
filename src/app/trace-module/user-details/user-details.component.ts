import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { UserModel } from './user-model';
import { UserDataService } from '../user-data.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-user-details',
	templateUrl: './user-details.component.html',
	styleUrls: [ './user-details.component.css' ]
})
export class UserDetailsComponent implements OnInit, OnDestroy {
	user: UserModel;
	userSubscription: Subscription;
	constructor(
		private userServ: UserDataService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.user = this.userServ.user;
		this.userSubscription = this.userServ.userChanged.subscribe((user) => {
			this.user = user;
		});
	}

	ngOnDestroy() {
		this.userSubscription.unsubscribe();
	}

	close() {
		this.router.navigate([ '../' ], { relativeTo: this.route });
	}
}
