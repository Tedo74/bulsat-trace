import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { TracesServService } from '../traces-serv.service';
import { BoxModel } from '../box-model';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BoxServService } from '../box-serv.service';

@Component({
	selector: 'app-trace',
	templateUrl: './trace.component.html',
	styleUrls: [ './trace.component.css' ]
})
export class TraceComponent implements OnInit, OnDestroy {
	traceChanged: Subscription;
	trace = <BoxModel[]>[];
	@Input() traceImageUrl: string;
	nextBoxes = <BoxModel[]>[];
	firstBoxId: string;
	parentBoxId: string;
	parentBox: BoxModel;
	box: BoxModel;
	selectedBoxId: string;

	constructor(
		private traceServ: TracesServService,
		private route: ActivatedRoute,
		private boxServ: BoxServService
	) {}

	ngOnInit(): void {
		this.traceChanged = this.traceServ.traceChanged.subscribe((d) => {
			this.trace = d;
			if (this.trace) {
				this.currentTraceInfo();
			}
		});
	}

	ngOnDestroy() {
		this.traceChanged.unsubscribe();
	}

	currentTraceInfo() {
		this.traceServ.getTraceInfo(this.traceServ.path).subscribe((d) => {
			this.firstBoxId = d.firstBoxId;
			if (this.selectedBoxId) {
				let faundBox1 = this.findBox(this.selectedBoxId);
				if (faundBox1) {
					this.selectedBoxId = this.selectedBoxId;
					// this.box=faundBox1;
				} else {
					this.selectedBoxId = d.firstBoxId;
					this.selectedBoxId = this.selectedBoxId;
				}
			} else {
				this.selectedBoxId = d.firstBoxId;
				this.selectedBoxId = this.selectedBoxId;
			}
			this.getBox(this.selectedBoxId);
		});
	}

	getBox(id: string) {
		this.selectedBoxId = id;
		this.box = this.findBox(id);
		this.boxServ.setBox(this.box);
		if (this.box.parentBox) {
			this.parentBox = this.findBox(this.box.parentBox);
			this.boxServ.setParentBox(this.parentBox);
			this.parentBoxId = this.parentBox.id;
		} else {
			this.parentBox = undefined;
		}

		this.nextBoxes = this.getNextBoxes(this.box);
		this.boxServ.setNextBoxes(this.nextBoxes);
	}

	getNextBoxes(box: BoxModel): BoxModel[] {
		let boxes = [];
		if (this.trace.length > 0 && box.nextBoxes) {
			for (let i = 0; i < box.nextBoxes.length; i++) {
				let currentBox = this.findBox(box.nextBoxes[i]);
				if (currentBox) {
					boxes.push(currentBox);
				}
			}
		}
		// console.log(boxes);
		return boxes;
	}

	findNextBoxes(id: string): boolean {
		if (this.nextBoxes) {
			for (let i = 0; i < this.nextBoxes.length; i++) {
				if (id === this.nextBoxes[i].id) {
					return true;
				}
			}
		}
		return false;
	}

	findParent(boxId: string, parentId: string): boolean {
		if (boxId === parentId) {
			return true;
		}
		return false;
	}

	// editThisBox(event: boolean) {
	// 	this.boxServ.changeBoxEdit();
	// 	this.boxServ.box = this.box;
	// }

	findBox(id: string): BoxModel {
		return this.trace.find((element) => element.id === id);
	}

	// boxEdited(evt: boolean) {
	// 	this.boxEdit = false;
	// }
}
