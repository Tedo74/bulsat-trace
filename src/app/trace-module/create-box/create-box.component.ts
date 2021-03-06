import { Component, OnInit, OnDestroy } from '@angular/core';
import { BoxModel } from '../box-model';
import { BoxServService } from '../box-serv.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TracesServService } from '../traces-serv.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-create-box',
	templateUrl: './create-box.component.html',
	styleUrls: ['./create-box.component.css']
})
export class CreateBoxComponent implements OnInit, OnDestroy {
	getBoxSubscription: Subscription;
	path: Subscription;
	parentBox: BoxModel;
	pathToCollection: string;
	constructor(
		private boxServ: BoxServService,
		private router: Router,
		private route: ActivatedRoute,
		private traceServ: TracesServService
	) { }

	ngOnInit(): void {
		this.parentBox = this.boxServ.box;
		this.getBoxSubscription = this.boxServ.boxChanged.subscribe((b) => {
			this.parentBox = b;
		});

		this.pathToCollection = this.boxServ.pathToCollection;
		this.path = this.boxServ.pathToCollectionChanged.subscribe((p) => {
			this.pathToCollection = p;
		});
	}
	ngOnDestroy() {
		this.getBoxSubscription.unsubscribe();
		this.path.unsubscribe();
	}

	onCreate(f: NgForm) {
		let boxToUpload: BoxModel = {
			...f.value,
			positionLeft: 0,
			positionTop: 0,
			users: [],
			parentBox: this.parentBox.id,
			nextBoxes: []
		};
		this.boxServ.create(boxToUpload, this.pathToCollection);
	}

	onClose() {
		this.router.navigate(['../'], { relativeTo: this.route });
	}
}
