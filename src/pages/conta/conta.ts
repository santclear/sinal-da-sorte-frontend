import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, NavController, ToastController } from 'ionic-angular';
import { ContaService } from '../../services/conta.service';
import { EnderecoService } from '../../services/endereco.service';
import { EstadoDTO } from '../../dtos/estado.dto';
import { CidadeDTO } from '../../dtos/cidade.dto';
import { ContaNewDto } from '../../dtos/conta-new.dto';
import { UsuarioDto } from '../../dtos/usuario.dto';
import { EnderecoDto } from '../../dtos/endereco.dto';

import { compararCamposValidator } from '../../validators/comparar-campos.validator';
import { cpfValidator } from '../../validators/cpf.validator';
import { SelectItem } from 'primeng/components/common/selectitem';

@Component({
	selector: 'page-conta',
	templateUrl: 'conta.html',
})
export class ContaPage {   

	contaForm: FormGroup;
	estados: EstadoDTO[];
	cidades: CidadeDTO[];
	generos: SelectItem[];
	ptBr: any;
	isNotUpdateContaForm: boolean = true;

	constructor(
		private navCtrl: NavController,
		private formBuilder: FormBuilder,
		private contaService: ContaService,
		private enderecoService: EnderecoService,
		private alertCtrl: AlertController,
		private toastCtrl: ToastController) {

		this.contaForm = this.formBuilder.group({
			nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
			sobrenome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
			cpf: ['', [Validators.required, cpfValidator()]],
			dataDeNascimento: [null, [Validators.required]],
			generoId: [null, [Validators.required]],
			email: ['', [Validators.required, Validators.email]],
			senha: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
			confirmeSenha: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100), compararCamposValidator('senha')]],
			cep: ['', [Validators.required, Validators.minLength(8)]],
			logradouro: ['', [Validators.required]],
			numero: ['', [Validators.required, Validators.maxLength(6)]],
			complemento: ['', [Validators.maxLength(100)]],
			bairro: ['', [Validators.required]],
			cidade: ['', [Validators.required]],
			uf: ['', [Validators.required]],
			telefone1: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(16), Validators.pattern('\\d+')]],
			telefone2: ['', [Validators.minLength(10), Validators.maxLength(16), Validators.pattern('\\d+')]],
			telefone3: ['', [Validators.minLength(10), Validators.maxLength(16), Validators.pattern('\\d+')]]
		});

        this.generos = [
            { label: 'Homem', value: '1' },
            { label: 'Mulher', value: '2' },
            { label: 'Outro', value: '3' },
		];
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

	cadastre() {
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
			id:null,
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

		let conta: ContaNewDto = {
			id:null,
			email:this.contaForm.value.email,
			senha:this.contaForm.value.senha,
			usuario
		};

		this.contaService.insert(conta)
			.subscribe(response => {
				this.showInsertOk(conta.email);
			}, error => { });
	}

	showInsertOk(email: string) {
		let alert = this.alertCtrl.create({
			title: 'Sucesso!',
			message: 'Cadastro efetuado com sucesso.\nSiga as instruções enviadas para o e-mail: '+ email,
			enableBackdropDismiss: false,
			buttons: [{
				text: 'Ok',
				handler: () => { this.navCtrl.pop(); }
			}]
		});
		alert.present();
	}

	populeEnderecos(event) {
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

	populeForm() {
		
	}
}
