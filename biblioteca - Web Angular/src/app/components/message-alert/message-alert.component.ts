import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageInterface } from 'src/app/entities/message_component.interface';

@Component({
  selector: 'app-message-alert',
  templateUrl: './message-alert.component.html',
  styleUrls: ['./message-alert.component.scss']
})
export class MessageAlertComponent implements OnInit {

  message: MessageInterface;
  input = '';

  constructor(@Inject(MAT_DIALOG_DATA) public m: MessageInterface, private dialogRef: MatDialogRef<MessageAlertComponent>) {
    this.message = m;
  }

  ngOnInit(): void {
  }
  
  closeInput(){
    this.dialogRef.close(this.input);
  }

  close(reason){

    this.dialogRef.close(reason);
  }

}
