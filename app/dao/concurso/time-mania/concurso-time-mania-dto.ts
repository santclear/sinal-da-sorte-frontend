import {ConcursoDTO} from '../concurso-dto';
import {Times} from '../../../enum/times';

export class ConcursoTimeManiaDTO extends ConcursoDTO {
	private time: Times;

	public get $time(): Times {
		return this.time;
	}

	public set $time(value: Times) {
		this.time = value;
	}
}
