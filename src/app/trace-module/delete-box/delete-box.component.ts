import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BoxServService } from '../box-serv.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TracesServService } from '../traces-serv.service';

@Component({
	selector: 'app-delete-box',
	templateUrl: './delete-box.component.html',
	styleUrls: [ './delete-box.component.css' ]
})
export class DeleteBoxComponent implements OnInit {
	id: string;
	constructor(
		private boxServ: BoxServService,
		private traseServ: TracesServService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
		// this.id = this.route.snapshot.params.id;
		// console.log(this.id);
	}
	delete() {
		this.boxServ.deleteBox();
		this.traseServ.getTrace(this.boxServ.pathToCollection);
		this.router.navigate([ '../../' ], { relativeTo: this.route });
	}
	cancel() {
		this.router.navigate([ '../../' ], { relativeTo: this.route });
	}
}
