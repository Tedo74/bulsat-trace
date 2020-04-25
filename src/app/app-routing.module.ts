import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TraceComponent } from './trace-module/trace/trace.component';
import { NodeComponent } from './trace-module/node/node.component';
import { AllNodesComponent } from './trace-module/all-nodes/all-nodes.component';
import { TracesComponent } from './trace-module/traces/traces.component';
import { DeleteBoxComponent } from './trace-module/delete-box/delete-box.component';
import { CreateBoxComponent } from './trace-module/create-box/create-box.component';
import { BoxEditComponent } from './trace-module/box-edit/box-edit.component';
import { CreateTraceComponent } from './trace-module/create-trace/create-trace.component';
import { DeleteTraceComponent } from './trace-module/delete-trace/delete-trace.component';
import { LoginComponent } from './auth/login/login.component';

import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './trace-module/users/users.component';

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'home', component: HomeComponent },
	// { path: '', redirectTo: 'home', pathMatch: 'full', canActivate: [ AuthGuard ] },
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: 'traces/:id', component: TracesComponent, canActivate: [ AuthGuard ] },
	{
		path: 'delete-trace/:id',
		component: DeleteTraceComponent,
		canActivate: [ AuthGuard ]
	},
	{
		path: 'node/:id',
		component: NodeComponent,
		canActivate: [ AuthGuard ],
		children: [
			{
				path: 'create-trace',
				component: CreateTraceComponent,
				canActivate: [ AuthGuard ]
			},
			{
				path: 'trace/:id',
				component: TraceComponent,
				canActivate: [ AuthGuard ],
				children: [
					{ path: 'delete/:id', component: DeleteBoxComponent },
					{ path: 'create', component: CreateBoxComponent },
					// { path: 'user', component: UserDetailsComponent },
					{ path: 'users', component: UsersComponent },
					{ path: 'edit', component: BoxEditComponent }
				]
			}
		]
	},
	{ path: 'nodes', component: AllNodesComponent, canActivate: [ AuthGuard ] }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
