import { HttpErrorResponse } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";




import { HttpStatusCodes } from "./http-status-codes";
import { Message } from "../classes/message";



export interface IHttpResponsesHandler {
    handleSuccess?(): void;
    handleError?(errorResponse: HttpErrorResponse): void;
}

export interface IHttpResponseHandlerSettings {
    showSuccessMessage?: boolean; // Default false
    successMessage?: string;
    showErrorMessage?: boolean; // Default true
    errorMessage?: string;
    errorStatusesMessages?: {[key: number]: string};
}


export class BaseHttpResponsesHandler implements IHttpResponsesHandler {
    constructor(protected injector: Injector, protected settings?: IHttpResponseHandlerSettings) { }


    public handleSuccess(): void {
        if (this.settings && this.settings.showSuccessMessage) {
            Message.Success(this.settings.successMessage ? this.settings.successMessage : "Operation succeed.");
        }
    }

    public handleError(errorResponse: HttpErrorResponse): void {
        if (this.settings && this.settings.showErrorMessage == false) return;

        if (this.settings && this.settings.errorStatusesMessages && this.settings.errorStatusesMessages[errorResponse.status] != null) {
            Message.Error(this.settings.errorStatusesMessages[errorResponse.status]);
            return;
        }

        this.handleErrorHttpStatusCode(errorResponse);
    }

    protected handleErrorHttpStatusCode(errorResponse: HttpErrorResponse): void {

        switch (errorResponse.status) {
            case HttpStatusCodes.Status400BadRequest:
                this.handleStatus400BadRequest(errorResponse);
                break;
            case HttpStatusCodes.Status403Forbidden:
                this.handleStatus403Forbidden(errorResponse);
                break;
            case HttpStatusCodes.Status401Unauthorized:
                break;
            default:
                this.handleOtherError(errorResponse);
        }
    }

    protected handleOtherError(errorResponse: HttpErrorResponse): void {
        Message.Error(errorResponse.error
            ? errorResponse.error
            : "An error has occurred at the website and your support team will need to fix the problem. A preliminary report has been sent to the support team. Please do follow-up on the preliminary report using the Report a Problem page");
    }



    private handleStatus400BadRequest(errorResponse: HttpErrorResponse): boolean {
        let errorMessage = errorResponse.message
            ?? "Request not understood. There may be a network issue. Please attempt to submit your request again. If this problem persists, please use the Report a Problem page found on the menu to alert your support team.";

        if (typeof errorResponse.error === "object") {
            // OData errors
            if (errorResponse.error.error && errorResponse.error.error.message) {
                errorMessage = errorResponse.error.error.message;
            }

            // Validation errors
            if (errorResponse.error.errors) {
                errorMessage = Object.keys(errorResponse.error.errors).map(key => `${key}: ${errorResponse.error.errors[key]}`).join("\n");
            }
        } else {
            errorMessage = errorResponse.error;
        }

        Message.Error(errorMessage);
        return false;
    }

    private handleStatus403Forbidden(errorResponse: HttpErrorResponse): void {
        Message.Error("You don’t have authorisation for this feature. Please refresh your page. If this problem persists, please use the Report a Problem page found on the menu to alert your support team.");
    }
}

export class OnReadByIdResponsesHandler extends BaseHttpResponsesHandler {
    constructor(private entityTitle: string, injector: Injector, settings?: IHttpResponseHandlerSettings) {
        super(injector, settings);
    }

    protected override handleErrorHttpStatusCode(errorResponse: HttpErrorResponse): void {
        if (errorResponse.status == HttpStatusCodes.Status404NotFound) {
            Message.Error(`${this.entityTitle} not found. Perhaps another user has deleted the ${this.entityTitle}. Please consider refreshing the page.`);
            return;
        }

        super.handleErrorHttpStatusCode(errorResponse);
    }
}

export class OnCreateResponseHandler extends BaseHttpResponsesHandler {
    constructor(entityTitle: string, injector: Injector, settings?: IHttpResponseHandlerSettings) {
        super(injector, settings);

        if (!this.settings) this.settings = <IHttpResponseHandlerSettings> {};
        if (this.settings.showSuccessMessage == null) this.settings.showSuccessMessage = true;
        if (this.settings.successMessage == null) this.settings.successMessage = `${entityTitle} created.`;
    }
}

export class OnUpdateResponseHandler extends BaseHttpResponsesHandler {
    constructor(private entityTitle: string, injector: Injector, settings?: IHttpResponseHandlerSettings) {
        super(injector, settings);

        if (!this.settings) this.settings = <IHttpResponseHandlerSettings> {};
        if (this.settings.showSuccessMessage == null) this.settings.showSuccessMessage = true;
        if (this.settings.successMessage == null) this.settings.successMessage = `${entityTitle} updated.`;
    }


    protected override handleErrorHttpStatusCode(errorResponse: HttpErrorResponse): void {
        if (errorResponse.status == HttpStatusCodes.Status404NotFound) {
            Message.Error(`${this.entityTitle} not found. Perhaps another user has deleted the ${this.entityTitle}. Please consider taking a note of your changes and then refreshing the page.`);
            return;
        }

        super.handleErrorHttpStatusCode(errorResponse);
    }
}

export class OnDeleteResponseHandler extends BaseHttpResponsesHandler {
    constructor(private entityTitle: string, injector: Injector, settings?: IHttpResponseHandlerSettings) {
        super(injector, settings);

        if (!this.settings) this.settings = <IHttpResponseHandlerSettings> {};
        if (this.settings.showSuccessMessage == null) this.settings.showSuccessMessage = true;
        if (this.settings.successMessage == null) this.settings.successMessage = `${entityTitle} deleted.`;
    }


    protected override handleErrorHttpStatusCode(errorResponse: HttpErrorResponse): void {
        if (errorResponse.status == HttpStatusCodes.Status404NotFound) {
            Message.Error(`${this.entityTitle} not found. Perhaps another user has deleted the ${this.entityTitle}. Please consider taking a note of your changes and then refreshing the page.`);
            return;
        }

        super.handleErrorHttpStatusCode(errorResponse);
    }
}

@Injectable()
export class HttpResponsesHandlersFactory {
    constructor(private injector: Injector) {
    }

    getDefault(settings?: IHttpResponseHandlerSettings): IHttpResponsesHandler {
        return new BaseHttpResponsesHandler(this.injector, settings);
    }

    getForReadById(entityTitle: string, settings?: IHttpResponseHandlerSettings): IHttpResponsesHandler {
        return new OnReadByIdResponsesHandler(entityTitle, this.injector, settings);
    }

    getForReadByFilter(settings?: IHttpResponseHandlerSettings): IHttpResponsesHandler {
        return new BaseHttpResponsesHandler(this.injector, settings);
    }

    getForReadAll(settings?: IHttpResponseHandlerSettings): IHttpResponsesHandler {
        return new BaseHttpResponsesHandler(this.injector, settings);
    }

    getForCreate(entityTitle: string, settings?: IHttpResponseHandlerSettings): IHttpResponsesHandler {
        return new OnCreateResponseHandler(entityTitle, this.injector, settings);
    }

    getForUpdate(entityTitle: string, settings?: IHttpResponseHandlerSettings): IHttpResponsesHandler {
        return new OnUpdateResponseHandler(entityTitle, this.injector, settings);
    }

    getForDelete(entityTitle: string, settings?: IHttpResponseHandlerSettings): IHttpResponsesHandler {
        return new OnDeleteResponseHandler(entityTitle, this.injector, settings);
    }
}