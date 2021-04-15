import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncidenciesComponent } from './incidencies/incidencies.component';

const routes: Routes = [
  { path: '', pathMatch:'full',redirectTo: '/incidencies'},
  { path: 'incidencies', component: IncidenciesComponent},
  // { path: 'detall', component: DetallComponent},
  // { path: 'config', component: ConfigComponent},
  { path: '**', redirectTo:'/incidencies'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
