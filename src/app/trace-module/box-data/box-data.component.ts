import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BoxModel } from '../box-model';
import { BoxServService } from '../box-serv.service';

@Component({
	selector: 'app-box-data',
	templateUrl: './box-data.component.html',
	styleUrls: [ './box-data.component.css' ]
})
export class BoxDataComponent implements OnInit {
	@Input() box: BoxModel;

	constructor(private boxServ: BoxServService) {}

	ngOnInit(): void {}

	editBox() {
		this.boxServ.setBox(this.box);
	}
}
