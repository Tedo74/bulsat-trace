import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TracesComponent } from './traces/traces.component';
import { BoxComponent } from './box/box.component';
import { TraceComponent } from './trace/trace.component';
import { BoxDataComponent } from './box-data/box-data.component';
import { NodeComponent } from './node/node.component';
import { AllNodesComponent } from './all-nodes/all-nodes.component';
import { RouterModule } from '@angular/router';
import { BoxEditComponent } from './box-edit/box-edit.component';
import { DeleteBoxComponent } from './delete-box/delete-box.component';
import { CreateBoxComponent } from './create-box/create-box.component';
import { CreateTraceComponent } from './create-trace/create-trace.component';
import { DeleteTraceComponent } from './delete-trace/delete-trace.component';
import { UserDetailsComponent } from './user-details/user-details.component';

@NgModule({
	declarations: [
		TracesComponent,
		BoxComponent,
		TraceComponent,
		BoxDataComponent,
		NodeComponent,
		AllNodesComponent,
		BoxEditComponent,
		DeleteBoxComponent,
		CreateBoxComponent,
		CreateTraceComponent,
		DeleteTraceComponent,
		UserDetailsComponent
	],
	imports: [ CommonModule, RouterModule, FormsModule ],
	exports: [ RouterModule, AllNodesComponent ]
})
export class TraceModModule {}
