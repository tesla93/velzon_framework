import { INumberFilter } from "../interfaces/number-filter";
import { CountableFilterMatchMode } from "../enums/countable-filter-match-mode";


export class NumberFilter implements INumberFilter {
    public $type = "number";
    public matchMode: CountableFilterMatchMode;

    constructor(public propertyName: string,
                public value: number,
                matchMode?: CountableFilterMatchMode,
                public notNeedToDelete?: boolean) {
        this.matchMode = matchMode ? matchMode : CountableFilterMatchMode.Equals;
    }

    get matchModeString(): string {
        const matchMode = CountableFilterMatchMode[this.matchMode];
        return `${matchMode.charAt(0).toLowerCase()}${matchMode.slice(1)}`;
    }
}
