import { Component } from '@angular/core';
import { Produto } from '../produto/produto';
import { signal } from '@angular/core';
import { computed } from '@angular/core';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { effect } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { produtosService } from '../../../core/services/produtos.service';
import { inject } from '@angular/core';
import { CarrinhoFacade } from '../../../core/facades/carrinho.facade';
import { ItemCarrinho } from '../../../core/models/item-carrinho';

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, PrecoFormatadoPipe,UpperCasePipe],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})

export class ListaProdutos {

  //!Lista com dados -Array de produtos com nome e preço
   produtos = signal<{nome: string; preco: number}[]>([]);

   carregando = signal(true);

   produtoSelecionado = signal<string | null>(null);

   erro = signal<string | null>(null);

  //!Função para exibir produtos selecionados pelo usuário no console
  exibirProduto(nome: string) {
    console.log('Produto Selecionado: ', nome);
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
   //? ============== MÉTODO HTTP CLIENT (API) =================
  carregarProdutos(){
   
    this.erro.set(null); //! Limpar o estado de erro antes de iniciar a requisição
    this.carregando.set(true); //! Ativar o sinal de carregando 
    this.produtosService.buscarProdutos().subscribe({
    next: (dados) => {
      const produtos =this.produtosService.transformarProdutos(dados);
      this.produtos.set(produtos);
      this.carregando.set(false);
    },
      error: (erro) => {
        console.error('Erro ao carregar produtos: ', erro);
        this.erro.set('Erro ao carregar produtos. Por favor, tente novamente!');
        this.carregando.set(false);
      }

    });
  }

  //! metodo para monitorar alterações em tempo real usando effect()
  constructor(){

    //! Carrega a API
      this.carregarProdutos();

      //! effect continuam iguais - não mexer
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
  ProdutoSelecionado = signal <string | null>(null);

  //! metodo para criar um estado para carrinho com signal 
  Carrinho = signal <{nome: string; preco: number}[]>([]);
  adicionarAoCarrinho(produto:ItemCarrinho){
    this.carrinhoFacade.adicionarProdutoCarrinho(produto);
  }

//** ========== INJECT ===========

private produtosService = inject(produtosService);
public carrinhoFacade = inject(CarrinhoFacade);

quantidadeCarrinho = this.carrinhoFacade.quantidadeCarrinho;
totalCarrinho = this.carrinhoFacade.totalCarrinho;
}