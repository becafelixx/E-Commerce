import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CarrinhoFacade } from '../../../core/facades/carrinho.facade';
import { AuthFacade } from '../../../core/facades/auth.facade';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';

@Component({
  selector: 'app-carrinho',
  imports: [RouterLink, MatButtonModule, PrecoFormatadoPipe],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.css',
})
export class Carrinho {

  private router = inject(Router);
  public carrinhoFacade = inject(CarrinhoFacade);
  private authFacade = inject(AuthFacade)

  removerItem(rmvItem:number){
    this.carrinhoFacade.removerItem(rmvItem);
  }

  limparCarrinho(){
    this.carrinhoFacade.limparCarrinho();
  }

  cancelarCompra(){
    this.carrinhoFacade.limparCarrinho();
    this.authFacade.sair();
    this.router.navigateByUrl('/login');
  }
}
