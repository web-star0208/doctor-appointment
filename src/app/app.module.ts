import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { IdentificationComponent } from './identification/identification.component';
import { IndexComponent } from './index/index.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { InformationComponent } from './information/information.component';
import { DoctorIdentificationComponent } from './doctor-identification/doctor-identification.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';


const appRoutes: Routes = [
  { path: '', redirectTo: 'fr', pathMatch: 'full'},
  { path: 'fr', component: HomeComponent},
  { path: 'fr/identification', component: IdentificationComponent, canActivate: [AuthGuard]},
  { path: 'fr/inscription', component: RegisterComponent},
  { path: 'fr/a-propos-de-nous',   component: InformationComponent },
  { path: 'fr/faq',   component: InformationComponent},
  { path: 'fr/conditions-generales-d-utilisation',   component: InformationComponent },
  { path: 'fr/politique-de-confidentialite',   component: InformationComponent },
  { path: 'fr/nous-contacter',   component: InformationComponent },
  { path: 'fr/offres-d-emploi',   component: InformationComponent },
  { path: 'fr/rechercher-par-nom', component: IndexComponent},
  { path: 'fr/profil-patient', component: MyProfileComponent},
  { path: 'fr/docteur-rejoignez-doctori', component: DoctorIdentificationComponent},
  { path: '**', component: PageNotFoundComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IdentificationComponent,
    IndexComponent,
    MyProfileComponent,
    InformationComponent,
    DoctorIdentificationComponent,
    PageNotFoundComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    NgxIntlTelInputModule,
    BsDropdownModule.forRoot()
  ],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }