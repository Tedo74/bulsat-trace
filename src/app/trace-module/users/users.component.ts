import { Component, OnInit } from '@angular/core';
import { UserModel } from './user-model';
import { Subscription } from 'rxjs';
import { UserDataService } from '../user-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BoxServService } from '../box-serv.service';
import { BoxModel } from '../box-model';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: [ './users.component.css' ]
})
export class UsersComponent implements OnInit {
	users: UserModel[];
	box: BoxModel;
	userSubscription: Subscription;
	boxChangedSubs: Subscription;
	showEdit = false;
	openedPonForEdit: string;
	currentIndex = -1;

	constructor(
		private userServ: UserDataService,
		private boxServ: BoxServService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.users = this.userServ.users;
		this.userSubscription = this.userServ.usersChanged.subscribe((users) => {
			this.users = users;
		});

		this.box = this.boxServ.box;
		this.boxChangedSubs = this.boxServ.boxChanged.subscribe((box) => {
			this.box = box;
		});
	}

	ngOnDestroy() {
		this.userSubscription.unsubscribe();
		this.boxChangedSubs.unsubscribe();
	}

	close() {
		this.showEdit = false;
		this.openedPonForEdit = undefined;
	}

	exit() {
		this.router.navigate([ '../' ], { relativeTo: this.route });
	}

	showOnMap() {}

	editUser(user: UserModel, index: number) {
		this.openedPonForEdit = user.pon;
		this.currentIndex = index;
		this.showEdit = true;
		// this.box.users[index]['pon'] = user.pon;
		// this.box.users[index]['name'] = user.name;
		// this.box.users[index]['address'] = user.address;
		// }
		// console.log(this.box.users);
		// this.boxServ.edit(this.box.id, { users: this.box.users });
	}
	editUserSave(user: UserModel, index: number) {
		if (user.pon) {
			this.box.users[index]['pon'] = user.pon;
			this.box.users[index]['name'] = user.name;
			this.box.users[index]['address'] = user.pon;
			this.openedPonForEdit = undefined;
			this.showEdit = false;
			this.currentIndex = -1;
		}
		// console.log(this.box.users);
		this.boxServ.edit(this.box.id, { users: this.box.users });
	}

	deleteUser(ponNumber: string) {
		let filteredUsers = this.box.users.filter((u) => u.pon !== ponNumber);
		this.users = [].concat(filteredUsers);
		this.box.users = this.users;
		this.userServ.changeUsers(this.users);
		this.boxServ.setBox(this.box);
		this.boxServ.edit(this.box.id, { users: filteredUsers });
		this.openedPonForEdit = undefined;
		this.showEdit = false;
		this.currentIndex = -1;
	}
}
