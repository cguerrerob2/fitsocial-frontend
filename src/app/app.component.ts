import { Component, inject, OnInit } from '@angular/core';
import { OpenTablesApiService } from '../@api/open-tables-api.service';

interface OpenTable {
  name: string;
  capacity: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  openTables: OpenTable[] = []

  openTablesApiService = inject(OpenTablesApiService)

  message = ''

  openTable: OpenTable = {
    name: '',
    capacity: 0
  }

  async ngOnInit() {
    await this.loadData();
  }

  private async loadData() {
    this.openTables = await this.openTablesApiService.getListOpenTables();
  }

  async saveOpenTable() {
    console.log('Guardando mesa: ' + this.openTable.name)
    this.message = `Mesa "${this.openTable.name}" guardada`

    await this.openTablesApiService.saveOpenTable(this.openTable);
    await this.loadData();
    // clear form
    this.openTable = {
      name: '',
      capacity: 0
    }

    setTimeout(() => {
      this.message = '';
    }, 2000)
  }


}
