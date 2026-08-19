import { Injectable, inject } from "@angular/core";
import { CarrinhoService } from "../services/carrinho.service";

type ItemCarrinho = {
    nome: string;
    preco: number;
}

@Injectable({providedIn: 'root'})

export class CarrinhoFacade {

    private carrinhoService = inject(CarrinhoService);

    itensCarrinho = this.carrinhoService.itens;
    quantidadeCarrinho = this.carrinhoService.quantidadeItens;
    totalCarrinho = this.carrinhoService.totalItens;
    carrinhoVazio = this.carrinhoService.carrinhoVazio;

    adicionarProdutoCarrinho(produto:ItemCarrinho){
        this.carrinhoService.adicionar(produto);
    }

    limparCarrinho(){
        this.carrinhoService.limpar();
    }
    }
