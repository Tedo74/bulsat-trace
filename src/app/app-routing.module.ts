import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TraceComponent } from './trace-module/trace/trace.component';
import { NodeComponent } from './trace-module/node/node.component';
import { AllNodesComponent } from './trace-module/all-nodes/all-nodes.component';
import { TracesComponent } from './trace-module/traces/traces.component';
import { DeleteBoxComponent } from './trace-module/delete-box/delete-box.component';
import { CreateBoxComponent } from './trace-module/create-box/create-box.component';

const routes: Routes = [
	{ path: 'trace/:id', component: TraceComponent },
	{ path: 'traces/:id', component: TracesComponent },
	{ path: 'node/:id', component: NodeComponent },
	{ path: 'nodes', component: AllNodesComponent },
	{ path: 'delete', component: DeleteBoxComponent },
	{ path: 'create', component: CreateBoxComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
