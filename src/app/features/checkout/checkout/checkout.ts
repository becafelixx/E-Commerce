import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CarrinhoFacade } from '../../../core/facades/carrinho.facade';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { PedidoFinalizado } from '../../../core/models/pedido-finalizado';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, PrecoFormatadoPipe, MatButtonModule, RouterLink],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})

export class Checkout {
  
  carrinhoFacade = inject(CarrinhoFacade);

  pedidoFinalizado = signal<PedidoFinalizado | null >(null);

  formulario = new FormGroup({
    nome: new FormControl('',[Validators.required, Validators.minLength(2), nomeSemNumeros]),
    email: new FormControl('',[Validators.required, Validators.email]),
    endereco: new FormControl('',[Validators.required, Validators.minLength(5)]),
  });

  finalizar(){

    this.pedidoFinalizado.set(null);

    if(this.carrinhoFacade.carrinhoVazio()){
      console.log('Não é possível finalizar a compra com o carrinho vazio!');
      return;
    }

    if(this.formulario.invalid){
      console.log('Formulário Invalido!');
      this.formulario.markAllAsTouched();
      return;
    }

    const dados = this.formulario.value
    const itens = this.carrinhoFacade.itensCarrinho();
    const total = this.carrinhoFacade.totalCarrinho();

    const pedido = {
      codigo:Date.now(),
      cliente: dados.nome ?? '',
      email: dados.email ?? '',
      quantidadeItens: itens.length,
      total,
      itens,
    }

    console.log('Compra finalizada com sucesso!')
    console.log('Dados do Formulário: ', dados);
    console.log('Dados do pedido: ', pedido);

    this.carrinhoFacade.limparCarrinho();
    this.formulario.reset();
    this.pedidoFinalizado.set(pedido);
  }
}
function nomeSemNumeros(controle: AbstractControl): ValidationErrors | null {
  const valor = controle.value;
  if(!valor) return null;
  if(/\d/.test(valor)){
    return {numeroInvalido:true};
  }
  return null;
}
