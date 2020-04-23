import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter,
	ViewChild,
	ElementRef
} from '@angular/core';
import { BoxModel } from '../box-model';
import { BoxServService } from '../box-serv.service';
import { NgForm } from '@angular/forms';
import { UserModel } from '../user-details/user-model';
import { UserDataService } from '../user-data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-box-data',
	templateUrl: './box-data.component.html',
	styleUrls: [ './box-data.component.css' ]
})
export class BoxDataComponent implements OnInit {
	@Input() box: BoxModel;
	// @ViewChild('pon') pon: ElementRef;
	constructor(
		private boxServ: BoxServService,
		private userServ: UserDataService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {}

	// onUserAdd(value: string) {
	// 	if (value) {
	// 		let users = this.box.users;

	// 		if (!users) {
	// 			users = [];
	// 		}
	// 		if (!users.includes(value)) {
	// 			// this.pon.nativeElement.value = '';
	// 			users.push(value);
	// 			this.boxServ.edit(this.box.id, { users: users });
	// 		}
	// 	}
	// }

	onAddUser(f: NgForm) {
		let ponNumber = f.value.pon;
		if (ponNumber) {
			let users = this.box.users;
			if (!users) {
				users = [];
			}
			console.log(ponNumber);
			let found = false;
			for (let i = 0; i < users.length; i++) {
				if (users[i]['pon'] === ponNumber) {
					// console.log(users[i]['pon']);
					found = true;
					break;
				}
			}
			if (!found) {
				users.push({ ...f.value });
			}
			// if (!usersPons.includes(ponNumber)) {
			// 	let userData = { ...f.value };
			// 	users.push(([ ponNumber ] = userData));
			this.boxServ.edit(this.box.id, { users: users });
			// }
		}
	}

	editBox() {
		this.boxServ.setBox(this.box);
	}

	userDetails(user: UserModel) {
		this.userServ.user = user;
		this.userServ.changeUser(user);
		this.router.navigate([ './user' ], { relativeTo: this.route });
	}
}
