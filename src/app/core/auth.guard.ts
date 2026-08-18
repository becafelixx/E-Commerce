import { CanActivateFn } from "@angular/router";
import { AuthService } from "./services/auth.service";
import { inject, } from "@angular/core";
import { Router } from "@angular/router";

export const authGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if(authService.usuarioLogado()){
        return true;
    }
    return router.createUrlTree(['/login']);
};