package com.cadastrocliente.cadastro_cliente.repository;

import org.springframework.stereotype.Repository;

import com.cadastrocliente.cadastro_cliente.model.Cliente;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

import java.util.List;

@Repository
@Transactional
public class ClienteRepository {

    @PersistenceContext
    private EntityManager entityManager;

    public void save(Cliente cliente) 
    {
        entityManager.persist(cliente);
    }

    public Cliente findByNome(String nome) 
    {
        return entityManager.createQuery("SELECT c FROM Cliente c WHERE c.nome = :nome", Cliente.class)
                        .setParameter("nome", nome)
                        .getSingleResult();
    }

    public Cliente findById(Long id) 
    {
        return entityManager.find(Cliente.class, id);
    }

    public void update(Cliente cliente) 
    {
        entityManager.merge(cliente);
    }

    public void delete(Cliente cliente) 
    {
        entityManager.remove(cliente);
    }

    public List<Cliente> listarClientes() 
    {
        return entityManager.createQuery("SELECT c FROM Cliente c", Cliente.class)
                            .getResultList();
    }
}
