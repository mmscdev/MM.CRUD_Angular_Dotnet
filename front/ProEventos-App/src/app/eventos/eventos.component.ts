import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public eventos: any ;
  constructor(private http: HttpClient)
  {
    this.http.get('https://localhost:7132/Evento').subscribe(
      response => this.eventos = response,
      error => console.log(error)
    );
  }

  ngOnInit() {
    //this.getEventos();
  }
  public getEventos() : void{
    this.eventos = [{
      Tema: 'Angular',
      Local: 'Belo Horizonte'
    },
    {
      Tema: 'C#',
      Local: 'ES'
    },{
      Tema: 'React',
      Local: 'RJ'
    }]
  }
}

