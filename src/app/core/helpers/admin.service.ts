import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppStorage } from "../utils/app-storage";




@Injectable({
    providedIn: 'root'
})
export class AdminService {
    private _accessible: boolean;


    constructor() {
        

        // Instead we allow for all:
        this._accessible = true;
    }


    public get accessible(): boolean {
        return this._accessible;
    }

    public get token(): string {
        return AppStorage.getItem<string>("token");
    }

    public set token(val: string) {
        AppStorage.setItem("token", val);
    }

    public get audience(): string {
        return AppStorage.getItem<string>("audience");
    }

    public set audience(val: string) {
        AppStorage.setItem("audience", val);
    }

    public refreshCurrentUserAdminState(): Promise<boolean> | boolean {
        return this._accessible;
    }

    // public refreshCurrentUserAdminState(): Promise<boolean> | boolean {
    //    if (!this.userService.isLogged) {
    //        this._accessible = false;
    //        return false;
    //    }

    //    return this.accountService.getToken().then(res => {
    //        if (res) {
    //            this.token = res.token;
    //            this.audience = res.audience;
    //        } else {
    //            this.token = null;
    //            this.audience = null;
    //        }

    //        if (this.token && this.audience) {
    //            return this.httpClient.get(`${this.audience}/api/home/auth-check`, {
    //                headers: { "Authorization": `Bearer ${this.token}` }
    //            }).toPromise().then(() => {
    //                this._accessible = true;
    //                return true;
    //            }).catch(() => {
    //                this._accessible = false;
    //                return false;
    //            });
    //        }

    //        this._accessible = true;
    //        return true;
    //    }).catch(() => false);
    // }
}