import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, NavController, ToastController } from 'ionic-angular';
import { ContaService } from '../../services/conta.service';
import { EnderecoService } from '../../services/endereco.service';
import { ContaDto } from '../../dtos/conta.dto';
import { UsuarioDto } from '../../dtos/usuario.dto';
import { EnderecoDto } from '../../dtos/endereco.dto';
import { ContaLocalDTO } from '../../dtos/conta-local.dto';

import { cpfValidator } from '../../validators/cpf.validator';
import { SelectItem } from 'primeng/components/common/selectitem';
import { StorageService } from '../../services/storage.service';
import { UsuarioService } from '../../services/usuario.service';

import { compararCamposValidator } from '../../validators/comparar-campos.validator';
import { emailOrEmptyValidator } from '../../validators/email.validator';
import { LoginPage } from '../login/login';
import { PaginaBase } from '../pagina.base';

@Component({
	selector: 'page-atualizacao-conta',
	templateUrl: 'atualizacao-conta.html',
})
export class AtualizacaoContaPage extends PaginaBase {   

	contaForm: FormGroup;
	generos: SelectItem[];
	ptBr: any;

	constructor(
		protected navCtrl: NavController,
		public formBuilder: FormBuilder,
		private contaService: ContaService,
		private usuarioService: UsuarioService,
		private enderecoService: EnderecoService,
		private alertCtrl: AlertController,
		private toastCtrl: ToastController,
		private storage: StorageService) {
		super();
		this.pbNav = navCtrl;
		this.pbStorage = storage;
		this.setTitulo("Atualização de conta");
		
		this.instancieContaForm();

		let contaLocal: ContaLocalDTO = this.storage.getContaLocal();
		if(contaLocal) {
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
		if (this.contaForm.controls['cep'].valid) {
			this.enderecoService.findByCep(this.contaForm.value.cep).subscribe(response => {
				this.contaForm.controls['cep'].setValue(response.cep);
				this.contaForm.controls['logradouro'].setValue(response.logradouro);
				this.contaForm.controls['bairro'].setValue(response.bairro);
				this.contaForm.controls['cidade'].setValue(response.cidade);
				this.contaForm.controls['uf'].setValue(response.uf);

				let endereco: EnderecoDto = {
					cep: response.cep,
					logradouro: response.logradouro,
					numero: this.contaForm.value.numero,
					complemento: this.contaForm.value.complemento,
					bairro: response.bairro,
					cidade: response.cidade,
					uf: response.uf
				}

				let date = this.contaForm.value.dataDeNascimento;
				let mes = date.getMonth() + 1;
				let dataDeNascimento = date.getFullYear() + '-' + mes + '-' + date.getDate();

				let usuario: UsuarioDto = {
					id: this.contaForm.value.id,
					nome: this.contaForm.value.nome,
					sobrenome: this.contaForm.value.sobrenome,
					cpf: this.contaForm.value.cpf,
					dataDeNascimento: dataDeNascimento,
					genero: this.contaForm.value.generoId,
					endereco: endereco,
					telefone1: this.contaForm.value.telefone1,
					telefone2: this.contaForm.value.telefone2,
					telefone3: this.contaForm.value.telefone3
				}

				let conta: ContaDto = {
					id: this.contaForm.value.id,
					email: this.contaForm.value.novoEmail===''?this.contaForm.value.email:this.contaForm.value.novoEmail,
					senha: this.contaForm.value.senha,
					novaSenha: this.contaForm.value.novaSenha,
					usuario
				};

				this.contaService.atualize(conta).subscribe(response => {
					this.showInsertOk(conta);
				}, error => { });
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

	showInsertOk(conta) {
		if (this.storage.getContaLocal().email !== conta.email && conta.novaSenha !== '') {
			let alert = this.alertCtrl.create({
				title: 'E-mail atualizado',
				message: `Para concluir a atualização do seu e-mail siga as instruções enviadas para ` + conta.email,
				enableBackdropDismiss: false,
				buttons: [{
					text: 'Ok',
					handler: () => {
						let alertSenha = this.alertCtrl.create({
							title: 'Senha atualizada',
							message: 'Sua senha foi atualizada com sucesso!',
							enableBackdropDismiss: false,
							buttons: [{
								text: 'Ok'
							}]
						});
						alertSenha.present();
					}
				}]
			});
			alert.present();
			this.storage.setContaLocal(null);
			this.navCtrl.setRoot(LoginPage);
		} else if (this.storage.getContaLocal().email !== conta.email && conta.novaSenha === '') {
			let alert = this.alertCtrl.create({
				title: '',
				message: 'Para concluir a atualização do seu e-mail siga as instruções enviadas para ' + conta.email,
				enableBackdropDismiss: false,
				buttons: [{
					text: 'Ok'
				}]
			});
			alert.present();
			this.storage.setContaLocal(null);
			this.navCtrl.setRoot(LoginPage);
		} else if(this.storage.getContaLocal().email === conta.email && conta.novaSenha !== '') {
			let alert = this.alertCtrl.create({
				title: 'Senha atualizada',
				message: 'Sua senha foi atualizada com sucesso!',
				enableBackdropDismiss: false,
				buttons: [{
					text: 'Ok'
				}]
			});
			alert.present();
			this.storage.setContaLocal(null);
			this.navCtrl.setRoot(LoginPage);
		} else {
			let alert = this.alertCtrl.create({
				title: 'Sucesso!',
				message: 'Atualização efetuado com sucesso.',
				enableBackdropDismiss: false,
				buttons: [{
					text: 'Ok',
				}]
			});
			alert.present();
			this.contaForm.controls['id'].setValue(conta.usuario.id);
			this.contaForm.controls['nome'].setValue(conta.usuario.nome);
			this.contaForm.controls['sobrenome'].setValue(conta.usuario.sobrenome);
			this.contaForm.controls['cpf'].setValue(conta.usuario.cpf);
			this.contaForm.controls['dataDeNascimento'].setValue(new Date(conta.usuario.dataDeNascimento));
			this.contaForm.controls['generoId'].setValue(conta.usuario.genero);
			this.contaForm.controls['cep'].setValue(conta.usuario.endereco.cep);
			this.contaForm.controls['logradouro'].setValue(conta.usuario.endereco.logradouro);
			this.contaForm.controls['numero'].setValue(conta.usuario.endereco.numero);
			this.contaForm.controls['complemento'].setValue(conta.usuario.endereco.complemento);
			this.contaForm.controls['bairro'].setValue(conta.usuario.endereco.bairro);
			this.contaForm.controls['cidade'].setValue(conta.usuario.endereco.cidade);
			this.contaForm.controls['uf'].setValue(conta.usuario.endereco.uf);
			this.contaForm.controls['telefone1'].setValue(conta.usuario.telefone1);
			this.contaForm.controls['telefone2'].setValue(conta.usuario.telefone2);
			this.contaForm.controls['telefone3'].setValue(conta.usuario.telefone3);
		}
	}

	populeEnderecos(event: any) {
		if(this.contaForm.controls['cep'].valid) {
			this.enderecoService.findByCep(event.srcElement.value).subscribe(response => {
				this.contaForm.controls['cep'].setValue(response.cep);
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
			nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
			sobrenome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
			cpf: ['', [Validators.required, cpfValidator()]],
			dataDeNascimento: [new Date('1990-1-1'), [Validators.required]],
			generoId: [null, [Validators.required]],
			email: ['', [Validators.required, Validators.email]],
			novoEmail: ['', [emailOrEmptyValidator]],
			confirmeEmail: ['', [compararCamposValidator('novoEmail')]],
			senha: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
			novaSenha: ['', [Validators.minLength(8), Validators.maxLength(100)]],
			confirmeSenha: ['', [compararCamposValidator('novaSenha')]],
			cep: ['', [Validators.required, Validators.minLength(8)]],
			logradouro: ['', []],
			numero: ['', [Validators.maxLength(6), Validators.pattern('\\d+')]],
			complemento: ['', [Validators.maxLength(100)]],
			bairro: ['', []],
			cidade: ['', [Validators.required]],
			uf: ['', [Validators.required]],
			telefone1: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(16), Validators.pattern('\\d+')]],
			telefone2: ['', [Validators.minLength(10), Validators.maxLength(16), Validators.pattern('\\d+')]],
			telefone3: ['', [Validators.minLength(10), Validators.maxLength(16), Validators.pattern('\\d+')]],
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
				this.contaForm.controls['telefone1'].setValue(usuario.telefones.telefone1);
				this.contaForm.controls['telefone2'].setValue(usuario.telefones.telefone2);
				this.contaForm.controls['telefone3'].setValue(usuario.telefones.telefone3);
			});
		});
	}
}
