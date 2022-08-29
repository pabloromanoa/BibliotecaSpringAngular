import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSliderModule } from '@angular/material/slider';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { EditModalComponent } from './pages/home/edit-modal/edit-modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { NewLibroComponent } from './pages/new-libro/new-libro.component';
import { MessageAlertComponent } from './components/message-alert/message-alert.component';
import { PrestamoComponent } from './pages/prestamo/prestamo.component';
import { LectoresComponent } from './pages/lectores/lectores.component';
import { NewLectorComponent } from './pages/new-lector/new-lector.component';
import { EditLectorModalComponent } from './pages/lectores/edit-lector-modal/edit-lector-modal.component';
import { NewPrestamoComponent } from './pages/prestamo/new-prestamo/new-prestamo.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    EditModalComponent,
    NewLibroComponent,
    MessageAlertComponent,
    PrestamoComponent,
    LectoresComponent,
    NewLectorComponent,
    EditLectorModalComponent,
    NewPrestamoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSliderModule,
    NgbModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
