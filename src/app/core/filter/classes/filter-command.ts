
import { StringFilterMatchMode } from "../enums/string-filter-match-mode";
import { IFilterCommand } from "../interfaces/filter-command";
import { IFilterInfoBase } from "../interfaces/filter-info-base";
import { BooleanFilter } from "./bool-filter";
import { DateFilter } from "./date-filter";
import { FilterMetadata } from "./filtermetadata";
import { NumberFilter } from "./number-filter";
import { StringFilter } from "./string-filter";


export class FilterCommand implements IFilterCommand {
    first?: number;
    rows?: number;
    sortOrder?: number;
    sortField?: string;
    filters?: IFilterInfoBase[];
    isPaginator?: boolean;

    
    constructor(event: any, keyProperties?: string[]) {
        this.first = event.first;
        this.rows = event.rows;
        this.sortOrder = event.sortOrder;
        this.sortField = event.sortField;

        if (event.filters) {
            this.filters = [];

            Object.keys(event.filters).forEach(key => {
                const metadata: FilterMetadata = event.filters[key];
                let filter: IFilterInfoBase={} as IFilterInfoBase;

                if (typeof metadata.value === "number" || (keyProperties && keyProperties.some(p => p === key))) {
                    filter = new NumberFilter(key, metadata.value);
                } else if (metadata.value instanceof Date) {
                    filter = new DateFilter(key, metadata.value);
                } else if (typeof metadata.value === "boolean") {
                    filter = new BooleanFilter(key, metadata.value);
                } else if (typeof metadata.value === "string") {
                    const stringFilter = filter = new StringFilter(key, metadata.value);
                    switch (metadata.matchMode) {
                        case "startsWith":
                            stringFilter.matchMode = StringFilterMatchMode.StartsWith;
                            break;
                        case "endsWith":
                            stringFilter.matchMode = StringFilterMatchMode.EndsWith;
                            break;
                        case "equals":
                            stringFilter.matchMode = StringFilterMatchMode.Equals;
                            break;
                    }
                }

                if (filter) this.filters?.push(filter);
            });
        }
    }
}

export class FilterCommandHelper {
    static getEmptyFilterCommand() {
        return new FilterCommand({
          first: 0,
          rows: 0,
          sortOrder: 1,
          filters: {}
        });
      }
}