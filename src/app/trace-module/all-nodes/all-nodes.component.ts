import { Component, OnInit, OnDestroy } from '@angular/core';
import { TracesServService } from '../traces-serv.service';
import { NodeModel } from '../node-model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-all-nodes',
	templateUrl: './all-nodes.component.html',
	styleUrls: [ './all-nodes.component.css' ]
})
export class AllNodesComponent implements OnInit, OnDestroy {
	getCollectionSubs: Subscription;
	allNodes = <NodeModel[]>[];

	constructor(private db: TracesServService, private router: Router) {}

	ngOnInit(): void {
		this.getCollectionSubs = this.db.getCollection('nodes').subscribe((d) => {
			this.allNodes = d;
			// console.log('nodes ', d);
		});
	}
	ngOnDestroy() {
		this.getCollectionSubs.unsubscribe();
	}
	// goToNode(id: string) {
	// 	// this.router.navigate([ '/traces', id ]);
	// 	this.router.navigate([ '/node', id ]);
	// 	this.db.changeShowTrace(false);
	// }
}
