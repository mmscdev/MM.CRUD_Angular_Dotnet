import { Component, OnInit, TemplateRef} from '@angular/core';
import { Evento } from 'src/models/Evento';
import { EventoService } from 'src/app/services/evento.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.scss']
})
export class EventoListaComponent {
  modalRef?: BsModalRef;
  public eventos: any = [];
  public eventosFiltrados: any = [];
  message?: string;

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
  constructor(
    private router: Router,
    private eventoService: EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService)
  {

  }

  ngOnInit() {
    this.spinner.show();
    this.getEventos();
  }

  detalheEvento(id :number):void{
  this.router.navigate([`eventos/detalhe/${id}`]);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.message = 'Confirmed!';
    this.modalRef?.hide();
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef?.hide();
  }
  alterarImagem() {
    this.mostrarImagem = !this.mostrarImagem;
  }
  public getEventos() : void{
    this.eventoService.getEventos().subscribe({
      next:(_eventos: Evento[])=> {
        this.eventos = _eventos;
        this.eventosFiltrados = this.eventos;
      },
      complete: ()=>  this.spinner.hide(),
      error: (error:any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao carregar os eventos.','Erro');
        console.log(error)
      }
  });
  }
}
