import { CanActivateFn } from "@angular/router";
import { AuthFacade } from "./facades/auth.facade";
import { inject, } from "@angular/core";
import { Router } from "@angular/router";

export const authGuard: CanActivateFn = () => {
    const authFacade = inject(AuthFacade);
    const router = inject(Router);

    if(authFacade.usuarioLogado()){
        return true;
    }
    return router.createUrlTree(['/login']);
};