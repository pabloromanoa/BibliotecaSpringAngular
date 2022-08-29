import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MessageAlertComponent } from 'src/app/components/message-alert/message-alert.component';
import { Copia, CopiaApi } from 'src/app/entities/copia';
import { Lector } from 'src/app/entities/lector';
import { Libro } from 'src/app/entities/libro';
import { MessageInterface } from 'src/app/entities/message_component.interface';
import { Multa } from 'src/app/entities/multa';
import { Prestamo, PrestamoApi } from 'src/app/entities/prestamo';
import { FuncionesService } from 'src/app/services/funciones.service';

@Component({
  selector: 'app-new-prestamo',
  templateUrl: './new-prestamo.component.html',
  styleUrls: ['./new-prestamo.component.scss']
})
export class NewPrestamoComponent implements OnInit {

  copias: Copia[] = [];
  copia: Copia;
  copiasIdLibros: number[] = [];
  libros: Libro[] = [];
  lectores: Lector[] = [];
  multas: Multa[] = [];
  multa: Multa;
  lector: Lector;
  nowDate: Date;
  finDate: Date;
  inicioDate: Date;
  prestamosLector: Prestamo[] = [];
  prestamos: Prestamo[] = [];

  prestamoForm = new FormGroup({
    id_lector: new FormControl('', Validators.required),
    id_libro: new FormControl('', Validators.required),
  });

  constructor(private funcionesService: FuncionesService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getData();
    this.nowDate = new Date();
  }

  async getData() {
    this.libros = await new Promise(resolve => {
      this.funcionesService.getAllLibros().subscribe((res: Libro[]) => {
        resolve(res)
      })
    })
    this.copias = await new Promise(resolve => {
      this.funcionesService.getAllCopias().subscribe((res: Copia[]) => {
        resolve(res)
      })
    })
    console.log('COPIAS: ', this.copias);

    this.copias = this.copias.filter(c => c.estado.toString() == 'BIBLIOTECA'); //estado: BIBLIOTECA
    this.copias.forEach(c => {
      this.copiasIdLibros.push(c.libro.id_libro);
    })
    this.lectores = await new Promise(resolve => {
      this.funcionesService.getAllLectores().subscribe((res: Lector[]) => {
        resolve(res)
      })
    })
    this.multas = await new Promise(resolve => {
      this.funcionesService.getAllMultas().subscribe((res: Multa[]) => {
        resolve(res)
      })
    })
    this.prestamos = await new Promise(resolve => {
      this.funcionesService.getAllPrestamos().subscribe((res: Prestamo[]) => {
        resolve(res)
      })
    })

    this.multas.forEach(m => {
      if (m.fFin <= this.nowDate) {
        const id = m.id_multa;
        new Promise(resolve => {
          this.funcionesService.deleteMultas(id).subscribe(res => resolve(res));
        });
      }
    })

    console.log('LIBROS: ', this.libros);
    console.log('COPIAS filtradas: ', this.copias);
    console.log('LECTORES: ', this.lectores);
    console.log('MULTAS: ', this.multas);
    console.log('PRESTAMOS: ', this.prestamos);
    console.log('COPIAS ID LIBROS: ', this.copiasIdLibros);
  }


  async prestarLibro() {

    if (this.copiasIdLibros.includes(this.prestamoForm.get('id_libro').value)) {

      this.copia = this.copias.find(c => c.libro.id_libro == this.prestamoForm.get('id_libro').value);
      this.lector = this.lectores.find(l => l.id_lector == this.prestamoForm.get('id_lector').value);
      this.multa = this.multas.find(m => m.lector.id_lector == this.prestamoForm.get('id_lector').value);
      this.prestamosLector = this.prestamos.filter(p => p.lector.id_lector == this.prestamoForm.get('id_lector').value);
      console.log('PRESTAMOS LECTOR: ',this.prestamosLector)
      if (this.multa == null && this.prestamosLector.length<3) {

        const editCopia: Copia = {
          id_copia: this.copia.id_copia,
          estado: 0, //prestado
          libro: this.copia.libro
        }
        await new Promise(resolve => {
          this.funcionesService.cambioEstadoCopia(editCopia).subscribe(res => resolve(res));
        })
        this.inicioDate = this.nowDate;
        this.finDate = this.funcionesService.calcularFinPrestamo(this.inicioDate);
        console.log('fecha inicio: ', this.inicioDate);
        console.log('fecha fin: ', this.finDate);
        const newPrestamo: PrestamoApi = {
          inicio: this.inicioDate,
          fin: this.finDate,
          lector: this.lector,
          copia: this.copia
        }
        await new Promise(resolve => {
          this.funcionesService.createPrestamo(newPrestamo).subscribe(res => resolve(res));
        })
        const message: MessageInterface = {
          title: 'PRESTAMO CREADO',
          type: 'success',
          text: 'El prestamo se creó correctamente'
        }

        const result = this.dialog.open(MessageAlertComponent, {
          data: message,
          panelClass: message.type
        })
        result.afterClosed().subscribe(async res => {
          console.log("RESULTADO : ", res);
        })
      } else {
        const message: MessageInterface = {
          title: 'NO PUEDE REALIZAR PRESTAMOS',
          type: 'error',
          text: 'El lector posee una multa aun no cumplida o ya tiene 3 prestamos'
        }

        const result = this.dialog.open(MessageAlertComponent, {
          data: message,
          panelClass: message.type
        })
        result.afterClosed().subscribe(async res => {
          console.log("RESULTADO : ", res);
        })
      }
    } else {
      const message: MessageInterface = {
        title: 'COPIA NO DISPONIBLE',
        type: 'error',
        text: 'El libro seleccionado no posee copias disponibles'
      }

      const result = this.dialog.open(MessageAlertComponent, {
        data: message,
        panelClass: message.type
      })
      result.afterClosed().subscribe(async res => {
        console.log("RESULTADO : ", res);
      })
    }
  }
}
