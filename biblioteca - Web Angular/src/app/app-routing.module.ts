import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LectoresComponent } from './pages/lectores/lectores.component';
import { NewLectorComponent } from './pages/new-lector/new-lector.component';
import { NewLibroComponent } from './pages/new-libro/new-libro.component';
import { PrestamoComponent } from './pages/prestamo/prestamo.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home',component: HomeComponent},
  {path: 'nuevoLibro',component: NewLibroComponent},
  {path: 'prestamo',component: PrestamoComponent},
  {path: 'lectores',component: LectoresComponent},
  {path: 'nuevoLector',component: NewLectorComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
