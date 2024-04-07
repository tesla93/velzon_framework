import { Injectable } from '@angular/core';
import { EncriptionUtility } from './encription-utility';
import { AppConsts } from '../AppConsts';
import { AppStorage } from '../utils/app-storage';
import { AuthenticateResultModel } from '../classes/authentication-result.model';



@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {



  getToken(): AuthenticateResultModel {
    const token = EncriptionUtility.decryptData(AppStorage.getItem(AppConsts.authorization.accessToken) ?? '', AppConsts.encryptSecretKey);
    return token;
  }


  setToken(token: AuthenticateResultModel): void {
    const encriptedToken = EncriptionUtility.encryptData(token, AppConsts.encryptSecretKey) ?? '';
    AppStorage.setItem(AppConsts.authorization.accessToken, encriptedToken);
    if(token.expires_in)
      this.setExpirationDate(+token.expires_in);
  }

  setExpirationDate(expires_in: number) {
    const result = new Date();
    result.setTime(result.getTime() + expires_in*1000);
    AppStorage.setItem(AppConsts.authorization.expiry_token_date, result);
  }


  removeToken(): void {
    AppStorage.removeItem(AppConsts.authorization.accessToken)
  }


  removeCurrentUser() {
    AppStorage.removeItem(AppConsts.authorization.currentUser);
  }

  public setUser(user: any): void {
    AppStorage.removeItem(AppConsts.authorization.currentUser);
    AppStorage.setItem(AppConsts.authorization.currentUser, JSON.stringify(user));
  }

  public getUser(): any {
    return AppStorage.getItem(AppConsts.authorization.currentUser);
  }

  signOut(): void {
    window.sessionStorage.clear();
  }

}
