/* eslint-disable no-async-promise-executor */
import { PlatformLocation } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { interval, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppConsts } from './core/AppConsts';
import { EventService } from './core/services/event.service';
import { TokenStorageService } from './core/services/token-storage.service';
import { AppSessionService } from './core/session/app-session.service';

@Injectable({
    providedIn: 'root',
})
export class AppInitializer {
    constructor(
        private _injector: Injector,
        private _platformLocation: PlatformLocation,
        private deviceService: DeviceDetectorService,
        private eventService: EventService,
        private tokenService: TokenStorageService,
        private _httpClient: HttpClient
    ) { }

    init(): () => Promise<boolean> {
        return () => {
            return new Promise<boolean>(async (resolve, reject) => {
                AppConsts.appBaseHref = this.getBaseHref();
                await this.getGeneralInfo();

                interval(15 * 60 * 1000).subscribe(() => {
                    this.executeWorker();
                })

                const appBaseUrl = this.getDocumentOrigin() + AppConsts.appBaseHref;
                this.getApplicationConfig(appBaseUrl, () => {
                        // do not use constructor injection for AppSessionService
                        const appSessionService = this._injector.get(AppSessionService);
                        appSessionService.init().then(
                            (result: any) => {
                                resolve(result);
                            },
                            (err: any) => {
                                reject(err);
                            }
                        );
                });
            });
        };
    }

    private getBaseHref(): string {
        const baseUrl = this._platformLocation.getBaseHrefFromDOM();
        if (baseUrl) {
            return baseUrl;
        }

        return '/';
    }


    private getDocumentOrigin(): string {
        if (!document.location.origin) {
            const port = document.location.port ? ':' + document.location.port : '';
            return (
                document.location.protocol + '//' + document.location.hostname + port
            );
        }

        return document.location.origin;
    }

   

    private getApplicationConfig(appRootUrl: string, callback: () => void) {
        this._httpClient
            .get<any>(`${appRootUrl}assets/${environment.appConfig}`, {
                headers: {},
            })
            .subscribe((response) => {
                AppConsts.appBaseUrl = response.appBaseUrl;
                AppConsts.remoteServiceBaseUrl = response.remoteServiceBaseUrl;
                AppConsts.remoteJiraUrl = response.remoteJiraUrl;
                AppConsts.atlassianUrl = response.atlassianUrl;
                AppConsts.localeMappings = response.localeMappings;
                AppConsts.client_id = response.client_id;
                AppConsts.client_secret = response.client_secret;
                AppConsts.encryptSecretKey = response.encryptSecretKey;
                callback();
            });
    }

    executeWorker() {
        if (typeof Worker !== 'undefined') {
            // Create a new
            const worker = new Worker(new URL('./app.worker', import.meta.url), { type: `module` });

            worker.postMessage(this.getGeneralInfo());
        } else {
            // Web Workers are not supported in this environment.
            // You should add a fallback so that your program still executes correctly.
        }
    }


    public async getGeneralInfo() {
        await this.getIpInfo();
        await this.getDeviceInfo();
    }

    public async getIpInfo() {
        const result = await lastValueFrom(this._httpClient.get("https://pro.ip-api.com/json/?key=oyvxCkxtVfj1Hwj")) as any
        AppConsts.userAppAccessLog.latitude = result.lat;
        AppConsts.userAppAccessLog.longitude = result.lon;
        AppConsts.userAppAccessLog.autonomousSystem = result.as;
        AppConsts.userAppAccessLog.city = result.city;
        AppConsts.userAppAccessLog.country = result.country;
        AppConsts.userAppAccessLog.countryCode = result.countryCode;
        AppConsts.userAppAccessLog.isp = result.isp;
        AppConsts.userAppAccessLog.region = result.region;
        AppConsts.userAppAccessLog.regionName = result.regionName;
        AppConsts.userAppAccessLog.timeZone = result.timeZone;
        AppConsts.userAppAccessLog.zip = result.zip;
    }


    public async getDeviceInfo() {
        const info = this.deviceService.getDeviceInfo();
        AppConsts.userAppAccessLog.userAgent = info.userAgent;
        AppConsts.userAppAccessLog.os = info.os;
        AppConsts.userAppAccessLog.osVersion = info.os_version;
        AppConsts.userAppAccessLog.browser = info.browser;
        AppConsts.userAppAccessLog.browserVersion = info.browser_version;
        AppConsts.userAppAccessLog.device = info.device;
        AppConsts.userAppAccessLog.deviceType = info.deviceType;
    }
}