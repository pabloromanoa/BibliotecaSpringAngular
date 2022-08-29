import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { Copia, CopiaApi } from "../entities/copia";
import { Lector, LectorApi } from "../entities/lector";
import { Libro, LibroApi } from "../entities/libro";
import { Multa, MultaApi } from "../entities/multa";
import { Prestamo, PrestamoApi } from "../entities/prestamo";
import { TipoLibro } from "../entities/tipoLibro";
import { RequestsService } from "./requests/requests.service";

@Injectable({
  providedIn: 'root'
})
export class FuncionesService {

  token: string;
  libros: Libro[] = [];

  constructor(private requestService: RequestsService, private cookieService: CookieService) {
    this.token = this.cookieService.get('access_token');
  }

  //LIBROS

  getAllLibros(): Observable<Libro[]> {
    const url = 'libros';
    return this.requestService._get(url, this.token);
  }

  getAllTipos(): Observable<TipoLibro[]> {
    const url = 'tipos';
    return this.requestService._get(url, this.token);
  }

  updateLibro(libro: LibroApi): Observable<Libro> {
    const url = `libros/${libro.id_libro}`;
    return this.requestService._put(url, libro, this.token);
  }

  createLibro(libro: LibroApi): Observable<Libro>{
    const url = 'libros';
    return this.requestService._post(url,libro,this.token);
  }

  deleteLibro(id: number){
    const url = `libros/${id}`;
    return this.requestService._delete(url,this.token);
  }

  //COPIAS

  getAllCopias(): Observable<Copia[]> {
    const url = 'copias';
    return this.requestService._get(url, this.token);
  }

  cambioEstadoCopia(copia: CopiaApi): Observable<Copia>{
    const url = `copias/${copia.id_copia}`;
    return this.requestService._put(url, copia, this.token);
  }

  //PRESTAMOS

  createPrestamo(prestamo: PrestamoApi): Observable<Prestamo>{
    const url = 'prestamos';
    return this.requestService._post(url,prestamo,this.token);
  }

  getAllPrestamos(): Observable<Prestamo[]> {
    const url = 'prestamos';
    return this.requestService._get(url, this.token);
  }

  deletePrestamo(id: number){
    const url = `prestamos/${id}`;
    return this.requestService._delete(url,this.token);
  }

  updatePrestamo(prestamo: Prestamo): Observable<Prestamo> {
    const url = `prestamos/${prestamo.id_prestamo}`;
    return this.requestService._put(url, prestamo, this.token);
  }

  calcularFinPrestamo(inicio): Date{
    const fecha = new Date(inicio);
    return new Date(fecha.setDate(fecha.getDate() + 30));
  }

  //LECTORES

  createLector(lector: LectorApi): Observable<Lector>{
    const url = 'lectores';
    return this.requestService._post(url,lector,this.token);
  }

  getAllLectores(): Observable<Lector[]> {
    const url = 'lectores';
    return this.requestService._get(url, this.token);
  }

  deleteLector(id: number){
    const url = `lectores/${id}`;
    return this.requestService._delete(url,this.token);
  }

  updateLector(lector: LectorApi): Observable<Lector> {
    const url = `lectores/${lector.id_lector}`;
    return this.requestService._put(url, lector, this.token);
  }

  //MULTAS

  createMulta(multa: MultaApi): Observable<Multa>{
    const url = 'multas';
    return this.requestService._post(url,multa,this.token);
  }

  deleteMultas(id: number){
    const url = `multas/${id}`;
    return this.requestService._delete(url,this.token);
  }

  updateMulta(multas: MultaApi): Observable<Multa> {
    const url = `multas/${multas.id_multa}`;
    return this.requestService._put(url, multas, this.token);
  }

  getAllMultas(): Observable<Multa[]> {
    const url = 'multas';
    return this.requestService._get(url, this.token);
  }

  calcularFinMulta(inicio): Date{
    const now = new Date();
    const fecha = new Date(inicio);
    const dias: number = (now.getDate() - inicio.getDate())*2;
    console.log('DIAS', dias);
    return new Date(fecha.setDate(fecha.getDate() + dias));
  }

  imprimirFechaMulta(multa: Multa): string{
    return multa.fFin.getFullYear+'/'+multa.fFin.getMonth+'/'+multa.fFin.getDate;
  }

}