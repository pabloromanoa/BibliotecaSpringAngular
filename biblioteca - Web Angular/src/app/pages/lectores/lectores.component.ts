import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MessageAlertComponent } from 'src/app/components/message-alert/message-alert.component';
import { Lector } from 'src/app/entities/lector';
import { MessageInterface } from 'src/app/entities/message_component.interface';
import { Multa } from 'src/app/entities/multa';
import { FuncionesService } from 'src/app/services/funciones.service';
import { EditModalComponent } from '../home/edit-modal/edit-modal.component';
import { EditLectorModalComponent } from './edit-lector-modal/edit-lector-modal.component';

export interface LectorData {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string;
  multa: string;

}

@Component({
  selector: 'app-lectores',
  templateUrl: './lectores.component.html',
  styleUrls: ['./lectores.component.scss']
})
export class LectoresComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nombre', 'direccion', 'telefono','multa','actions'];
  dataSource: MatTableDataSource<LectorData>;
  lectoresData: LectorData[] = [];
  lectores: Lector[] = [];
  multas: Multa[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private funcionesService: FuncionesService, public dialog: MatDialog) { 
    this.dataSource = new MatTableDataSource(this.lectoresData);
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getData();
  }

  async getData(){
    this.lectores = await new Promise(resolve =>{
      this.funcionesService.getAllLectores().subscribe((res: Lector[]) =>{
        resolve(res)
      })
    })
    this.multas = await new Promise(resolve =>{
      this.funcionesService.getAllMultas().subscribe((res: Multa[]) =>{
        resolve(res)
      })
    })
    console.log('LECTORES: ',this.lectores)
    console.log('MULTAS: ',this.multas)
    this.setTable();
  }

  setTable(){
    this.lectores.forEach(l =>{
      const multa = this.multas.find(m => m.lector.id_lector == l.id_lector);
      const fecha = multa!=null? this.funcionesService.imprimirFechaMulta(multa):'NO';
      const data: LectorData = {
      id: l.id_lector,
      nombre: l.nombre,
      direccion: l.direccion,
      telefono: l.telefono,
      multa: fecha
      }
      console.log('data:',data)
      this.lectoresData.push(data);
    })
    console.log('data:',this.lectoresData);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editLector(id: number){
    const lector = this.lectores.find(l => l.id_lector == id);
    const dialogRef = this.dialog.open(EditLectorModalComponent,{
      data:{
        lector: lector
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    this.getData();
  }

  async deleteLector(id: number){
    const message: MessageInterface = {
      title: 'Eliminar Lector',
      type: 'question',
      text: '¿Está seguro que desea eliminar el lector?'
    }

    const result = this.dialog.open(MessageAlertComponent, {
      data: message,
      panelClass: message.type
    })
    result.afterClosed().subscribe(async res => {
    console.log("RESULTADO : ", res);
    
    if(res){
      await new Promise(resolve =>{
        try {
          this.funcionesService.deleteLector(id).subscribe(res => {
            resolve(res)
          })
        } catch (error) {
          console.log("ERROR: ",error);
        }
      })
    }
  })
  this.getData();
  }

}
