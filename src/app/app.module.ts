import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { TraceModModule } from './trace-module/trace-mod.module';
import { AuthModule } from './auth/auth.module';
import { HomeComponent } from './home/home.component';

@NgModule({
	declarations: [ AppComponent, NavComponent, HomeComponent ],
	imports: [
		BrowserModule,
		AppRoutingModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule,
		TraceModModule,
		AuthModule
	],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
