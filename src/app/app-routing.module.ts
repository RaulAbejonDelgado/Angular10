import { LoginComponent } from './components/login/login.component';
import { PartnerFormComponent } from './components/partner-form/partner-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PartnersComponent } from './components/partners/partners.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { PartnerDetailComponent } from './components/partner-detail/partner-detail.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'partners', component: PartnersComponent},
  { path: 'partners/page/:page', component: PartnersComponent},
  { path: 'partners/:id', component: PartnersComponent},
  { path: 'directiva', component: DirectivaComponent},
  { path: 'partner-detail', component: PartnerDetailComponent},
  { path: 'partner-form', component: PartnerFormComponent},
  { path: 'partner-form/:id', component: PartnerFormComponent},
  { path: '', redirectTo: 'partners/page/'+0, pathMatch: 'full'},
  { path: '**', component: PartnersComponent }
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

