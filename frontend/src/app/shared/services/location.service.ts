import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Location, LocationSearchByDistance, User } from '@angular-nest-mongo/shared-lib';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class LocationService {
    constructor(
        private httpClient: HttpClient,
        private authService: AuthService
    ) { }

    getAllLocations(): Observable<Location[]> {
        return this.httpClient.get<Location[]>(
            `${environment.api}/location`
        );
    }

    searchAllLocationsByDistance(query: LocationSearchByDistance): Observable<Location[]> {
        return this.httpClient.post<Location[]>(
            `${environment.api}/location/byDistance`, query
        );
    }

    getMyLocations(): Observable<Location[]> {

        let headers = new HttpHeaders();
        headers = headers.set('Authorization', `Bearer ${this.authService.jwt}`);

        return this.httpClient.get<Location[]>(
            `${environment.api}/location/mine`, {
            headers
        }
        );
    }
}