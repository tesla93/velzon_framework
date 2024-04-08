import { IFilterCommand } from "../filter";
import { IPagedData } from "./paged-data";

export interface IPagedCrudService<T> {
    readonly entityTitle: string;
    readonly type: string;
    getPage?(filterCommand: IFilterCommand): Promise<IPagedData<T>>;
    getPageByApiUrl?(filterCommand: IFilterCommand, apiUrl: string): Promise<IPagedData<T>>;
    getPageByODataUrl?(odataUrl: string): Promise<any>;
    create(item: T): Promise<T>;
    update(id: number | string, item: T): Promise<T>;
    delete(id: number | string): Promise<any>;
    deleteAll(): Promise<any>;
}