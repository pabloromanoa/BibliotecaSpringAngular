import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { MessageAlertComponent } from 'src/app/components/message-alert/message-alert.component';
import { LectorApi } from 'src/app/entities/lector';
import { MessageInterface } from 'src/app/entities/message_component.interface';
import { FuncionesService } from 'src/app/services/funciones.service';

@Component({
  selector: 'app-new-lector',
  templateUrl: './new-lector.component.html',
  styleUrls: ['./new-lector.component.scss']
})
export class NewLectorComponent implements OnInit {

  token: string = '';
  lectorForm = new FormGroup({
    nombre: new FormControl('',Validators.required),
    direccion: new FormControl('',Validators.required),
    telefono: new FormControl('',Validators.required),
  });

  constructor(private cookieService: CookieService, private funcionesService: FuncionesService, public dialog: MatDialog) { 
    this.token = this.cookieService.get('access_token');
  }

  ngOnInit(): void {
  }

  async addLector(){
    const newLector: LectorApi ={
      nombre: this.lectorForm.get('nombre')?.value,
      direccion: this.lectorForm.get('direccion')?.value,
      telefono: this.lectorForm.get('telefono')?.value,

    }
    await new Promise(resolve => {
      this.funcionesService.createLector(newLector).subscribe(res => resolve(res));
      const message: MessageInterface = {
        title: 'Lector creado',
        type: 'success',
        text: 'El lector se ha creado con éxito'
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
