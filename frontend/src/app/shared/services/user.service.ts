import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@angular-nest-mongo/shared-lib';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly currentUserSubject = new BehaviorSubject<User | undefined>(undefined)
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor(private httpClient: HttpClient) { }

    setCurrentUser(user: User): void {
        this.currentUserSubject.next(user);
    }
}
