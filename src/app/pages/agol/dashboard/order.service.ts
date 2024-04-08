import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CrudService, HttpResponsesHandlersFactory } from "src/app/core/data-service";
import { Order } from "../models/order.model";
import { PagedCrudService } from "src/app/core/data-service/paged-crud-service";

@Injectable({
    providedIn: "root"
})
export class OrderService extends PagedCrudService<Order> {
    public readonly url = "api/order";
    public readonly entityTitle = "Order";

    constructor(http: HttpClient, handlersFactory: HttpResponsesHandlersFactory) {
        super(http, handlersFactory);
    }

    // public getSubcategoriesForCategoryId(categoryId: number): Promise<IMfdSubcategory[]> {
    //     return this.handleRequest<IMfdSubcategory[]>(
    //         this.http.get<IMfdSubcategory[]>(`${this.url}/getSubcategoriesByCategoryId/${categoryId}`),
    //         this.handlersFactory.getDefault()
    //     );
    // }
}