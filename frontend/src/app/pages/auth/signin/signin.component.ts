import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@shared';
import { User } from '@angular-nest-mongo/shared-lib'
import { Subscription, catchError, filter, map, of, switchMap, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnDestroy {

  password: string = '';
  identifier: string = '';
  loginSub: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router,
    private ar: ActivatedRoute,
  ) {
    this.ar.queryParams.pipe(
      filter((params) => !!params['token']),
      tap((params) => {
        const token = params['token']
        this.authService.storeJWT({ jwt: token });
      }),
      switchMap(() => this.authService.getCurrentUser()),
      map((user: User) => {
        this.authService.handleUserSignInAttempt(user);
        return { jwt: this.authService.jwt, user: user };

      }),
      catchError((err: HttpErrorResponse) => {
        return of(err);
      }
      ),
      tap(() => {
        this.router.navigateByUrl('/geolocalization')
      })
    ).subscribe();
  }



  login() {
    this.loginSub = this.authService
      .login({
        username: this.identifier,
        password: this.password,
      })
      .pipe(
        catchError((err: HttpErrorResponse) =>
          throwError(() => this.displaySignInErrorToast(err))
        ),
        tap(() => this.router.navigateByUrl('/geolocalization'))
      )
      .subscribe();
  }

  displaySignInErrorToast(err: HttpErrorResponse) {
    const { error, message } = err;
    console.log(error)
    console.log(message)
  }

  ngOnDestroy(): void {
    this.loginSub.unsubscribe();
  }
}
