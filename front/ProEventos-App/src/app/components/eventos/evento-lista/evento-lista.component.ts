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
  eventoId!: number;

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

  openModal(event: any,template: TemplateRef<any>, eventoId: number) {
    event.stopPropagation();
    this.eventoId = eventoId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef?.hide();
    this.message = 'Confirmed!';
    this.spinner.show();

    this.eventoService.deleteEvento(this.eventoId).subscribe(
      (result : any) => {
        if(result.message == "Deletado"){
          this.toastr.success('O Evento foi deletado com Sucesso.', 'Deletado!');
          this.spinner.hide();
          this.getEventos();
        }
      },
      (error: any) => {
        console.log(error);
        this.toastr.error(`Erro ao tentar deletar o evento ${this.eventoId}`);
        this.spinner.hide();
      },
      () =>{this.spinner.hide();}
    );
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
