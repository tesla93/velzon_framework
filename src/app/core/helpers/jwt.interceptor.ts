import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { AdminService } from "./admin.service";




@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private adminService: AdminService) {}
    private readonly apiUrlSegment = "api/"; // A segment within an URL that uniquely identifies an API request.


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url.includes(this.apiUrlSegment)) {
        const token = this.adminService.token, audience = this.adminService.audience;
        if (token && audience) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                },
                url: `${audience}${request.url}`
            });
        }
    }

        return next.handle(request);
    }
}