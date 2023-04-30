import { Evento } from './../../../../models/Evento';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventoService } from '@app/services/evento.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss'],
})
export class EventoDetalheComponent implements OnInit {
  form: FormGroup = this.fb.group({});
  evento = {} as Evento;
  imagemURL = 'assets/img/upload.png';
  estadoSalvar = 'post';

  constructor(
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private router: ActivatedRoute,
    private eventoService: EventoService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private modalService: BsModalService
  ) {
    this.localeService.use('pt-br');
  }

  ngOnInit(): void {
    this.carregarEvento();
    this.validation();
  }

  get f(): any {
    return this.form.controls;
  }

  public salvarAlteracao(): void {
    this.spinner.show();
    if (this.form.valid) {

      if (this.estadoSalvar == 'post') {
        this.evento = {id: this.evento.id, ...this.form.value };
        this.eventoService.post(this.evento).subscribe(
          () => {
            this.toastr.success('Evento Salvo com sucesso.', 'Sucesso');
          },
          (error: any) => {
            console.error(error);
            this.spinner.hide();
            this.toastr.error('Erro ao salvar o evento.', 'Erro');
          },
          () => {
            this.spinner.hide();
          }
        );
      }else{
        this.evento = {id: this.evento.id, ...this.form.value };
        this.eventoService.post(this.evento).subscribe(
          () => {
            this.toastr.success('Evento Salvo com sucesso.', 'Sucesso');
          },
          (error: any) => {
            console.error(error);
            this.spinner.hide();
            this.toastr.error('Erro ao salvar o evento.', 'Erro');
          },
          () => {
            this.spinner.hide();
          }
        );
      }
    }
  }

  public carregarEvento(): void {
    const eventoId = this.router.snapshot.paramMap.get('id');

    if (eventoId !== null) {
      this.spinner.show();
      this.estadoSalvar = 'put';
      this.eventoService
        .getEventoById(+eventoId)
        .subscribe(
          (evento: Evento) => {
            this.evento = { ...evento };
            this.form.patchValue(this.evento);
            if (this.evento.imagemURL !== '') {
              //this.imagemURL = environment.apiURL + 'resources/images/' + this.evento.imagemURL;
            }
            //this.carregarLotes();
          },
          (error: any) => {
            this.toastr.error('Erro ao tentar carregar Evento.', 'Erro!');
            console.error(error);
          }
        )
        .add(() => this.spinner.hide());
    }
  }

  public validation(): void {
    this.form = this.fb.group({
      tema: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
      local: ['', Validators.required],
      dataEvento: ['', [Validators.required, Validators.max(12000)]],
      qtdPessoas: new FormControl('', Validators.required),
      telefone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  public resetForm(): void {
    this.form.reset();
  }

  public cssValidator(campoForm: FormControl | AbstractControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }

  get bsConfig(): any {
    return {
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY hh:mm a',
      containerClass: 'theme-default',
      showWeekNumbers: false,
    };
  }
}
