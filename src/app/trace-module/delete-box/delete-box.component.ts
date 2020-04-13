import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BoxModel } from '../box-model';
import { BoxServService } from '../box-serv.service';
import { ActivatedRoute } from '@angular/router';
import { TracesServService } from '../traces-serv.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-delete-box',
	templateUrl: './delete-box.component.html',
	styleUrls: [ './delete-box.component.css' ]
})
export class DeleteBoxComponent implements OnInit, OnDestroy {
	// boxChanged: Subscription;
	idChanged: Subscription;
	pathToCollection: string;
	path: Subscription;
	// @Input() id: string;
	id: string;
	box: BoxModel;
	parentBox: BoxModel;
	nextBoxes: BoxModel[];
	constructor(
		private boxServ: BoxServService,
		private route: ActivatedRoute,
		private traceServ: TracesServService
	) {}

	ngOnInit(): void {
		// console.log(this.id);
		this.pathToCollection = this.traceServ.path + '/boxes';
		this.path = this.traceServ.nextPathChange.subscribe((p) => {
			this.pathToCollection = p + '/boxes';
			this.boxServ.pathToCollection = p + '/boxes';
		});
		this.route.params.subscribe((d) => {
			this.id = d.id;
		});
		// this.boxChanged = this.boxServ.boxChanged.subscribe((b) => {
		// 	this.box = b;
		// });
		// this.parentBoxChanged = this.boxServ.parentBoxChanged.subscribe((pb) => {
		// 	this.parentBox = pb;
		// });
		// this.boxesChanged = this.boxServ.boxesChanged.subscribe((nb) => {
		// 	this.nextBoxes = nb;
		// });
	}

	ngOnDestroy() {
		this.path.unsubscribe();
		// this.idChanged.unsubscribe();
		// this.parentBoxChanged.unsubscribe();
		// this.boxesChanged.unsubscribe();
	}

	delete() {
		console.log(this.pathToCollection);
		console.log(this.id);
		return;
		this.boxServ.delete(this.id, this.pathToCollection);
		if (this.parentBox) {
			this.nextBoxes.forEach((nextBox) => {
				nextBox.parentBox = this.parentBox.id;
				this.boxServ.edit(nextBox.id, { parentBox: this.parentBox.id });
			});
			this.parentBox.nextBoxes = this.parentBox.nextBoxes.filter((b) => {
				b !== this.box.id;
			});
			if (this.box.nextBoxes.length > 0) {
				let nb = [];
				this.box.nextBoxes.forEach((b) => {
					nb.push(b);
				});

				this.boxServ.edit(this.parentBox.id, { nextBoxes: nb });
				this.boxServ.box = this.parentBox;
			}
		}

		// this.boxServ.delete(id);
		// this.traceServ.changeShowTrace(true);
		// this.router.navigate([ '/node', this.traceServ.openedNodeId ]);
		// this.boxServ.box = null;
	}
}
