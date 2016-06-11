import {ConcursoDTO} from '../concurso-dto';
import {Time} from '../../enum/time';

export class ConcursoTimeManiaDTO extends ConcursoDTO {
	private time: Time;
	
    constructor() {
		super();
	}
	
	public get $time(): Time {
		return this.time;
	}

	public set $time(value: Time) {
		this.time = value;
	}  
}
