import { Component, OnInit, Input } from '@angular/core';
import { BoxModel } from '../box-model';

@Component({
	selector: 'app-box',
	templateUrl: './box.component.html',
	styleUrls: [ './box.component.css' ]
})
export class BoxComponent implements OnInit {
	@Input() box: BoxModel;
	constructor() {}

	ngOnInit(): void {}
}
