import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { MessageAlertComponent } from 'src/app/components/message-alert/message-alert.component';
import { LibroApi } from 'src/app/entities/libro';
import { MessageInterface } from 'src/app/entities/message_component.interface';
import { TipoLibro } from 'src/app/entities/tipoLibro';
import { FuncionesService } from 'src/app/services/funciones.service';

@Component({
  selector: 'app-new-libro',
  templateUrl: './new-libro.component.html',
  styleUrls: ['./new-libro.component.scss']
})
export class NewLibroComponent implements OnInit {

  token: string = '';
  tiposLibro: TipoLibro[] = [];
  tipo: TipoLibro;
  libroForm = new FormGroup({
    titulo: new FormControl('',Validators.required),
    tipo: new FormControl('',Validators.required),
    autor: new FormControl('',Validators.required),
    editorial: new FormControl('',Validators.required),
    anio: new FormControl('',Validators.required),
  });

  constructor(private cookieService: CookieService, private funcionesService: FuncionesService, public dialog: MatDialog) {

   }

  ngOnInit(): void {
    this.token = this.cookieService.get('access_token');
    this.getTiposLibro();

  }

  async getTiposLibro(){
    this.tiposLibro = await new Promise(resolve =>{
      this.funcionesService.getAllTipos().subscribe((res: TipoLibro[]) =>{
        resolve(res)
      })
    })
    console.log('TIPOS: ',this.tiposLibro)
  }

  async addLibro(){
    this.tipo = this.tiposLibro.find(t => t.id_tipo == this.libroForm.get('tipo')?.value);
    const newLibro: LibroApi ={
      titulo: this.libroForm.get('titulo')?.value,
      tipo: this.tipo,
      editorial: this.libroForm.get('editorial')?.value,
      anyo: this.libroForm.get('anio')?.value,
      autor: this.libroForm.get('autor')?.value,
    }
    await new Promise(resolve => {
      this.funcionesService.createLibro(newLibro).subscribe(res => resolve(res));
      const message: MessageInterface = {
        title: 'Libro creado',
        type: 'success',
        text: 'El libro se ha creado con éxito'
      }
  
      const result = this.dialog.open(MessageAlertComponent, {
        data: message,
        panelClass: message.type
      })
      result.afterClosed().subscribe(async res => {
      console.log("RESULTADO : ", res);
    })
  })
  }

}
