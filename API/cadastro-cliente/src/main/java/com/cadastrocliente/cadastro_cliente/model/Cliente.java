package com.cadastrocliente.cadastro_cliente.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.Column;




@Entity
@Table(name="clientes")

public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;   

    @Column(name = "nome")
    private String nome;
    
    @Column(name = "data_nascimento")
    private String dataNascimento;
    
    @Column(name = "rg")
    private String rg;
    
    @Column(name = "endereco")
    private String endereco;

    public enum Genero {
        MASCULINO,
        FEMININO,
        OUTRO
    }

    @Column(name = "genero")
    private Genero genero;
    
    @Column(name = "telefone")
    private String telefone;

    @Column(name = "email")
    private String email;


// Construtor

public Cliente () {

}

public Cliente(String nome, String dataNascimento, String rg, String endereco, int genero, String telefone, String email) {
    super();
    this.nome = nome;
    this.dataNascimento = dataNascimento;
    this.rg = rg;
    this.endereco = endereco;
    this.genero = Genero.values()[genero];
    this.telefone = telefone;
    this.email = email;
}


// ID ***************************************

public long getId() {
    return id;
}

public void setId(long id) {
    this.id = id;
}

// Nome ***************************************

public String getNome() {
    return nome;
}

public void setNome(String nome) {
    this.nome = nome;
}

// Data de Nascimento ***************************************

public String setDataNascimento() {
    return dataNascimento;
}

public void getDataNascimento(String dataNascimento) {
    this.dataNascimento = dataNascimento;
}

// RG ***************************************

public String getRg() {
    return rg;
}

public void setRg(String rg) {
    this.rg = rg;
}

// Endereço ***************************************

public String getEndereco() {
    return endereco;
}

public void setEndereco(String endereco) {
    this.endereco = endereco;
}

// Gênero ***************************************

public Genero getGenero() {
    return genero;
}

public void setGenero(int genero) {
    this.genero = Genero.values()[genero];
}

// Telefone ***************************************

public String getTelefone() {
    return telefone;
}

public void setTelefone(String telefone) {
    this.telefone = telefone;
}

// Email ***************************************

public String getEmail() {
    return email;
}

public void setEmail(String email) {
    this.email = email;
}

}