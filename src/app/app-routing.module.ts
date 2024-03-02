import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PessoasComponentComponent } from './components/pessoas-component/pessoas-component.component';

const routes: Routes = [{
  path : `pessoas`, component: PessoasComponentComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
