import { ContaNewDto } from './conta-new.dto'

export interface ContaDto extends ContaNewDto {
	novaSenha: string;
}