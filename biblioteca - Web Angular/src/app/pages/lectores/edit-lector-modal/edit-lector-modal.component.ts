import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { Lector, LectorApi } from 'src/app/entities/lector';
import { FuncionesService } from 'src/app/services/funciones.service';

@Component({
  selector: 'app-edit-lector-modal',
  templateUrl: './edit-lector-modal.component.html',
  styleUrls: ['./edit-lector-modal.component.scss']
})
export class EditLectorModalComponent implements OnInit {

  token: string = '';
  lectorForm = new FormGroup({
    id: new FormControl(),
    nombre: new FormControl(),
    direccion: new FormControl(),
    telefono: new FormControl(),
  });
  datalector: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {lector: Lector} , private cookieService: CookieService, private funcionesService: FuncionesService,
              private dialogRef: MatDialogRef<EditLectorModalComponent>) {
    this.datalector = data.lector;
    console.log('datalibro: ',this.datalector)
  }

  ngOnInit(): void {
    this.token = this.cookieService.get('access_token');
    this.lectorForm.setValue({
      id: this.datalector.id_lector,
      nombre: this.datalector.nombre,
      direccion: this.datalector.direccion,
      telefono: this.datalector.telefono,
    })
  }

  async submit(){

    const editLector: Lector ={
      id_lector: this.lectorForm.get('id')?.value,
      nombre: this.lectorForm.get('nombre')?.value,
      direccion: this.lectorForm.get('direccion')?.value,
      telefono: this.lectorForm.get('telefono')?.value,
    }
    await new Promise(resolve => {
      this.funcionesService.updateLector(editLector).subscribe(res => resolve(res));
    })

    this.dialogRef.close();
  }
}
