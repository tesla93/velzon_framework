import { CountableFilterMatchMode } from "../enums/countable-filter-match-mode";
import { IDateBetweenFilter } from "../interfaces/date-filter";


export class DateBetweenFilter implements IDateBetweenFilter {
    public type = "datebetween";
    public matchMode: CountableFilterMatchMode;

    constructor(public propertyName: string,
                public from: Date,
                public to: Date) {
        this.matchMode = CountableFilterMatchMode.Between;
    }
}
