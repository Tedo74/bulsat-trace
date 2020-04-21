import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class UserAuthService {
	constructor(private authService: AngularFireAuth, private router: Router) {}

	login(email: string, password: string) {
		this.authService
			.signInWithEmailAndPassword(email, password)
			.then((result) => {
				this.router.navigate([ '/' ]);
			})
			.catch();
	}
}
