import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Pessoa } from 'src/app/Pessoa';
import { PessoasService } from 'src/app/pessoas.service';

@Component({
  selector: 'app-pessoas-component',
  templateUrl: './pessoas-component.component.html',
  styleUrls: ['./pessoas-component.component.css']
})

export class PessoasComponentComponent implements OnInit {

  formulario!: FormGroup;
  tituloFormulario: string = 'Nova Pessoa | By Raf Hassegawa';
  pessoas!: Pessoa[];
  nomePessoa!: string;
  pessoaId!: number;

  visibilidadeTabela: boolean = true;
  visibilidadeFormulario: boolean = false;

  modalRef!: BsModalRef;

  constructor(private formBuilder: FormBuilder, private pessoasService: PessoasService,
    private modalService: BsModalService) {}
  
  ngOnInit(): void {
    this.pessoasService.PegarTodos().subscribe(resultado => {
      this.pessoas = resultado;
    });
    
    this.formulario = new FormGroup({
      nome : new FormControl(null),
      sobrenome : new FormControl(null),
      idade : new FormControl(null),
      profissao : new FormControl(null)
    });
  }

  // Exibir formulário de cadastro
  ExibirFormularioCadastro(): void {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;
    
    this.formulario = new FormGroup({
      nome : new FormControl(null),
      sobrenome : new FormControl(null),
      idade : new FormControl(null),
      profissao : new FormControl(null)
    });    
  }

  // Atualizar
  ExibirFormularioAtualizacao(pessoaId : number): void{
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;

    this.pessoasService.PegarPeloI(pessoaId).subscribe(resultado =>{
      this.tituloFormulario = `Atualizar ${resultado.nome} ${resultado.sobrenome}`;

      this.formulario = new FormGroup({
        pessoaId: new FormControl(resultado.pessoaId),
        nome: new FormControl(resultado.nome),
        sobrenome: new FormControl(resultado.sobrenome),
        idade: new FormControl(resultado.idade),
        profissao: new FormControl(resultado.profissao)
      });
    });
  }

  // Salvar
  EnviarFormulario(): void {
    console.log('Formulario:', this.formulario.value);
    const pessoa: Pessoa = this.formulario.value;

    if (pessoa.pessoaId > 0) {
      this.pessoasService.AtualizarPessoa(pessoa).subscribe(resultado => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;
        console.log('Resultado:', resultado);
        alert('Pessoa atualizada com sucesso!');
        this.pessoasService.PegarTodos().subscribe(registros => {
          this.pessoas = registros;
        });
        this.formulario.reset(); // Reset the form
      }, error => {
        console.error('Erro ao atualizar pessoa:', error);
        alert('Erro ao atualizar pessoa');
      });
    } else {
      this.pessoasService.SalvarPessoa(pessoa).subscribe(resultado => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;
        console.log('Resultado:', resultado);
        alert('Pessoa inserida com sucesso!');
        this.pessoasService.PegarTodos().subscribe(registros => {
          this.pessoas = registros;
        });
        this.formulario.reset(); // Reset the form
      }, error => {
        console.error('Erro ao salvar pessoa:', error);
        alert('Erro ao salvar pessoa');
      });
    }
  }    

  // Voltar
  Voltar(): void {
    this.visibilidadeTabela = true;
    this.visibilidadeFormulario = false;
  }

  // Excluir
  ExcluirPessoa(pessoaId : number): void{
    this.pessoasService.ExcluirPessoa(pessoaId).subscribe(resultado =>{
      alert('Pessoa excluída com sucesso!');
      this.pessoasService.PegarTodos().subscribe(registros => {
        this.pessoas = registros;
      });
    });
  }
}
