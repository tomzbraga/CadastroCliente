import { Component, OnInit } from '@angular/core';
import { Cliente } from '../classes/cliente.model'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-clientes',
  imports: [CommonModule],
  templateUrl: './lista-clientes.html',
  styleUrl: './lista-clientes.css',
})
export class ListaClientes implements OnInit {

  clientes?: Cliente[];

  constructor() {}

  ngOnInit(): void {}

}
