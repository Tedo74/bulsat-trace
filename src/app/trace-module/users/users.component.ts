import { Component, OnInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
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
	@ViewChildren('show') show: QueryList<ElementRef>;
	box: BoxModel;
	usersSubscription: Subscription;
	boxChangedSubs: Subscription;
	showEdit = false;
	openedPonForEdit: string;
	currentIndex = -1;
	showPositionTools = false;
	stepToMoveUser = 20;
	moreInfo = false;
	showMoreInfo = 'подробно';

	constructor(
		private userServ: UserDataService,
		private boxServ: BoxServService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.users = this.userServ.users;
		this.usersSubscription = this.userServ.usersChanged.subscribe((users) => {
			this.users = users;
		});

		this.box = this.boxServ.box;
		this.boxChangedSubs = this.boxServ.boxChanged.subscribe((box) => {
			this.box = box;
		});
	}

	ngOnDestroy() {
		this.usersSubscription.unsubscribe();
		this.boxChangedSubs.unsubscribe();
		this.userServ.changeUserPonToShow(undefined);
	}

	close() {
		this.showEdit = false;
		this.openedPonForEdit = undefined;
	}

	exit() {
		this.router.navigate([ '../' ], { relativeTo: this.route });
		this.userServ.changeUserPonToShow(undefined);
	}

	showOnMap(ponNumber: string) {
		this.userServ.changeUserPonToShow(ponNumber);
	}

	editUser(user: UserModel, index: number) {
		this.openedPonForEdit = user.pon;
		this.currentIndex = index;
		this.showEdit = true;
	}

	editUserSave(user: UserModel, index: number) {
		if (user.pon) {
			this.box.users[index]['pon'] = user.pon;
			this.box.users[index]['name'] = user.name;
			this.box.users[index]['address'] = user.address;
			this.box.users[index]['info'] = user.info;
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

	moveLeft(user: UserModel) {
		user.positionLeft = +user.positionLeft - this.stepToMoveUser;
	}
	moveRight(user: UserModel) {
		user.positionLeft = +user.positionLeft + this.stepToMoveUser;
	}
	moveTop(user: UserModel) {
		user.positionTop = +user.positionTop - this.stepToMoveUser;
	}
	moveBottom(user: UserModel) {
		user.positionTop = +user.positionTop + this.stepToMoveUser;
	}
	stepDown() {
		if (this.stepToMoveUser >= 2) {
			this.stepToMoveUser--;
		}
	}
	stepUp() {
		if (this.stepToMoveUser <= 99) {
			this.stepToMoveUser++;
		}
	}
	saveUserLocation() {
		this.boxServ.edit(this.box.id, { users: this.box.users });
	}

	showMore(ponNumber: string, el: HTMLElement) {
		if (!this.moreInfo && el.textContent === 'подробно') {
			el.textContent = 'затвори';
			this.moreInfo = true;
			this.openedPonForEdit = ponNumber;
		} else if (el.textContent === 'затвори' && this.openedPonForEdit === ponNumber) {
			el.textContent = 'подробно';
			this.moreInfo = false;
			this.openedPonForEdit = undefined;
		} else if (
			this.moreInfo &&
			el.textContent === 'подробно' &&
			this.openedPonForEdit !== ponNumber
		) {
			this.show.toArray().forEach((element) => {
				element.nativeElement.textContent = 'подробно';
			});
			this.openedPonForEdit = ponNumber;
			el.textContent = 'затвори';
		}
	}
}
