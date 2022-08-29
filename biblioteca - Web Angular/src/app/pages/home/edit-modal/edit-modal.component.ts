import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { Libro, LibroApi } from 'src/app/entities/libro';
import { TipoLibro } from 'src/app/entities/tipoLibro';
import { FuncionesService } from 'src/app/services/funciones.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {

  token: string = '';
  libroForm = new FormGroup({
    id: new FormControl(),
    titulo: new FormControl(),
    tipo: new FormControl(),
    autor: new FormControl(),
    editorial: new FormControl(),
    anio: new FormControl(),
  });

  tiposLibro: TipoLibro[] = [];
  datalibro: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: {libro: Libro} , private cookieService: CookieService, private funcionesService: FuncionesService,
              private dialogRef: MatDialogRef<EditModalComponent>) { 
    this.datalibro = data.libro;
    console.log('datalibro: ',this.datalibro)
  }

  ngOnInit(): void {
    this.token = this.cookieService.get('access_token');
    this.getTiposLibro();
    this.libroForm.setValue({
      id: this.datalibro.id_libro,
      titulo: this.datalibro.titulo,
      tipo: this.datalibro.tipo,
      autor: this.datalibro.autor,
      editorial: this.datalibro.editorial,
      anio: this.datalibro.anyo
    })
  }

  async getTiposLibro(){
    this.tiposLibro = await new Promise(resolve =>{
      this.funcionesService.getAllTipos().subscribe((res: TipoLibro[]) =>{
        resolve(res)
      })
    })
    console.log('TIPOS: ',this.tiposLibro)
  }

  async submit(){
    const tipo: TipoLibro = this.tiposLibro.find(t => t.id_tipo == this.libroForm.get('tipo').value);
    const editLibro: Libro ={
      id_libro: this.libroForm.get('id')?.value,
      titulo: this.libroForm.get('titulo')?.value,
      tipo: tipo,
      editorial: this.libroForm.get('editorial')?.value,
      anyo: this.libroForm.get('anio')?.value,
      autor: this.libroForm.get('autor')?.value,
    }
    await new Promise(resolve => {
      this.funcionesService.updateLibro(editLibro).subscribe(res => resolve(res));
    })

    this.dialogRef.close();
  }

}
