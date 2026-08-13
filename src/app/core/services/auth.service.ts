import { Injectable, signal, computed } from "@angular/core";

type Usuario ={
    email: string;
    perfil: string;
}

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private usuario  = signal <Usuario| null> (null);
    private tokenJwt = signal <string | null> (null);

    //!COMPUTED
    usuarioAtual = computed(()=> this.usuario());
    usuarioLogado = computed(()=> this.usuario() ! == null );
    token = computed (()=> this.tokenJwt());

    login(){}

    logout(){
        this.usuario.set(null);
        this.tokenJwt.set(null);
    }
    
    obterToken(): string | null {
        return this.tokenJwt();
    }
}