import { HttpClient } from "@angular/common/http";
import { CrudService } from "./crud.service";
import { HttpResponsesHandlersFactory, IHttpResponseHandlerSettings } from "./http-responses-handler";
import { IFilterCommand } from "../filter";
import { IPagedData } from "../interfaces/paged-data";





export abstract class PagedCrudService<TEntity> extends CrudService<TEntity>  { //implements IPagedCrudService<TEntity>
    public readonly type: string;


    protected constructor(http: HttpClient, handlersFactory: HttpResponsesHandlersFactory) {
        super(http, handlersFactory);
        this.type = "pagedCrudService";
    }


    public getPage(filterCommand: IFilterCommand, responseHandlerSettings?: IHttpResponseHandlerSettings): Promise<IPagedData<TEntity>> {
        if (!this.url) {
            return Promise.resolve(<IPagedData<TEntity>>{ items: [], total: 0 });
        }

        if (this.extendFilterCommand) {
            this.extendFilterCommand(filterCommand);
        }

        // this.prepareFilterCommandDates(filterCommand);

        return this.handleRequest<IPagedData<TEntity>>(
            this.http.get<IPagedData<TEntity>>(`${this.url}/page`, { params: this.constructHttpParams(filterCommand) }),
            this.handlersFactory.getForReadByFilter(responseHandlerSettings)
        )
        // .then(result => {
        //     result.items.forEach(item =>
        //         this.modelUtcDateFields.forEach(utcField => item[utcField] = SetLocalTimeZone(item[utcField])));
        //     return result;
        //});
    }

    public getPageGeneric<TPageEntity>(pageUriFragment: string, filterCommand: IFilterCommand, responseHandlerSettings?: IHttpResponseHandlerSettings): Promise<IPagedData<TPageEntity>> {
        // this.prepareFilterCommandDates(filterCommand);

        return this.handleRequest<IPagedData<TPageEntity>>(
            this.http.get<IPagedData<TPageEntity>>(`${this.url}/${pageUriFragment}`, { params: this.constructHttpParams(filterCommand) }),
            this.handlersFactory.getForReadByFilter(responseHandlerSettings)
        )
        // .then(result => {
        //     result.items.forEach(item =>
        //         this.modelUtcDateFields.forEach(utcField => item[utcField] = SetLocalTimeZone(item[utcField])));
        //     return result;
        // });
    }

    // to be overridden in child services (or components e.g. in ngOnInit to pass some data from the component to as the default filter conditions).
    // E.g.you might want to append some custom filter conditions without overriding of the getPage method
    public extendFilterCommand(filterCommand: IFilterCommand) { }


    // public prepareFilterCommandDates(filterCommand: IFilterCommand): void {
    //     this.modelUtcDateFields.forEach(utcField => {
    //         const filter = filterCommand.filters.find(filterItem => filterItem.propertyName == utcField) as IDateFilter;
    //         if (filter && filter.value) {
    //             filter.value = SetUTCTimeZone(filter.value);
    //         }
    //     });
    // }
}