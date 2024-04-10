import { IDateFilter } from "../interfaces/date-filter";
import { CountableFilterMatchMode } from "../enums/countable-filter-match-mode";

export class DateFilter implements IDateFilter {
    public type = "date";
    public matchMode: CountableFilterMatchMode;

    constructor(public propertyName: string,
        public value: Date,
        matchMode?: CountableFilterMatchMode) {
        this.matchMode = matchMode ? matchMode : CountableFilterMatchMode.Equals;
    }

    get matchModeString(): string {
        const matchMode = CountableFilterMatchMode[this.matchMode];
        return `${matchMode.charAt(0).toLowerCase()}${matchMode.slice(1)}`;
    }
}
