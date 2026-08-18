import { Component, inject} from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-acesso-negado',
  imports: [RouterLink, MatButtonModule],
  templateUrl: './acesso-negado.html',
  styleUrl: './acesso-negado.css',
})
export class AcessoNegado {

  private router = inject(Router);
  private authService = inject(AuthService);

  sair(){
    this.authService.logout();
    this.router.navigateByUrl('/login');
    return;
  }
}
