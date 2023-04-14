import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../../models/Evento';

@Injectable({
  providedIn: 'root',
})
export class EventoService {
  baseUrl = 'https://localhost:7132/Evento';
  constructor(private http: HttpClient) {}

  getEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.baseUrl);
  }
  getEventosBtTema(tema: string): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.baseUrl}/${tema}/tema`);
  }
  getEventosBId(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.baseUrl}/${id}/id`);
  }
}
