import { Injectable } from '@angular/core';
import { UserModel } from './users/user-model';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UserDataService {
	users: UserModel[];
	// user: UserModel;
	userMoveStep = 20;
	userPonToShow: string;
	usersChanged = new Subject<UserModel[]>();
	// userChanged = new Subject<UserModel>();
	userPonToShowChanged = new Subject<string>();
	constructor() {}

	changeUsers(users: UserModel[]) {
		this.users = users;
		this.usersChanged.next(this.users);
	}
	// changeUser(user: UserModel) {
	// 	this.user = user;
	// 	this.userChanged.next(this.user);
	// }

	changeUserPonToShow(ponNumber: string) {
		this.userPonToShow = ponNumber;
		this.userPonToShowChanged.next(ponNumber);
	}
}
