import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FundacionesComponent } from './fundaciones.component';

const routes: Routes = [{ path: '', component: FundacionesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FundacionesRoutingModule { }
