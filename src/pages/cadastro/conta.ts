import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CidadeService } from '../../services/cidade.service';
import { EstadoService } from '../../services/estado.service';
import { EstadoDTO } from '../../dtos/estado.dto';
import { CidadeDTO } from '../../dtos/cidade.dto';

@Component({
	selector: 'page-conta',
	templateUrl: 'conta.html',
})
export class ContaPage {

	formGroup: FormGroup;
	estados: EstadoDTO[];
	cidades: CidadeDTO[];

	constructor(
		public formBuilder: FormBuilder,
		public cidadeService: CidadeService,
		public estadoService: EstadoService) {

		this.formGroup = this.formBuilder.group({
			nome: ['Elon', [Validators.required, Validators.minLength(3), Validators.maxLength(130)]],
			sobrenome: ['Musk', [Validators.required, Validators.minLength(3), Validators.maxLength(130)]],
			email: ['elon@gmail.com', [Validators.required, Validators.email]],
			generoId: [1, [Validators.required]],
			dataDeNascimento: ['1', [Validators.required, Validators.pattern('dd/dd/dddd')]],
			cpf: ['06134596280', [Validators.required, Validators.pattern('ddd.ddd.ddd-ddd')]],
			senha: ['123', [Validators.required]],
			logradouro: ['Rua Via', [Validators.required]],
			numero: ['25', [Validators.required]],
			complemento: ['Apto 3', []],
			bairro: ['Copacabana', [Validators.required]],
			cep: ['10828333', [Validators.required, Validators.pattern('ddddd-ddd')]],
			telefone1: ['977261827', [Validators.required]],
			telefone2: ['', [Validators.minLength(11), Validators.maxLength(30)]],
			telefone3: ['', [Validators.minLength(11), Validators.maxLength(30)]],
			estadoId: [null, [Validators.required]],
			cidadeId: [null, [Validators.required]]
		});
	}

	ionViewDidLoad() {
		this.estadoService.findAll()
			.subscribe(response => {
				this.estados = response;
				this.formGroup.controls.estadoId.setValue(this.estados[0].id);
				this.updateCidades();
			},
				error => { });
	}

	updateCidades() {
		let estado_id = this.formGroup.value.estadoId;
		this.cidadeService.findAll(estado_id)
			.subscribe(response => {
				this.cidades = response;
				this.formGroup.controls.cidadeId.setValue(null);
			},
				error => { });
	}

	cadastre() {
		console.log("enviou o form");
	}
}
