import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
    AuthResponse,
    LoginCredentials,
    RegisterCredentials,
    User,
} from '@angular-nest-mongo/shared-lib';
import { filter, map, Observable, switchMap, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    public jwt!: string;

    constructor(
        private httpClient: HttpClient,
        private user: UserService,
        private _router: Router,
    ) { }

    public login(
        credentials: LoginCredentials
    ): Observable<{ jwt: string; user: User }> {
        return this.httpClient.post(`${environment.api}/auth/login`, credentials).pipe(
            filter((resp: any) => !!resp.jwt),
            tap((resp: any) => {
                return this.storeJWT(resp)
            }),
            switchMap(() => {
                return this.getCurrentUser()
            }),
            map((user: User) => {
                this.handleUserSignInAttempt(user);
                return { jwt: this.jwt, user: user };

            })
        );

    }


    public getCurrentUser(): Observable<User> {
        return this.httpClient.get<User>(
            `${environment.api}/auth/profile`
        );
    }

    public storeJWT(resp: any): void {
        localStorage.setItem('jwt', resp.jwt);
        this.jwt = resp.jwt;
    }

    public handleUserSignInAttempt(user: User) {
        this.user.setCurrentUser(user);
    }

    public logout(message?: string) {
        localStorage.removeItem('jwt');
        this._router.navigate(['/auth']);
    }
}
