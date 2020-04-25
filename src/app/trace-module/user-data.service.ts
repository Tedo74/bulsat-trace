import { Injectable } from '@angular/core';
import { UserModel } from './users/user-model';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UserDataService {
	users: UserModel[];
	usersChanged = new Subject<UserModel[]>();
	constructor() {}

	changeUsers(users: UserModel[]) {
		this.users = users;
		this.usersChanged.next(this.users);
	}
}
