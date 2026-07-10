import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject, of } from 'rxjs';

import { ListaClientes } from './lista-clientes';
import { Api } from '../services/api';
import { Cliente } from '../classes/cliente.model';

describe('ListaClientes', () => {
  let component: ListaClientes;
  let fixture: ComponentFixture<ListaClientes>;
  let clientesAtualizadosSubject: Subject<void>;
  let apiMock: jasmine.SpyObj<Api>;

  beforeEach(async () => {
    clientesAtualizadosSubject = new Subject<void>();
    apiMock = jasmine.createSpyObj<Api>('Api', ['listarClientes'], { clientesAtualizados$: clientesAtualizadosSubject.asObservable() });
    apiMock.listarClientes.and.returnValue(of([new Cliente(1, 'Ana', '2000-01-01', '1234', 'Rua A', 'FEMININO')]));

    await TestBed.configureTestingModule({
      imports: [ListaClientes],
      providers: [{ provide: Api, useValue: apiMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaClientes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reload the client list when the api emits a refresh event', () => {
    apiMock.listarClientes.and.returnValue(of([new Cliente(2, 'Bia', '1999-05-05', '5678', 'Rua B', 'MASCULINO')]));

    clientesAtualizadosSubject.next();

    expect(apiMock.listarClientes).toHaveBeenCalledTimes(2);
    expect(component.clientes().length).toBe(1);
    expect(component.clientes()[0].nome).toBe('Bia');
  });
});
