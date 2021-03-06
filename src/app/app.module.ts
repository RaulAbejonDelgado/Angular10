import { PartnerService } from './service/partner.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { PartnersComponent } from './components/partners/partners.component';
import { Routes} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { PartnerFormComponent } from './components/partner-form/partner-form.component';
import {FormsModule} from '@angular/forms';
import { PartnerDetailComponent } from './components/partner-detail/partner-detail.component';
import { Region } from './model/region';
import { LoginComponent } from './components/login/login.component';






const routes: Routes = [
  { path: 'partners', component: PartnersComponent},
  { path: 'directiva', component: DirectivaComponent},
  { path: '', redirectTo: '/partners', pathMatch: 'full'},
  { path: '**', component: PartnersComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    PartnersComponent,
    PartnerFormComponent,
    PartnerDetailComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [PartnerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
