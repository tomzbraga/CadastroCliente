import { Component, OnInit, signal } from '@angular/core';
import { Cliente } from '../classes/cliente.model';
import { CommonModule } from '@angular/common';
import { Api } from '../services/api';
import { ClienteModal } from '../cliente-modal/cliente-modal';

@Component({
  selector: 'app-lista-clientes',
  imports: [CommonModule, ClienteModal],
  templateUrl: './lista-clientes.html',
  styleUrl: './lista-clientes.css',
})
export class ListaClientes implements OnInit {
  clientes = signal<Cliente[]>([]);
  clienteSelecionado = signal<Cliente | null>(null);

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

  abrirModal(cliente: Cliente): void {
    this.clienteSelecionado.set(cliente);
  }

  fecharModal(): void {
    this.clienteSelecionado.set(null);
  }

  onSalvar(clienteAtualizado: Cliente): void {
    this.api.editarCliente(clienteAtualizado.id, clienteAtualizado).subscribe({
      next: () => {
        this.fecharModal();
        this.carregarClientes();
      },
      error: (err) => console.error('Erro ao editar cliente', err),
    });
  }

  onExcluir(id: number): void {
    this.api.deletarCliente(id).subscribe({
      next: () => {
        this.fecharModal();
        this.carregarClientes();
      },
      error: (err) => console.error('Erro ao excluir cliente', err),
    });
  }
}