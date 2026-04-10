package com.cadastrocliente.cadastro_cliente.controller;

import com.cadastrocliente.cadastro_cliente.model.Cliente;
import com.cadastrocliente.cadastro_cliente.repository.ClienteRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clientes")
@CrossOrigin(origins = "http://localhost:4200")
public class ClienteController {

    private final ClienteRepository clienteRepository;

    public ClienteController(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    @PostMapping
    public void salvarCliente(@RequestBody Cliente cliente) {
        clienteRepository.save(cliente);
    }

    @PutMapping("/{id}")
    public void editarCliente(@PathVariable Long id, @RequestBody Cliente cliente) {
        cliente.setId(id);
        clienteRepository.update(cliente);
    }

    @DeleteMapping("/{id}")
    public void deletarCliente(@PathVariable Long id) {
        Cliente cliente = clienteRepository.findById(id);
        if (cliente != null) {
            clienteRepository.delete(cliente);
        }
    }

    @GetMapping("/{id}")
    public Cliente listarCliente(@PathVariable String nome) {
        return clienteRepository.findByNome(nome);
    }

    @GetMapping
    public List<Cliente> listarClientes() {
        return clienteRepository.listarClientes();
    }
}
