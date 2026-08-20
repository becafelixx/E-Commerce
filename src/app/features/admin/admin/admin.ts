import { Component, computed, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade } from '../../../core/facades/auth.facade';

@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {

  private router = inject(Router);
  private authFacade = inject(AuthFacade);

totalProdutosCadastrados = signal(20);
pedidosPendentes = signal(6);
usuariosCadastrados = signal(7);

usuarioAtual = this.authFacade.usuarioAtual;

areaPerfil = computed(() =>{
  const usuario = this.usuarioAtual();

  if(!usuario){
    return 'Nenhum usuário autenticado';
  }
  return `Usuário autenticado como: ${usuario.perfil}`;
});

sair(){
  this.authFacade.sair();
  this.router.navigateByUrl('/login');
}
}
