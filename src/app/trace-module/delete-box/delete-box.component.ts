import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BoxModel } from '../box-model';
import { BoxServService } from '../box-serv.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TracesServService } from '../traces-serv.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-delete-box',
	templateUrl: './delete-box.component.html',
	styleUrls: ['./delete-box.component.css']
})
export class DeleteBoxComponent implements OnInit {

	constructor(
		private boxServ: BoxServService,
		private traseServ: TracesServService,
		private route: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit(): void {
	}
	delete() {
		this.boxServ.deleteBox();
		this.traseServ.getTrace(this.boxServ.pathToCollection);
		this.router.navigate(['../../'], { relativeTo: this.route });
	}
	cancel() {
		this.router.navigate(['../../'], { relativeTo: this.route });
	}

}
