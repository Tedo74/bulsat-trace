import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UserAuthService {
	isUserAuth = false;
	authChange = new Subject<boolean>();

	constructor(private authService: AngularFireAuth, private router: Router) {}

	login(email: string, password: string) {
		this.authService
			.signInWithEmailAndPassword(email, password)
			.then((result) => {
				console.log('logged');
				this.isUserAuth = true;
				this.authChange.next(true);
				this.router.navigate([ '/home' ]);
			})
			.catch((err) => {
				this.authChange.next(false);
				this.router.navigate([ '/login' ]);
			});
	}

	isAuth(): boolean {
		return this.isUserAuth;
	}
}
