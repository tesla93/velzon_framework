import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CrudService, HttpResponsesHandlersFactory } from "src/app/core/data-service";
import { Order } from "../models/order.model";
import { PagedCrudService } from "src/app/core/data-service/paged-crud-service";
import { OrderStatus } from "../models/order-status";
import { SelectListItem } from "src/app/shared/classes/select-list-item";

@Injectable({
    providedIn: "root"
})
export class OrderStatusService extends PagedCrudService<OrderStatus> {
    public readonly url = "api/order-status";
    public readonly entityTitle = "Order Status";

    constructor(http: HttpClient, handlersFactory: HttpResponsesHandlersFactory) {
        super(http, handlersFactory);
    }

    public getDropdown(): Promise<SelectListItem[]> {
        return this.handleRequest<SelectListItem[]>(
            this.http.get<SelectListItem[]>(`${this.url}/dropdown`),
            this.handlersFactory.getDefault());
    }

   
}