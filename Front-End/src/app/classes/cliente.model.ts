export class Cliente {
    id:             number;
    nome:           string;
    dataNascimento: string;
    rg:             string;
    endereco:       string;
    genero:         string;
    telefone?:       string;
    email?:          string;

constructor(id: number, nome: string, dataNascimento: string, rg: string, endereco: string, genero: string,
            telefone?: string, email?: string) {
    this.id = id;
    this.nome = nome;
    this.dataNascimento = dataNascimento;
    this.rg = rg;
    this.endereco = endereco;
    this.genero = genero;
    this.telefone = telefone;
    this.email = email;
    }
}
