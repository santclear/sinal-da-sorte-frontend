import {VolanteDTO} from '../volante-dto';
import {Times} from '../../../enum/times';

export class ConcursoTimeManiaDTO extends VolanteDTO {
	private time: Times;

	public get $time(): Times {
		return this.time;
	}

	public set $time(value: Times) {
		this.time = value;
	}
}