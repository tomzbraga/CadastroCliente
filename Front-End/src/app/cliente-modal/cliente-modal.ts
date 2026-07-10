import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../classes/cliente.model';

@Component({
  selector: 'app-cliente-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './cliente-modal.html',
  styleUrl: './cliente-modal.css',
})
export class ClienteModal implements OnChanges {
  @Input({ required: true }) cliente!: Cliente;

  @Output() fechar = new EventEmitter<void>();
  @Output() salvar = new EventEmitter<Cliente>();
  @Output() excluir = new EventEmitter<number>();

  form: FormGroup;

  private generoMap: Record<string, string> = {
    M: 'MASCULINO',
    F: 'FEMININO',
    O: 'OUTRO',
  };

  private generoMapInverso: Record<string, string> = {
    MASCULINO: 'M',
    FEMININO: 'F',
    OUTRO: 'O',
  };

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      rg: ['', Validators.required],
      endereco: ['', Validators.required],
      genero: ['', Validators.required],
      telefone: [''],
      email: ['', Validators.email],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cliente'] && this.cliente) {
      this.form.setValue({
        nome: this.cliente.nome,
        dataNascimento: this.cliente.dataNascimento,
        rg: this.cliente.rg,
        endereco: this.cliente.endereco,
        genero: this.generoMapInverso[this.cliente.genero] ?? '',
        telefone: this.cliente.telefone ?? '',
        email: this.cliente.email ?? '',
      });
    }
  }

  onSalvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const valores = this.form.value;

    const clienteAtualizado = new Cliente(
      this.cliente.id,
      valores.nome,
      valores.dataNascimento,
      valores.rg,
      valores.endereco,
      this.generoMap[valores.genero],
      valores.telefone,
      valores.email
    );

    this.salvar.emit(clienteAtualizado);
  }

  onExcluir(): void {
    this.excluir.emit(this.cliente.id);
  }

  onFechar(): void {
    this.fechar.emit();
  }
}