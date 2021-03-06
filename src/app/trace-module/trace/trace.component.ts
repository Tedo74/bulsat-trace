import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { TracesServService } from '../traces-serv.service';
import { BoxModel } from '../box-model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BoxServService } from '../box-serv.service';
import { TraceModel } from '../trace-model';
import { UserModel } from '../users/user-model';
import { UserDataService } from '../user-data.service';

@Component({
	selector: 'app-trace',
	templateUrl: './trace.component.html',
	styleUrls: [ './trace.component.css' ]
})
export class TraceComponent implements OnInit, OnDestroy {
	id: string;
	traceData: TraceModel;
	// idChanged: Subscription;
	imageUrl: string;
	traceInfoSubs: Subscription;
	traceChanged: Subscription;
	trace = <BoxModel[]>[];
	traceImageUrl: string;
	traceFirstBoxIdOriginal: string;
	nextBoxes = <BoxModel[]>[];
	firstBoxId: string;
	parentBoxId: string;
	parentBox: BoxModel;
	box: BoxModel;
	users: UserModel[];
	userPonToShow: string;
	userPonChanged: Subscription;
	selectedBoxId: string;

	constructor(
		private traceServ: TracesServService,
		private route: ActivatedRoute,
		private boxServ: BoxServService,
		private userServ: UserDataService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.route.params.subscribe((p) => {
			this.id = p.id;
			this.traceServ.tracePath = `${this.traceServ.tracesInNodePath}/${this.id}`;
			this.traceServ.getTrace(`${this.traceServ.tracePath}/boxes`);
			this.boxServ.pathToCollection = `${this.traceServ.tracePath}/boxes`;
			console.log(`${this.traceServ.tracePath}/boxes`);
		});

		this.traceChanged = this.traceServ.traceChanged.subscribe((d) => {
			this.trace = d;
			if (this.trace) {
				this.currentTraceInfo();
			}
		});

		this.userPonChanged = this.userServ.userPonToShowChanged.subscribe(
			(ponNumber) => {
				this.userPonToShow = ponNumber;
			}
		);
	}

	ngOnDestroy() {
		this.traceChanged.unsubscribe();
		this.userServ.changeUserPonToShow(undefined);
		this.userPonChanged.unsubscribe();
		// this.idChanged.unsubscribe();
		this.traceInfoSubs.unsubscribe();
	}

	currentTraceInfo() {
		this.traceInfoSubs = this.traceServ
			.getTraceInfo(`${this.traceServ.tracePath}`)
			.subscribe((d) => {
				if (d.imageUrl) {
					this.imageUrl = 'https://drive.google.com/uc?id=' + d.imageUrl;
				} else {
					this.imageUrl = undefined;
				}
				this.firstBoxId = d.firstBoxId;
				this.traceFirstBoxIdOriginal = d.firstBoxId;
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
		this.users = this.box.users;
		this.userServ.changeUsers(this.users);
		if (this.box.parentBox) {
			this.parentBox = this.findBox(this.box.parentBox);
			this.boxServ.setParentBox(this.parentBox);
			this.parentBoxId = this.parentBox.id;
		} else {
			this.parentBox = undefined;
			this.parentBoxId = undefined;
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

	deleteTrace() {
		this.traceInfoSubs.unsubscribe();
		this.router.navigate([ '/delete-trace', this.id ]);
	}

	deleteBox(id: string) {
		// [routerLink]="['delete',box.id]
		if (this.traceFirstBoxIdOriginal === id) {
			alert('Това е първа кутия в трасето! Може да се изтрие с цялото трасе.');
			return;
		} else {
			this.router.navigate([ './delete', id ], { relativeTo: this.route });
		}
	}
}
