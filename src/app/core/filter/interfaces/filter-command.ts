import { IFilterInfoBase } from "./filter-info-base";

export interface IFilterCommand {
    first?: number;
    rows?: number;
    sortOrder?: number;
    sortField?: string;
    filters?: IFilterInfoBase[];
    isPaginator?: boolean;
}
