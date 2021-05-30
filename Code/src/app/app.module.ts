import { HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperModule } from 'ngx-image-cropper';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IncidenciesComponent } from './incidencies/incidencies.component';
import { MenuComponent } from './menu/menu.component';
import { ConfigComponent } from './config/config.component';
import { RegistreComponent } from './registre/registre.component';
import { DetallComponent } from './detall/detall.component';
import { DashComponent } from './dash/dash.component';
import { GrupsComponent } from './grups/grups.component';
import { LoginComponent } from './login/login.component';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { CanvicontrasenyaComponent } from './canvicontrasenya/canvicontrasenya.component';

@NgModule({
  declarations: [
    AppComponent,
    IncidenciesComponent,
    MenuComponent,
    ConfigComponent,
    DashComponent,
    GrupsComponent,
    DetallComponent,
    RegistreComponent,
    LoginComponent,
    PasswordresetComponent,
    CanvicontrasenyaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ImageCropperModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
