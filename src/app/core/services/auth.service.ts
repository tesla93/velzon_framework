import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
// import { AppConsts } from '@shared/AppConsts';
// import { AppStorage } from '@shared/utils/app-storage';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Message } from '../../core/classes/message';
import { User } from '../../core/models/auth.models';
// import { AuthenticateResultModel } from '../../core/models/authentication-result.model';
import { TokenStorageService } from '../../core/services/token-storage.service';
import { AppStorage } from '../utils/app-storage';
import { AppConsts } from '../AppConsts';
import { AuthenticateResultModel } from '../classes/authentication-result.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({ providedIn: 'root' })

/**
 * Auth-service Component
 */
export class AuthenticationService {

    user!: User;
    currentUserValue: any;
    errorMsg!: string

    constructor(private http: HttpClient,
        private translate: TranslateService,
        private tokenService: TokenStorageService) {
        this.translate.get(`AUTHSERVICE.ERRORAUTH`).subscribe(() => {
            this.errorMsg = this.translate.instant('AUTHSERVICE.ERRORAUTH')
        });
    }

    /**
     * Performs the register
     * @param email email
     * @param password password
     */
    register(email: string, first_name: string, password: string) {

        // Register Api
        return this.http.post(AppConsts.remoteServiceBaseUrl + 'signup', {
            email,
            first_name,
            password,
        }, httpOptions);
    }

    get isLogged(){
        return !!AppStorage.getItem(AppConsts.authorization.currentUser);
    }

    /**
     * Performs the auth
     * @param email email of user
     * @param password password of user
     */

    login(username: string, password: string) {
        this.tokenService.removeToken();
        const body = new URLSearchParams()
        body.set('username', username);
        body.set('password', password);
        body.set('client_id', AppConsts.client_id);
        body.set('client_secret', AppConsts.client_secret);
        body.set('grant_type', 'password');
        return this.http.post<any>(AppConsts.remoteServiceBaseUrl + 'token', body.toString())
            .pipe(
                tap((res: AuthenticateResultModel) => {
                    this.tokenService.setToken(res);
                }),
                catchError(() => {
                    AuthenticationService.handleError(this.errorMsg)
                    return of();
                })
            );
    }

    refreshToken(refreshData: any): Observable<any> {
        this.tokenService.removeToken();
        const body = new HttpParams()
            .set('refresh_token', refreshData.refresh_token)
            .set('grant_type', 'refresh_token');
        return this.http.post<any>(AppConsts.remoteServiceBaseUrl + '/token', body)
            .pipe(
                tap((res: AuthenticateResultModel) => {
                    this.tokenService.setToken(res);
                }),
                catchError(() => {
                    AuthenticationService.handleError(this.errorMsg)
                    return of();
                })
            );
    }

 
    

    /**
     * Logout the user
     */
    logout() {
        this.tokenService.removeToken();
        this.tokenService.removeCurrentUser();
        AppStorage.removeItem(AppConsts.authorization.loginInformation);
        window.location.reload();
    }

    isTokenExpired(): boolean {
        const date = new Date(AppStorage.getItem(AppConsts.authorization.expiry_token_date));
        if (date === undefined || date === null) return false;
        return (date.valueOf() <= new Date().valueOf());
    }



    private static handleError(error: string): any {
        Message.Error(error);
        console.error(error);
        return throwError(() => new Error(error));
    }
}

