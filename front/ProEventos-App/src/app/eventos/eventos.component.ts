import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public eventos: any = [];
  public eventosFiltrados: any = [];

  mostrarImagem: boolean = true;
  private _filtroLista: string = '';

  public get filtroLista(){
    return this._filtroLista
  };
  public set filtroLista(value: string){
    this._filtroLista = value;
    this.eventosFiltrados = this._filtroLista ?
    this.filtrarEventos(this._filtroLista):
    this.eventos;
  };

  filtrarEventos(filtrarPor: string):any{
      filtrarPor = filtrarPor.toLocaleLowerCase();
      return this.eventos.filter(
        (_: any) => _.tema.toLocaleLowerCase().indexOf(filtrarPor)
        !== -1 ||_.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
      );
  }
  constructor(private http: HttpClient)
  {

  }

  ngOnInit() {
    this.getEventos();
  }

  alterarImagem() {
    this.mostrarImagem = !this.mostrarImagem;
  }
  public getEventos() : void{
    this.http.get('https://localhost:7132/Evento').subscribe(
      response => {
        this.eventos = response;
        this.eventosFiltrados = response;
      },
      error => console.log(error)
    );
  }
}

