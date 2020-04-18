import { Component, OnInit, OnDestroy } from '@angular/core';
import { BoxModel } from '../box-model';
import { BoxServService } from '../box-serv.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-box-edit',
	templateUrl: './box-edit.component.html',
	styleUrls: [ './box-edit.component.css' ]
})
export class BoxEditComponent implements OnInit, OnDestroy {
	changedUser: string;
	boxChangedSubs: Subscription;
	box: BoxModel;
	stepToMoveBox = 20;
	showUsers = false;
	showPositionTools = false;
	constructor(
		private boxServ: BoxServService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
		this.box = this.boxServ.box;
		this.boxChangedSubs = this.boxServ.boxChanged.subscribe((box) => {
			this.box = box;
		});
	}

	ngOnDestroy() {
		this.boxChangedSubs.unsubscribe();
	}

	onEdit(f: NgForm) {
		let boxToUpload: BoxModel = {
			...f.value,
			positionLeft: +this.box.positionLeft,
			positionTop: +this.box.positionTop,
			users: this.box.users,
			parentBox: this.box.parentBox,
			nextBoxes: this.box.nextBoxes
		};
		let id = this.box.id;
		this.boxServ.editAllObj(id, boxToUpload);
		this.box = { id, ...boxToUpload };
	}

	moveRight() {
		this.boxServ.moveRight();
	}

	moveLeft() {
		this.boxServ.moveLeft();
	}

	moveBottom() {
		this.boxServ.moveBottom();
	}

	moveTop() {
		this.boxServ.moveTop();
	}

	close() {
		this.router.navigate([ '../' ], { relativeTo: this.route });
	}

	stepDown() {
		if (this.boxServ.boxMoveStep > 2) {
			this.boxServ.boxMoveStep--;
			this.stepToMoveBox = this.boxServ.boxMoveStep;
		}
	}
	stepUp() {
		if (this.boxServ.boxMoveStep < 100) {
			this.boxServ.boxMoveStep++;
			this.stepToMoveBox = this.boxServ.boxMoveStep;
		}
	}

	deleteUser(user: string) {
		let filteredUsers = this.box.users.filter((u) => u !== user);
		this.box.users = [].concat(filteredUsers);
		this.boxServ.setBox(this.box);
		this.boxServ.edit(this.box.id, { users: filteredUsers });
	}

	editUser(user: string, index: number) {
		if (this.changedUser) {
			this.box.users[index] = this.changedUser;
			this.changedUser = undefined;
		}
		// console.log(this.box.users);
		this.boxServ.edit(this.box.id, { users: this.box.users });
	}
}
