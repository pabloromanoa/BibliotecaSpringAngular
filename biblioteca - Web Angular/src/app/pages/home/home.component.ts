import { Component,AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MessageAlertComponent } from 'src/app/components/message-alert/message-alert.component';
import { Libro } from 'src/app/entities/libro';
import { MessageInterface } from 'src/app/entities/message_component.interface';
import { FuncionesService } from 'src/app/services/funciones.service';
import { EditModalComponent } from './edit-modal/edit-modal.component';

export interface LibroData {
  id: number;
  titulo: string;
  tipo: string;
  editorial: string;
  autor: string;
  anio: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'titulo', 'tipo', 'editorial','autor','anio','actions'];
  dataSource: MatTableDataSource<LibroData>;
  librosData: LibroData[] = [];
  libros: Libro[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private funcionesService: FuncionesService, public dialog: MatDialog) { 
    this.dataSource = new MatTableDataSource(this.librosData);
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filter = null;
    this.getData();
  }

  async getData(){
    this.libros = await new Promise(resolve =>{
      this.funcionesService.getAllLibros().subscribe((res: Libro[]) =>{
        resolve(res)
      })
    })
    console.log('LIBROS: ',this.libros)
    this.setTable();
  }

  setTable(){
    
    this.libros.forEach(l =>{
      const data: LibroData = {
      id : l.id_libro,
      titulo : l.titulo,
      editorial : l.editorial,
      tipo : l.tipo.descripcion,
      anio : l.anyo,
      autor : l.autor
      }
      console.log('data:',data)
      this.librosData.push(data);
    })
    console.log('data:',this.librosData);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editLibro(id: number){
    const libro = this.libros.find(l => l.id_libro == id);
    const dialogRef = this.dialog.open(EditModalComponent,{
      data:{
        libro: libro
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    this.getData();
  }

  async deleteLibro(id: number){
    const message: MessageInterface = {
      title: 'Eliminar Libro',
      type: 'question',
      text: '¿Está seguro que desea eliminar el libro?'
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
          this.funcionesService.deleteLibro(id).subscribe(res => {
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
