import { Component } from '@angular/core';
import { Produto } from '../produto/produto';
import { signal } from '@angular/core';
import { computed } from '@angular/core';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { effect } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, PrecoFormatadoPipe,UpperCasePipe],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
  //!Lista com dados 
  produtos = signal ([
    { nome: 'Teclado Gamer', preco: 99.99 },
    { nome: 'Mouse', preco: 69.99 },
    { nome: 'Monitor', preco: 249.99 },
    { nome: 'Headset', preco: 79.99 }
  ]);
  //!Função para exibir produtos selecionados pelo usuário no console
  exibirProduto(nome: string) {
    console.log('Produto selecionado:', nome);
    this.produtoSelecionado.set(nome);
  }
  //! função que adiciona produto usando método update()
  adicionarProduto() {
    this.produtos.update(listaAtual => [
      ...listaAtual,
      { nome: 'Playstation 5', preco:3000 },
    ]);
  }
  //!função que contabiliza a quantidade de produtos na lista com metodo computed()
  totalProdutos = computed(() => this.produtos().length);
  //função que calcula o valor total dos produtos usando método computed()
  
  valorTotal = computed(() => 
    {return this.produtos().reduce((total, produto) =>
     total + produto.preco, 0);
  });
  //função para substitui a lista atual usando o metodo ser()
  substituirProdutos(){
    this.produtos.set([
      {nome:'Mouse', preco: 35},
      {nome:'Monitor', preco: 500},
      {nome:'Desktop', preco: 1500},
      {nome:'Headset', preco: 40},
      {nome:'Teclado', preco: 50},
    ]);
  }
  //! metodo para monitorar alterações em tempo real usando effect()
  constructor(){
    effect(() => {
      console.log('Lista de Produtos Alterados: ', this.produtos());
    });
    effect(() => {
      console.log('Valor Total Atualizado: ', this.valorTotal());
    });
    effect(() => {
      if (typeof document!== 'undefined'){
        document.title = `(${this.totalProdutos()}) - Loja da Félix`;
      }
    });
  }
  //! metodo para criar um estado de seleção com signal string | null
  produtoSelecionado = signal <string | null>(null);
}