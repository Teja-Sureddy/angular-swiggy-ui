import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  constructor(private messageService: MessageService, private toast: ToastService) { }

  ngOnInit(): void {
    this.toast.passAlert.subscribe(value => {
      if (value) {
        this.alert(value[0], value[1]);
      }
    });
  }

  alert(severity: string, message: string) {
    this.messageService.clear();
    if (severity && message && this.messageService) {
      let summary = severity.charAt(0).toUpperCase() + severity.toLowerCase().slice(1);
      this.messageService.add({ severity: severity, summary: summary, detail: message, life: 5000 });
    }
  }
}
