import { Component, computed, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {

  private router = inject(Router);
  private authService = inject(AuthService);

totalProdutosCadastrados = signal(20);
pedidosPendentes = signal(6);
usuariosCadastrados = signal(7);

usuarioAtual = this.authService.usuarioAtual;

areaPerfil = computed(() =>{
  const usuario = this.usuarioAtual();

  if(!usuario){
    return 'Nenhum usuário autenticado';
  }
  return `Usuário autenticado como: ${usuario.perfil}`;
});

sair(){
  this.authService.logout();
  this.router.navigateByUrl('/login');
}
}
