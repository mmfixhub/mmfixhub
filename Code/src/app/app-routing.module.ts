import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigComponent } from './config/config.component';
import { DetallComponent } from './detall/detall.component';
import { IncidenciesComponent } from './incidencies/incidencies.component';
import { LoginComponent } from './login/login.component';
import { RegistreComponent } from './registre/registre.component';

const routes: Routes = [
  { path: '', pathMatch:'full',redirectTo: '/login'},
  { path: 'incidencies', component: IncidenciesComponent},
  { path: 'login', component: LoginComponent},
  { path: 'detall', component: DetallComponent},
  { path: 'config', component: ConfigComponent},
  { path: 'registre', component: RegistreComponent},
  { path: '**', redirectTo:'/login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
