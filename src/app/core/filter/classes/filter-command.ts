
import { IFilterCommand } from "../interfaces/filter-command";
import { IFilterInfoBase } from "../interfaces/filter-info-base";


export class FilterCommand implements IFilterCommand {
    first?: number;
    rows?: number;
    sortOrder?: number;
    sortField?: string;
    filters?: IFilterInfoBase[];
    isPaginator?: boolean;

    
}