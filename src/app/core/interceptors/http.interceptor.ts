import { HttpInterceptorFn } from "@angular/common/http";
import { tap } from "rxjs";
import { catchError } from "rxjs";
import { throwError } from "rxjs";


export const httpInterceptor: HttpInterceptorFn = (req, next) => {

    console.log('Inteceptando Requisição: ', req.url);

//! Aqui você pode adicionar lógica para modificar a requisição antes de enviá-la, como adicionar cabeçalhos, autenticação, etc.
    const token = 'fake-token-jwt';

    const novaReq = req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        },
    });
     return next(novaReq).pipe(
        tap({
            next: (event) => console.log('Responde: ', event),
            error: (error) => console.error('Erro na Requisição: ', error),
        }),
        catchError((error) => {
            console.error('ERRO GLOBAL: ', error);
            return throwError(() => error);
        }),
        catchError((error) => {
            console.error('Erro na Requisição Global: ', error);
            if (error.status === 401) {
                // Aqui você pode adicionar lógica para lidar com erros de autenticação, como redirecionar para a página de login.
                console.warn('Erro de autenticação de Usuário: ', error);
            }
            if (error.status === 500) {
                console.warn('Erro interno do servidor!');
            }
            return throwError(() => error);
        })
    );

};