import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthFacade } from '../../../core/facades/auth.facade';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  authFacade = inject(AuthFacade);
  router = inject(Router);

  erroLogin = signal(false);

  formulario = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    senha: new FormControl('',[Validators.required, Validators.minLength(6)])
  });
   entrar(){
    this.erroLogin.set(false);

  if(this.formulario.invalid){
   this.formulario.markAllAsTouched(); 
   return;

  }
  const email = this.formulario.value.email ?? '';
  const senha = this.formulario.value.senha ?? '';
  
  const loginFinalizado = this.authFacade.realizarLogin(email, senha);

  if(!loginFinalizado){
    this.erroLogin.set(true);
    return;
  }
  if(this.authFacade.admin()){
    this.router.navigateByUrl('/admin');
    return;
  }

  this.router.navigateByUrl('/produtos');
  
}
}