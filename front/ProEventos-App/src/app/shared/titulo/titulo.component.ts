import { Router, RouterModule } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.css']
})
export class TituloComponent implements OnInit {
   @Input() titulo: string = '';
   @Input() subtitulo: string = 'Desde 2021';
   @Input() iconClass: string = 'fa fa-user';
   @Input() botaoListar = false;

   constructor(private router: Router) {}

   ngOnInit(): void {}

   listar(): void {
     this.router.navigate([`/${this.titulo.toLocaleLowerCase()}/lista`]);
   }
}
