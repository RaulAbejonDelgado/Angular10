import { PartnerFormComponent } from './components/partner-form/partner-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PartnersComponent } from './components/partners/partners.component';
import { DirectivaComponent } from './directiva/directiva.component';


const routes: Routes = [
  { path: 'partners', component: PartnersComponent},
  { path: 'directiva', component: DirectivaComponent},
  { path: 'partner-form', component: PartnerFormComponent},
  { path: '', redirectTo: '/partners', pathMatch: 'full'},
  { path: '**', component: PartnersComponent }
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

