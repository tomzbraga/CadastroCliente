import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CadastroForm } from './cadastro-form/cadastro-form';
import { ListaClientes } from './lista-clientes/lista-clientes';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CadastroForm, ListaClientes],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('CadastroCliente');
}
