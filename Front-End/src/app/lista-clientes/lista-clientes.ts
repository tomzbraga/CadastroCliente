import { Component, OnInit, signal } from '@angular/core';
import { Cliente } from '../classes/cliente.model';
import { CommonModule } from '@angular/common';
import { Api } from '../services/api';

@Component({
  selector: 'app-lista-clientes',
  imports: [CommonModule],
  templateUrl: './lista-clientes.html',
  styleUrl: './lista-clientes.css',
})
export class ListaClientes implements OnInit {
  clientes = signal<Cliente[]>([]);

  constructor(private api: Api) {}

  ngOnInit(): void {
    this.carregarClientes();

    this.api.clientesAtualizados$.subscribe(() => {
      this.carregarClientes();
    });
  }

  private carregarClientes(): void {
    this.api.listarClientes().subscribe({
      next: (data) => {
        this.clientes.set(
          data.map((c) =>
            new Cliente(c.id, c.nome, c.dataNascimento, c.rg, c.endereco, c.genero, c.telefone, c.email)
          )
        );
      },
      error: (err) => console.error('Erro ao carregar clientes', err),
    });
  }
}