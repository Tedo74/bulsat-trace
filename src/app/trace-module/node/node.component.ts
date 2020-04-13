import { Component, OnInit, OnDestroy } from '@angular/core';
import { TracesServService } from '../traces-serv.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NodeModel } from '../node-model';

@Component({
	selector: 'app-node',
	templateUrl: './node.component.html',
	styleUrls: [ './node.component.css' ]
})
export class NodeComponent implements OnInit, OnDestroy {
	paramsSubs: Subscription;
	node: NodeModel;
	pathNode: string;

	showTrace = false;
	showTraceSubscription: Subscription;

	constructor(private traceServ: TracesServService, private route: ActivatedRoute) {}

	ngOnInit(): void {
		this.paramsSubs = this.route.params.subscribe((p) => {
			// let id = this.route.snapshot.params['id'];
			this.pathNode = `nodes/${p.id}`;
			this.traceServ.openedNodeId = p.id;
			this.traceServ.getNodeInfo(this.pathNode).subscribe((d) => {
				this.node = d;
				// console.log(this.node);
				if (d.imageUrl) {
					this.node.imageUrl = 'https://drive.google.com/uc?id=' + d.imageUrl;
				} else {
					this.node.imageUrl = undefined;
				}
			});
		});

		this.showTraceSubscription = this.traceServ.showTraceInNodeChange.subscribe(
			(show) => {
				this.showTrace = show;
			}
		);
	}

	ngOnDestroy(): void {
		this.paramsSubs.unsubscribe();
		this.showTraceSubscription.unsubscribe();
	}
}
