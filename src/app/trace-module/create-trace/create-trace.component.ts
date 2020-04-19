import { Component, OnInit } from '@angular/core';
import { TracesServService } from '../traces-serv.service';
import { NgForm } from '@angular/forms';
import { BoxServService } from '../box-serv.service';
import { BoxModel } from '../box-model';

@Component({
	selector: 'app-create-trace',
	templateUrl: './create-trace.component.html',
	styleUrls: [ './create-trace.component.css' ]
})
export class CreateTraceComponent implements OnInit {
	path: string;
	constructor(private traceServ: TracesServService, private boxServ: BoxServService) {}

	ngOnInit(): void {
		console.log(this.traceServ.nodePath + '/traces');
		this.path = this.traceServ.nodePath;
	}

	createTrace(f: NgForm) {
		if (this.path) {
			this.path = this.traceServ.nodePath + '/traces';
			this.traceServ
				.createTrace(
					{ name: f.value.name, firstBoxId: '', imageUrl: f.value.imageUrl },
					this.path
				)
				.then((id: string) => {
					this.traceServ.changePath(`${this.path}/${id}`);
					let currentPath = `${this.path}/${id}/boxes`;
					this.boxServ.changePath(currentPath);
					let firstBox: BoxModel = {
						name: 'first-box',
						parentBox: '',
						positionLeft: 0,
						positionTop: 0,
						splitter: 0,
						freeFibers: 0,
						users: [],
						nextBoxes: []
					};
					this.boxServ.createFirstBox(firstBox, currentPath).then((boxId) => {
						this.traceServ.editTrace(this.path, id, { firstBoxId: boxId });
						// this.boxServ.edit(boxId, { id: boxId });
					}); //todo change trace fb id
				});
		}
	}
}
