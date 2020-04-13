import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TracesServService } from '../traces-serv.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-traces',
	templateUrl: './traces.component.html',
	styleUrls: [ './traces.component.css' ]
})
export class TracesComponent implements OnInit, OnDestroy {
	collectionSubs: Subscription;
	traces = [];
	path: string;
	nextPath: string;

	constructor(
		private traceServ: TracesServService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
		this.getDataToOpenTrace();
	}
	ngOnDestroy(): void {
		this.collectionSubs.unsubscribe();
	}

	getDataToOpenTrace() {
		this.collectionSubs = this.route.params.subscribe((p) => {
			this.path = `nodes/${p.id}/traces`;
			this.traceServ.tracesInNodePath = this.path;
			this.traceServ.getCollection(this.path).subscribe((d) => {
				this.traces = d;
			});
		});
		// this.traceServ.changePath(this.path);
	}

	// openTrace(id: string) {
	// 	// this.traceServ.changeShowTrace(true);
	// 	this.nextPath = `${this.path}/${id}`;
	// 	this.traceServ.changePath(this.nextPath);
	// 	this.traceServ.traceId = id;
	// 	this.traceServ.loadTrace();

	// 	// console.log(this.nextPath);
	// 	// this.router.navigate([ '/trace', id ]);
	// }
}
