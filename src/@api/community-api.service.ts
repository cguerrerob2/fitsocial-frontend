import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// community.model.ts
export interface Community {
  id: number;
  name: string;
  theme: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommunityApiService {
  private baseUrl = 'http://localhost:8080/communities/createCommunity';

  constructor(private http: HttpClient) {}

  getListCommunities(): Observable<Community[]> {
    return this.http.get<Community[]>(`${this.baseUrl}`);
  }

  saveCommunity(community: Community): Observable<Community> {
    return this.http.post<Community>(`${this.baseUrl}`, community);
  }
}
