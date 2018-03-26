import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, NavController, ToastController } from 'ionic-angular';
import { ContaService } from '../../services/conta.service';
import { EnderecoService } from '../../services/endereco.service';
import { EstadoDTO } from '../../dtos/estado.dto';
import { CidadeDTO } from '../../dtos/cidade.dto';
import { ContaDto } from '../../dtos/conta.dto';
import { UsuarioDto } from '../../dtos/usuario.dto';
import { EnderecoDto } from '../../dtos/endereco.dto';
import { ContaLocalDTO } from '../../dtos/conta-local.dto';

import { cpfValidator } from '../../validators/cpf.validator';
import { SelectItem } from 'primeng/components/common/selectitem';
import { StorageService } from '../../services/storage.service';
import { UsuarioService } from '../../services/usuario.service';

import lodash from 'lodash';
import { compararCamposValidator } from '../../validators/comparar-campos.validator';

@Component({
	selector: 'page-atualizacao-conta',
	templateUrl: 'atualizacao-conta.html',
})
export class AtualizacaoContaPage {   

	contaForm: FormGroup;
	estados: EstadoDTO[];
	cidades: CidadeDTO[];
	generos: SelectItem[];
	ptBr: any;

	constructor(
		private navCtrl: NavController,
		public formBuilder: FormBuilder,
		private contaService: ContaService,
		private usuarioService: UsuarioService,
		private enderecoService: EnderecoService,
		private alertCtrl: AlertController,
		private toastCtrl: ToastController,
		private storage: StorageService) {
		
		
		this.instancieContaForm();

		let contaLocal: ContaLocalDTO = this.storage.getContaLocal();
		if(contaLocal) {
			// this.contaService.encontrePorEmail(contaLocal.email).subscribe(conta => {
				
			// });
			this.populeContaForm(contaLocal.email);
		}
	}

	ngOnInit() {
        this.ptBr = {
            firstDayOfWeek: 0,
            dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
            dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
            dayNamesMin: ["Do","Se","Te","Qa","Qi","Se","Sá"],
            monthNames: [ "Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro" ],
            monthNamesShort: [ "Jan", "Fev", "Mar", "Abr", "Mai", "Jun","Jul", "Ago", "Set", "Out", "Nov", "Dez" ],
            today: 'Hoje',
            clear: 'Limpar'
		};
    }

	atualize() {
		let endereco: EnderecoDto = {
			cep:this.contaForm.value.cep,
			logradouro:this.contaForm.value.logradouro,
			numero: this.contaForm.value.numero,
			complemento:this.contaForm.value.complemento,
			bairro:this.contaForm.value.bairro,
			cidade:this.contaForm.value.cidade,
			uf:this.contaForm.value.uf
		}

		let date = this.contaForm.value.dataDeNascimento;
		let mes = date.getMonth() + 1;
		let dataDeNascimento = date.getFullYear() +'-'+ mes +'-'+ date.getDate();

		let usuario: UsuarioDto = {
			id:this.contaForm.value.id,
			nome:this.contaForm.value.nome,
			sobrenome:this.contaForm.value.sobrenome,
			cpf:this.contaForm.value.cpf,
			dataDeNascimento: dataDeNascimento,
			genero:this.contaForm.value.generoId,
			endereco: endereco,
			telefone1:this.contaForm.value.telefone1,
			telefone2:this.contaForm.value.telefone2,
			telefone3:this.contaForm.value.telefone3
		}

		let conta: ContaDto = {
			id:this.contaForm.value.id,
			email:this.contaForm.value.email,
			senha:this.contaForm.value.senha,
			novaSenha:this.contaForm.value.novaSenha,
			usuario
		};

		this.contaService.atualize(conta)
			.subscribe(response => {
				this.showInsertOk();
			}, error => { });
	}

	showInsertOk() {
		let alert = this.alertCtrl.create({
			title: 'Sucesso!',
			message: 'Atualização efetuado com sucesso.',
			enableBackdropDismiss: false,
			buttons: [{
				text: 'Ok',
				handler: () => { this.navCtrl.pop(); }
			}]
		});
		alert.present();
	}

	populeEnderecos(event: any) {
		if(this.contaForm.controls['cep'].valid) {
			this.enderecoService.findByCep(event.srcElement.value).subscribe(response => {
				this.contaForm.controls['logradouro'].setValue(response.logradouro);
				this.contaForm.controls['bairro'].setValue(response.bairro);
				this.contaForm.controls['cidade'].setValue(response.cidade);
				this.contaForm.controls['uf'].setValue(response.uf);
			}, erro => {
				this.contaForm.controls['cep'].setValue('');
				this.contaForm.controls['logradouro'].setValue('');
				this.contaForm.controls['bairro'].setValue('');
				this.contaForm.controls['cidade'].setValue('');
				this.contaForm.controls['uf'].setValue('');

				let toast = this.toastCtrl.create({
					message: erro.message,
					showCloseButton: true,
					closeButtonText: 'Ok',
					duration: 5000,
					position: 'top',
					cssClass: 'toastGeral'
				});
				toast.present();

			});
		}
	}

	instancieContaForm() {
		this.contaForm = this.formBuilder.group({
			id: ['', []],
			nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(130)]],
			sobrenome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(130)]],
			cpf: ['', [Validators.required, cpfValidator()]],
			dataDeNascimento: [null, [Validators.required]],
			generoId: [null, [Validators.required]],
			email: ['', [Validators.required, Validators.email]],
			senha: ['', [Validators.required, Validators.minLength(8)]],
			novaSenha: ['', [Validators.minLength(8)]],
			confirmeSenha: ['', [Validators.minLength(8), compararCamposValidator('novaSenha')]],
			cep: ['', [Validators.required, Validators.minLength(8)]],
			logradouro: ['', [Validators.required]],
			numero: ['', [Validators.required, Validators.pattern('\\d+')]],
			complemento: ['', []],
			bairro: ['', [Validators.required]],
			cidade: ['', [Validators.required]],
			uf: ['', [Validators.required]],
			telefone1: ['', [Validators.required, Validators.minLength(10), Validators.pattern('\\d+')]],
			telefone2: ['', [Validators.minLength(10), Validators.pattern('\\d+')]],
			telefone3: ['', [Validators.minLength(10), Validators.pattern('\\d+')]],
		});

        this.generos = [
            { label: 'Homem', value: '1' },
            { label: 'Mulher', value: '2' },
            { label: 'Outro', value: '3' },
		];
	}

	populeContaForm(email: string) {
		this.contaService.encontrePorEmail(email).subscribe(conta => {
			this.contaForm.controls['email'].setValue(conta.email);
			this.usuarioService.encontrePorEmail(email).subscribe(usuario => {
				this.contaForm.controls['id'].setValue(usuario.id);
				this.contaForm.controls['nome'].setValue(usuario.nome);
				this.contaForm.controls['sobrenome'].setValue(usuario.sobrenome);
				this.contaForm.controls['cpf'].setValue(usuario.cpf);
				this.contaForm.controls['dataDeNascimento'].setValue(new Date(usuario.dataDeNascimento+'T00:00:00-03:00'));
				this.contaForm.controls['generoId'].setValue(usuario.genero);
				this.contaForm.controls['cep'].setValue(usuario.logradouro.cep);
				this.contaForm.controls['logradouro'].setValue(usuario.logradouro.nome);
				this.contaForm.controls['numero'].setValue(usuario.numero);
				this.contaForm.controls['complemento'].setValue(usuario.complemento);
				this.contaForm.controls['bairro'].setValue(usuario.logradouro.bairro.nome);
				this.contaForm.controls['cidade'].setValue(usuario.logradouro.bairro.cidade.nome);
				this.contaForm.controls['uf'].setValue(usuario.logradouro.bairro.cidade.uf.nome);
				this.setTelefone('telefone1',usuario);
				this.setTelefone('telefone2',usuario);
				this.setTelefone('telefone3',usuario);
			});
		});
	}

	private setTelefone(codigo:string,usuario:any) {
		let telefone = lodash.find(usuario.telefones, function (telefone) {
			let regex = new RegExp(codigo, "g");
			let match = regex.exec(telefone);
			return match !== null;
		});
		if(telefone) this.contaForm.controls[codigo].setValue(telefone.substring(9));
	}
}
