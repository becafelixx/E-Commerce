import { ItemCarrinho } from "./item-carrinho"


export type PedidoFinalizado ={
    codigo: number;
    cliente: string;
    email: string;
    quantidadeItens: number;
    total: number;
    itens: ItemCarrinho[];
}