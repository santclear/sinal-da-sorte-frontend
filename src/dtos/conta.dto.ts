import { UsuarioDTO } from './usuario.dto';

export interface ContaDTO {
	id: string;
	email: string;
	senha: string;
	usuario: UsuarioDTO;
}