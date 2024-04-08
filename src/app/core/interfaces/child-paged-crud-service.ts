import { IPagedCrudService } from "./paged-crud-service";

export interface IChildPagedCrudService<T> extends IPagedCrudService<T> {
    readonly urlPattern: string;
}