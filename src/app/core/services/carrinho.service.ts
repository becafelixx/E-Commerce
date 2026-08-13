import { Injectable } from "@angular/core";
import { signal } from "@angular/core";
import { computed } from "@angular/core";

type ItemCarrinho = {
    nome: string;
    preco: number;
}
@Injectable ({
    providedIn:'root'
})

export class CarrinhoService {

    //! Estado Global - Criado com Sucesso
    private carrinho = signal <ItemCarrinho[]>([]);

    //? Seleção
    itens = computed (()=> this.carrinho());
    quantidadeItens = computed (()=> this.carrinho().length); 
    totalItens = computed (()=> this.carrinho().reduce((total, item) => total + item.preco,0));
    carrinhoVazio = computed(() => this.carrinho().length === 0);

// TODO: Ação Adicionar Produtos
adicionar(produto:ItemCarrinho){
    this.carrinho.update(lista => [...lista, produto]);
}
// TODO: Ação de Limpeza
limpar() {
    this.carrinho.set([]);
}
}