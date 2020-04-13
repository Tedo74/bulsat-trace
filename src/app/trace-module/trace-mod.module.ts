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
		CreateBoxComponent
	],
	imports: [ CommonModule, RouterModule, FormsModule ],
	exports: [ RouterModule, AllNodesComponent ]
})
export class TraceModModule {}
