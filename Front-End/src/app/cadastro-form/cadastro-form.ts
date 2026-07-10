import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Api } from '../services/api';
import { Cliente } from '../classes/cliente.model';

@Component({
  selector: 'app-cadastro-form',
  imports: [ReactiveFormsModule],
  templateUrl: './cadastro-form.html',
  styleUrl: './cadastro-form.css',
})
export class CadastroForm {
  form: FormGroup;

  // mapeia as siglas do form (M/F/O) pro enum do backend
  private generoMap: Record<string, string> = {
    M: 'MASCULINO',
    F: 'FEMININO',
    O: 'OUTRO',
  };

  constructor(private fb: FormBuilder, private api: Api) {
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

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const valores = this.form.value;

    const cliente = new Cliente(
      0, // id ignorado pelo backend (é @GeneratedValue)
      valores.nome,
      valores.dataNascimento,
      valores.rg,
      valores.endereco,
      this.generoMap[valores.genero],
      valores.telefone,
      valores.email
    );

    this.api.salvarCliente(cliente).subscribe({
      next: (clienteSalvo) => {
        console.log('Cliente cadastrado com sucesso:', clienteSalvo);
        this.form.reset();
      },
      error: (err) => {
        console.error('Erro ao cadastrar cliente:', err);
      },
    });
  }
}