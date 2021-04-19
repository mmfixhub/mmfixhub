import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { ConfigComponent } from './config/config.component';
import { IncidenciesComponent } from './incidencies/incidencies.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', pathMatch:'full',redirectTo: '/login'},
  { path: 'incidencies', component: IncidenciesComponent},
  { path: 'login', component: LoginComponent},
  // { path: 'detall', component: DetallComponent},
  { path: 'config', component: ConfigComponent, canActivate: [MsalGuard]},
  { path: '**', redirectTo:'/login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
