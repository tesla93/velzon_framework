import {
    HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Router } from "@angular/router";

import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

// import { AccountService } from "@account/services/account.service";
import { AppStorage } from "../utils/app-storage";
import { AuthenticationService } from "../services/auth.service";


@Injectable()
export class HttpStatusesInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((err: HttpErrorResponse) => {
                if (err.status == 401) {
                    const authService = this.injector.get(AuthenticationService);
                    if (authService) {
                        const router = this.injector.get(Router);

                        AppStorage.setItemForSession('AppStorage.LogoutReasonMessageKey', "Sorry, you are not authenticated.");
                        AppStorage.setItemForSession('AppStorage.LastVisitedPageUrlKey', location.pathname);

                        if (authService.isLogged) {
                            authService.logout();
                        } else {
                            if (!location.pathname.startsWith("/account")) {
                                router.navigate(["/account"]);
                            }
                        }
                    }
                }

                return throwError(err);
            }));
    }
}