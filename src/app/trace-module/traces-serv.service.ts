import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BoxModel } from './box-model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TraceModel } from './trace-model';
// import { BoxServService } from './box-serv.service';

@Injectable({
	providedIn: 'root'
})
export class TracesServService {
	openedNodeId: string;
	nodePath: string;
	tracesInNodePath: string;
	tracePath: string;
	path: string;
	trace = <BoxModel[]>[];
	// firstBoxId: string;
	// selectedBoxId: string;
	// showTraceInNode = false;
	// showTraceInNodeChange = new Subject<boolean>();
	traceChanged = new Subject<BoxModel[]>();
	// changeShowTrace(show: boolean) {
	// 	this.showTraceInNode = show;
	// 	this.showTraceInNodeChange.next(this.showTraceInNode);
	// }
	traceId: string;
	nextPathChange = new Subject<string>();
	changePath(newPath: string) {
		this.path = newPath;
		this.nextPathChange.next(this.path);
	}

	constructor(private db: AngularFirestore) {}

	getCollection(path: string): Observable<any> {
		return this.db.collection(path).snapshotChanges().pipe(
			map((d) => {
				return d.map((snap) => {
					let data: Object = snap.payload.doc.data();
					return <any>{ id: snap.payload.doc.id, ...data };
				});
			})
		);
	}

	getTrace(path: string) {
		return this.db
			.collection(path)
			.snapshotChanges()
			.pipe(
				map((d) => {
					return d.map((snap) => {
						let data: Object = snap.payload.doc.data();
						return <BoxModel>{ id: snap.payload.doc.id, ...data };
					});
				})
			)
			.subscribe((d: BoxModel[]) => {
				this.trace = d;
				this.traceChanged.next(this.trace);
			});
	}

	getTraceInfo(path: string): Observable<any> {
		return this.db.doc(path).valueChanges();
	}
	getNodeInfo(path: string): Observable<any> {
		return this.db.doc(path).valueChanges();
	}

	loadTrace() {
		this.getCollection(`${this.path}/boxes`).subscribe((trace) => {
			this.trace = trace;
			this.traceChanged.next(this.trace);
		});
	}

	async createTrace(trace: TraceModel, path: string) {
		console.log(path);
		console.log(trace);
		if (path && trace) {
			const docRef = await this.db.collection(path).add(trace);
			console.log(docRef.id);
			return docRef.id;
			this.db
				.collection(path)
				.doc(docRef.id)
				.collection('boxes')
				.add({ test: 'tesstt' });
		}
	}

	editTrace(path: string, id: string, changes: Partial<TraceModel>) {
		this.db.doc(`${path}/${id}`).update(changes);
	}
}
