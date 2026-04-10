export class Cliente {
    id:             number;
    nome:           string;
    dataNascimento: string;
    rg:             string;
    endereco:       string;
    genero:         string;
    telefone?:      string;
    email?:         string;

constructor(id: number, nome: string, dataNascimento: string, rg: string, endereco: string, genero: string,
            telefone?: string, email?: string) 
    {
        
    this.id             = id;
    this.nome           = nome;
    this.dataNascimento = dataNascimento;
    this.rg             = rg;
    this.endereco       = endereco;
    this.genero         = genero;
    this.telefone       = telefone;
    this.email          = email;
    
    }

    getIdade(): number 
    {
    
        const hoje = new Date();
        const nascimento = new Date(this.dataNascimento);
    
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const mes = hoje.getMonth() - nascimento.getMonth();
        
        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) 
        {
            idade--;
        }
    
      return idade;
 
    }
}
