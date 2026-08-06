import { Component, signal } from '@angular/core';
//import { RouterOutlet } from '@angular/router';//remove a importação de RouterOutlet, pois não é necessário no momento;
//import { Produto } from './components/produto/produto';//importando a classe do produto do arquivo produto.ts para produto/produto 
import { RouterOutlet, RouterLink } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { usuarioLogado, login, logout } from './core/auth';
import { MatButtonModule } from '@angular/material/button'
import { Header } from './shared/layout/header/header';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, UpperCasePipe, MatButtonModule, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  usuarioLogado = usuarioLogado;
  login = login;
  logout = logout;
  protected readonly title = signal('e-commerce');
  nomeLoja = ' Félix Tech';
}
