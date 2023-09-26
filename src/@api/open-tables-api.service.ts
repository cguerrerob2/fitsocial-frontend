import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';


export interface OpenTable {
  name: string
  capacity: number
}

export interface SaveTableResponse {
  message: string;
}


@Injectable({
  providedIn: 'root'
})
export class OpenTablesApiService {
  httpClient = inject(HttpClient)

  getListOpenTables() {
    return lastValueFrom(this.httpClient.get<OpenTable[]>('http://localhost:8080/open-tables/'));
  }

  async saveOpenTable(openTable: OpenTable) {
    return lastValueFrom(this.httpClient.post<SaveTableResponse>('http://localhost:8080/open-tables/', openTable));
  }
}
