import { Component, signal } from '@angular/core';
//import { RouterOutlet } from '@angular/router';//remove a importação de RouterOutlet, pois não é necessário no momento;
//import { Produto } from './components/produto/produto';//importando a classe do produto do arquivo produto.ts para produto/produto 
import { ListaProdutos } from './features/produtos/lista-produtos/lista-produtos'; 
@Component({
  selector: 'app-root',
  imports: [ListaProdutos],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('e-commerce');
}
