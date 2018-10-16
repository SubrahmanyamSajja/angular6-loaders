import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoadersModule } from './loaders/loaders.module';
import { RouterModule, Route} from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';
import { AboutusComponent } from './aboutus/aboutus.component';

const appRoutes:Route[]=[
  {
    path:'',
    redirectTo:'dashboard',
    pathMatch:'full'
  },
  {
    path:'dashboard',
    component:DashboardComponent,
  },
  {
    path:'aboutus',
    component:AboutusComponent,
  },
  {
    path:'**',
    component:ErrorComponent
  }

];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ErrorComponent,
    AboutusComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LoadersModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
