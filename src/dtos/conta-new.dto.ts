import { UsuarioDto } from './usuario.dto';

export interface ContaNewDto {
	id: string;
	email: string;
	senha: string;
	usuario: UsuarioDto;
}