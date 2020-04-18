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

@Component({
	selector: 'app-box-data',
	templateUrl: './box-data.component.html',
	styleUrls: [ './box-data.component.css' ]
})
export class BoxDataComponent implements OnInit {
	@Input() box: BoxModel;
	@ViewChild('pon') pon: ElementRef;
	constructor(private boxServ: BoxServService) {}

	ngOnInit(): void {}

	onUserAdd(value: string) {
		if (value) {
			let users = this.box.users;
			if (!users) {
				users = [];
			}
			if (!users.includes(value)) {
				this.pon.nativeElement.value = '';
				users.push(value);
				this.boxServ.edit(this.box.id, { users: users });
			}
		}
	}

	editBox() {
		this.boxServ.setBox(this.box);
	}
}
