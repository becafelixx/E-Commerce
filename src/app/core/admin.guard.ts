import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthFacade } from "./facades/auth.facade";

export const adminGuard: CanActivateFn = () => {
    const router = inject(Router)
    const authFacade = inject(AuthFacade)
    if(!authFacade.usuarioLogado()){
        return router.createUrlTree(['/login']);
    }
    if(!authFacade.admin()){
        return router.createUrlTree(['/acesso-negado']);
    }

return true;
}