import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss'],
})
export class EventoDetalheComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({});

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.validation();
  }

  get f(): any{
    return this.form.controls;
  }

  public validation(): void {
    this.form = this.formBuilder.group({
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

  public resetForm(): void{
    this.form.reset();
  }
}
