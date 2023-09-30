import { Component, inject, OnInit } from '@angular/core';
import { OpenTablesApiService } from '../@api/open-tables-api.service';
import { Router } from '@angular/router';

interface OpenTable {
  name: string;
  capacity: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  openTables: OpenTable[] = []

  openTablesApiService = inject(OpenTablesApiService)

  message = ''

  openTable: OpenTable = {
    name: '',
    capacity: 0
  }

  // async ngOnInit() {
  //   await this.loadData();
  // }

  // private async loadData() {
  //   this.openTables = await this.openTablesApiService.getListOpenTables();
  // }

  // async saveOpenTable() {
  //   console.log('Guardando mesa: ' + this.openTable.name)
  //   this.message = `Mesa "${this.openTable.name}" guardada`

  //   await this.openTablesApiService.saveOpenTable(this.openTable);
  //   await this.loadData();
  //   // clear form
  //   this.openTable = {
  //     name: '',
  //     capacity: 0
  //   }

  //   setTimeout(() => {
  //     this.message = '';
  //   }, 2000)
  // }

  constructor(private router: Router) {}
  
  redirectToLogin() {
    this.router.navigate(['login']); // Esta ruta debe coincidir con la configuración de tu enrutador
  }
}
