import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MessageAlertComponent } from 'src/app/components/message-alert/message-alert.component';
import { Copia } from 'src/app/entities/copia';
import { MessageInterface } from 'src/app/entities/message_component.interface';
import { Multa, MultaApi } from 'src/app/entities/multa';
import { Prestamo, PrestamoApi } from 'src/app/entities/prestamo';
import { FuncionesService } from 'src/app/services/funciones.service';
import { NewPrestamoComponent } from './new-prestamo/new-prestamo.component';

export interface PrestamoData {
  id: number;
  libro: string;
  lector: string;
  fechaInicio: Date;
  fechaFin: Date;
}

@Component({
  selector: 'app-prestamo',
  templateUrl: './prestamo.component.html',
  styleUrls: ['./prestamo.component.scss']
})
export class PrestamoComponent implements OnInit {

  displayedColumns: string[] = ['id', 'libro', 'lector', 'fechaInicio', 'fechaFin', 'actions'];
  dataSource: MatTableDataSource<PrestamoData>;
  prestamosData: PrestamoData[] = [];
  prestamos: Prestamo[] = [];
  prestamo: Prestamo;
  copias: Copia[] = [];
  copia: Copia;
  multas: Multa[] = [];
  multa: Multa;
  nowDate: Date;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private funcionesService: FuncionesService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.prestamosData);
  }

  ngOnInit(): void {
    this.getData();
    this.nowDate = new Date();
  }

  async getData() {
    this.prestamos = await new Promise(resolve => {
      this.funcionesService.getAllPrestamos().subscribe((res: Prestamo[]) => {
        resolve(res)
      })
    })
    this.copias = await new Promise(resolve => {
      this.funcionesService.getAllCopias().subscribe((res: Copia[]) => {
        resolve(res)
      })
    })
    this.multas = await new Promise(resolve => {
      this.funcionesService.getAllMultas().subscribe((res: Multa[]) => {
        resolve(res)
      })
    })


    console.log('PRESTAMOS: ', this.prestamos)
    console.log('COPIAS: ', this.copias)
    this.prestamos.forEach(p => {

      if (p.fin > this.nowDate) {
        const editCopia: Copia = {
          id_copia: p.copia.id_copia,
          estado: 1, //retraso
          libro: p.copia.libro
        }

        new Promise(resolve => {
          this.funcionesService.cambioEstadoCopia(editCopia).subscribe(res => resolve(res));
        });
        console.log('CAMBIO ESTADO A RETRASO', p.copia);
      }

    })

    this.setTable();
  }

  setTable() {

    this.prestamos.forEach(l => {
      const data: PrestamoData = {
        id: l.id_prestamo,
        libro: l.copia.libro.titulo,
        lector: l.lector.nombre,
        fechaInicio: l.inicio,
        fechaFin: l.fin,
      }
      this.prestamosData.push(data);
    })
    console.log('data:', this.prestamosData);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  newPrestamo() {
    const dialogRef = this.dialog.open(NewPrestamoComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  async devolver(id: number) {
    const message: MessageInterface = {
      title: 'Devolver Préstamo ',
      type: 'question',
      text: '¿Está seguro que desea devolver el préstamo?'
    }

    const result = this.dialog.open(MessageAlertComponent, {
      data: message,
      panelClass: message.type
    })
    result.afterClosed().subscribe(async res => {
      console.log("RESULTADO : ", res);

      if (res) {
        this.prestamo = this.prestamos.find(p => p.id_prestamo = id);
        this.copia = this.copias.find(c => c.id_copia == this.prestamo.copia.id_copia);
        this.multa = this.multas.find(m => m.lector.id_lector == this.prestamo.lector.id_lector);
        if (this.copia.estado.toString() == 'RETRASO') {

          if (this.multa == null) {
            const multa: MultaApi = {
              lector: this.prestamo.lector,
              fInicio: this.nowDate,
              fFin: this.funcionesService.calcularFinMulta(this.nowDate)
            }
            await new Promise(resolve => {
              this.funcionesService.createMulta(multa).subscribe(res => resolve(res));
            })
            console.log('MULTA CREADA');
          } else {
            const multa: MultaApi = {
              id_multa: this.multa.id_multa,
              lector: this.prestamo.lector,
              fInicio: this.nowDate,
              fFin: this.funcionesService.calcularFinMulta(this.nowDate)
            }
            await new Promise(resolve => {
              this.funcionesService.updateMulta(multa).subscribe(res => resolve(res));
            })
            console.log('MULTA ACTUALIZADA');
          }
        }
        console.log('copia:',this.copia)
        const editCopia: Copia = {
          id_copia: this.copia.id_copia,
          estado: 2, //biblioteca
          libro: this.copia.libro
        }

        await new Promise(resolve => {
          this.funcionesService.cambioEstadoCopia(editCopia).subscribe(res => resolve(res));
        })
        await new Promise(resolve => {
          try {
            this.funcionesService.deletePrestamo(id).subscribe(res => {
              resolve(res)
            })
          } catch (error) {
            console.log("ERROR: ", error);
          }
        })

      }
    })
    this.getData();
  }

}
