import { IFilterCommand } from "../filter";
import { IPagedData } from "./paged-data";

export interface IPageDataReader<TEntity> {
    readonly type: string;
    readonly entityTitle: string;
    getPage?(filterCommand: IFilterCommand): Promise<IPagedData<TEntity>>;
}
