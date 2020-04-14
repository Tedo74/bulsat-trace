import { Injectable } from '@angular/core';
import { BoxModel } from './box-model';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { TracesServService } from './traces-serv.service';
import { stringify } from 'querystring';

@Injectable({
	providedIn: 'root'
})
export class BoxServService {
	pathToCollection: string;
	pathToCollectionChanged = new Subject<string>();
	changePath(path: string) {
		this.pathToCollection = path;
		this.pathToCollectionChanged.next(this.pathToCollection);
	}

	box: BoxModel;
	parentBox: BoxModel;
	nextBoxes: BoxModel[];
	boxEdit = false;
	// boxEditChange = new Subject<boolean>();
	boxChanged = new Subject<BoxModel>();
	parentBoxChanged = new Subject<BoxModel>();
	nextBoxesChanged = new Subject<BoxModel[]>();
	selectedBoxId: string;
	boxMoveStep = 20;

	constructor(
		private db: AngularFirestore,
		private router: Router // private tracesServ: TracesServService
	) { }

	editPartial(id: string, changes: Partial<BoxModel>, path: string) {
		this.db.doc(`${path}/${id}`).update(changes);
	}
	edit(id: string, changes: Partial<BoxModel>) {
		this.db.doc(`${this.pathToCollection}/${id}`).update(changes);
	}
	editAllObj(id: string, box: BoxModel) {
		this.db.doc(`${this.pathToCollection}/${id}`).set(box);
	}
	deleteBox() {
		//what if box is not deleted!
		// do this after successfully deleted box!
		if (this.parentBox) {
			this.nextBoxes.forEach((nextBox) => {
				nextBox.parentBox = this.parentBox.id;
				this.edit(nextBox.id, { parentBox: this.parentBox.id });
			});
			this.parentBox.nextBoxes = this.parentBox.nextBoxes.filter((b) => {
				return b !== this.box.id;
			});
			if (this.box.nextBoxes.length > 0) {
				let nb = [];
				this.box.nextBoxes.forEach((b) => {
					nb.push(b);
				});
				this.edit(this.parentBox.id, { nextBoxes: nb });
			}
		}
		this.delete(this.box.id);
	}

	delete(id: string) {

		this.db
			.collection(this.pathToCollection)
			.doc(id)
			.delete()
			.then((d) => {
				console.log(d + ' delete');
				// this.router.navigate([ '/nodes' ]);
			})
			.catch((err) => console.log(err));
	}

	create(box: BoxModel, path: string) {
		console.log(path);
		console.log(box);

		this.db.collection(path).add(box).then((docRef) => {
			console.log('Document written with ID: ', docRef.id);
			if (this.box.nextBoxes) {
				this.box.nextBoxes.push(docRef.id);
			} else {
				this.box.nextBoxes = [];
				this.box.nextBoxes.push(docRef.id);
			}
			this.editPartial(this.box.id, { nextBoxes: this.box.nextBoxes }, path);
		});
	}

	moveRight() {
		this.box.positionLeft = +this.box.positionLeft + this.boxMoveStep;
		this.edit(this.box.id, { positionLeft: this.box.positionLeft });
	}
	moveLeft() {
		this.box.positionLeft = +this.box.positionLeft - this.boxMoveStep;
		this.edit(this.box.id, { positionLeft: this.box.positionLeft });
	}
	moveBottom() {
		this.box.positionTop = +this.box.positionTop + this.boxMoveStep;
		this.edit(this.box.id, { positionTop: this.box.positionTop });
	}
	moveTop() {
		this.box.positionTop = +this.box.positionTop - this.boxMoveStep;
		this.edit(this.box.id, { positionTop: this.box.positionTop });
	}

	setBox(b: BoxModel) {
		this.box = b;
		this.boxChanged.next(this.box);
	}
	setParentBox(pb: BoxModel) {
		this.parentBox = pb;
		this.parentBoxChanged.next(this.box);
	}
	setNextBoxes(nb: BoxModel[]) {
		this.nextBoxes = nb;
		this.nextBoxesChanged.next(this.nextBoxes);
	}
	// changeBoxEdit() {
	// 	this.boxEdit = !this.boxEdit;
	// 	this.boxEditChange.next(this.boxEdit);
	// }
}
