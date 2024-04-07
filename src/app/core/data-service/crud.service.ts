import { HttpClient } from "@angular/common/http";
import { BaseDataService } from "./base.data.service";
import { HttpResponsesHandlersFactory, IHttpResponseHandlerSettings } from "./http-responses-handler";


export abstract class CrudService<TEntity> extends BaseDataService {
    public readonly abstract url: string;
    public readonly abstract entityTitle: string;


    protected constructor(http: HttpClient, handlersFactory: HttpResponsesHandlersFactory) {
        super(http, handlersFactory);
    }


    /* Field those time should be time zone independent. */


    //#region Read Methods
    public get(id: number | string, responseHandlerSettings?: IHttpResponseHandlerSettings): Promise<TEntity> {
        return this.handleRequest<TEntity>(
            this.http.get<TEntity>(`${this.url}/${id}`),
            this.handlersFactory.getForReadById(this.entityTitle, responseHandlerSettings)
        ).then(result => {
            return result;
        });
    }

    public getAll(responseHandlerSettings?: IHttpResponseHandlerSettings): Promise<TEntity[]> {
        return this.handleRequest<TEntity[]>(
            this.http.get<TEntity[]>(`${this.url}`),
            this.handlersFactory.getForReadAll(responseHandlerSettings)
        ).then(result => {
           
            return result;
        });
    }
    //#endregion

    //#region Edit Methods
    public create(item: TEntity, responseHandlerSettings?: IHttpResponseHandlerSettings): Promise<TEntity> {
        return this.handleRequest<TEntity>(
            this.http.post<TEntity>(`${this.url}`, item),
            this.handlersFactory.getForCreate(this.entityTitle, responseHandlerSettings)
        );
    }

    public update(id: number | string, item: TEntity, responseHandlerSettings?: IHttpResponseHandlerSettings): Promise<TEntity> {
        return this.handleRequest<TEntity>(
            this.http.put<TEntity>(`${this.url}/${id}`, item),
            this.handlersFactory.getForUpdate(this.entityTitle, responseHandlerSettings)
        );
    }

    public delete(id: number | string, responseHandlerSettings?: IHttpResponseHandlerSettings): Promise<any> {
        return this.handleRequest<any>(
            this.http.delete<any>(`${this.url}/${id}`),
            this.handlersFactory.getForDelete(this.entityTitle, responseHandlerSettings)
        );
    }

    public deleteAll(responseHandlerSettings?: IHttpResponseHandlerSettings): Promise<any> {
        return this.handleRequest<any>(
            this.http.delete<any>(`${this.url}`),
            this.handlersFactory.getForDelete(this.entityTitle, responseHandlerSettings)
        );
    }
    //#endregion
}