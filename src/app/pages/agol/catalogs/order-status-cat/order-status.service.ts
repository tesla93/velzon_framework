import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CrudService, HttpResponsesHandlersFactory } from "src/app/core/data-service";
import { OrderStatus } from "../../models/order-status";
import { PagedCrudService } from "src/app/core/data-service/paged-crud-service";

@Injectable({
    providedIn: "root"
})
export class OrderStatusService extends PagedCrudService<OrderStatus> {
    public readonly url = "api/order-status";
    public readonly entityTitle = "Order Status";

    constructor(http: HttpClient, handlersFactory: HttpResponsesHandlersFactory) {
        super(http, handlersFactory);
    }   
}