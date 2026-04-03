package com.cadastrocliente.cadastro_cliente.controller;

import com.cadastrocliente.cadastro_cliente.model.Cliente;
import com.cadastrocliente.cadastro_cliente.repository.ClienteRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    private final ClienteRepository clienteRepository;

    public ClienteController(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    @PostMapping
    public void salvarCliente(@RequestBody Cliente cliente) {
        clienteRepository.save(cliente);
    }

    @PostMapping
    public void editarCliente(@RequestBody Cliente cliente) {
        clienteRepository.update(cliente);
    }

    @PostMapping 
    public void deletarCliente(@RequestBody Cliente cliente) {
        clienteRepository.delete(cliente);
    }

    @GetMapping("/nome/{nome}")
    public Cliente listarCliente(@PathVariable String nome) {
        return clienteRepository.findByNome(nome);
    }

    @GetMapping
    public List<Cliente> listarClientes() {
        return clienteRepository.listarClientes();
    }
}
