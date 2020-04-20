import { Component, OnInit } from '@angular/core';
import { TracesServService } from '../traces-serv.service';
import { BoxServService } from '../box-serv.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
	selector: 'app-delete-trace',
	templateUrl: './delete-trace.component.html',
	styleUrls: [ './delete-trace.component.css' ]
})
export class DeleteTraceComponent implements OnInit {
	id: string;
	constructor(
		private db: TracesServService,
		private boxServ: BoxServService,
		private route: ActivatedRoute,
		private location: Location,
		private router: Router
	) {}

	ngOnInit(): void {
		this.route.params.subscribe((p) => {
			this.id = p.id;
		});
	}

	delete() {
		this.router.navigate([ '/node', this.db.openedNodeId ]);
		this.db.deleteTraceDoc(this.id);

		this.db.getTraceIds().subscribe((d) => {
			if (d.docs.length > 0) {
				d.docs.forEach((el: { id: string }) => {
					// console.log(el.id);
					if (el.id) {
						this.boxServ.delete(el.id);
					}
				});
			}
		});
	}

	cancel() {
		this.location.back();
	}
}
