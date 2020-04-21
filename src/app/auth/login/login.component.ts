import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserAuthService } from '../user-auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
	loginErrorMessge: string;
	pass: string;

	constructor(private authService: UserAuthService) {}

	ngOnInit(): void {}

	onLogin(f: NgForm) {
		let email = f.value.email;
		let password = f.value.password;
		this.authService.login(email, password);
	}
}
