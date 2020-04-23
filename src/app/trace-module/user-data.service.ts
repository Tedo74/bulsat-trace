import { Injectable } from '@angular/core';
import { UserModel } from './user-details/user-model';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UserDataService {
	user: UserModel;
	userChanged = new Subject<UserModel>();
	constructor() {}

	changeUser(user: UserModel) {
		this.user = user;
		this.userChanged.next(this.user);
	}
}
