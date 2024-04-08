
import { Component } from "@angular/core";
import { CountableFilterMatchMode } from "../enums/countable-filter-match-mode";
import { FilterType } from "../enums/filter-type";
import { InputType } from "../enums/input-type";
import { StringFilterMatchMode } from "../enums/string-filter-match-mode";

export class FilterSettings {

    /* Defines Calendar's format of the date.
     * https://www.primefaces.org/primeng/#/calendar */
    public calendarDateFormat?: string;

    /* Defines options for Dropdown if inputType is "Dropdown". */

    /* Defines visibility of filter in a dropdown */
    public dropdownFilter?: boolean;

    /* Defines options for Combobox if inputType is "Combobox". */

    public defaultValue?: any;

    /* Defines type of filter. */
    public filterType?: FilterType;

    public matchMode?: CountableFilterMatchMode | StringFilterMatchMode;

    /* Defines placeholder for Dropdown or floating label otherwise. */
    public header!: string;

    public inputClass?: string;

    public inputStyle?: string;

    /* Defines type of input. */
    public inputType?: InputType;

    public currency?: string;

    public placeholder?: string;

    /* Defines whether to show calendar's icon if inputType is "Date". */
    public showCalendarIcon?: boolean;

    /* Stores the entered value */
    public valueFieldName!: string;  // (it should be unique for the custom filter)

    /* Changes filtering behavior for Boolean filter in "Checkbox" mode. */
    public treatFalseAsNull?: boolean;
    public treatTrueAsNull?: boolean;

    /* Custom filter */
    public customFilterComponent?: Component;
}
