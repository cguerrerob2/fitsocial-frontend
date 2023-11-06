import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Message {
  id: number,
  sender: string,
  content: string,
  date: string
}

@Injectable({
  providedIn: 'root'
})
export class ChatApiService {
  private baseUrl = 'http://localhost:8080/communities/';

  constructor(private http: HttpClient) {}

  // Método para obtener mensajes del chat
  getChatMessages(): Observable<Message[]> {
    const url = `${this.baseUrl}`;
    return this.http.get<Message[]>(url);
  }

  // Método para enviar un mensaje al chat
  sendMessage(message: string): Observable<any> {
    const url = `${this.baseUrl}`;
  
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
  
    // Formatea la hora en el formato deseado (por ejemplo, "hh:mm a. m." o "hh:mm p. m.")
    const ampm = hours >= 12 ? 'p. m.' : 'a. m.';
    const formattedHours = hours % 12 || 12; // Convierte las 0 horas en 12 horas
  
    const formattedTime = `${formattedHours < 10 ? '0' : ''}${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
  
    const body = { sender: 'Anonimo', content: message, date: formattedTime };
  
    return this.http.post(url, body);
  }
  
}
