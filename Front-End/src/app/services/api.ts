import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Cliente } from '../classes/cliente.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private apiUrl = 'http://localhost:8080/clientes';
  private clientesAtualizadosSubject = new Subject<void>();
  readonly clientesAtualizados$ = this.clientesAtualizadosSubject.asObservable();

  constructor(private http: HttpClient) {}

  salvarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente).pipe(
      tap(() => this.clientesAtualizadosSubject.next())
    );
  }

  listarClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl).pipe(
      tap((data) => {
        console.log('Resposta da API na service:', data);
      })
    );
  }

  buscarPorId(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }

  buscarPorNome(nome: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/nome/${nome}`);
  }

  editarCliente(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/${id}`, cliente);
  }

  deletarCliente(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.apiUrl}/${id}`);
  }
}
