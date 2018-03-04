import { EnderecoDto } from "./endereco.dto";

export interface UsuarioDTO {
	id: string;
	nome: string;
	sobrenome: string;
	cpf: string;
	dataDeNascimento: string;
	genero: string;
	endereco: EnderecoDto;
	telefone1: string;
	telefone2: string;
	telefone3: string;
}