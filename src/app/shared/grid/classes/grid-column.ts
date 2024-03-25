import { Pipe } from "@angular/core";
import { DisplayingMode } from "../enums/displaying-mode";

export interface GridColumn {

    isKey?: boolean;
    field: string;
    header: string;
    visible?: boolean;
    displayingHandler?: (cellValue: any, rowData?: any) => any;
    sortable?: boolean;
    displayingMode?: DisplayingMode;
    
    isAction: boolean
    iconClass: string;
    alternativeIconClass: string;
    clickHandler?: (...args: any[]) => void;
    actionButtons:any[]
    selectItems:any[]
    hasIcon?:boolean;
    symbol?:string;
    avatarField?: string;
    /* Classes which might be applied to <td> tag*/
    style?: any;
    headerStyle?: any;
    isEditable:boolean;
    selectMultiple?:boolean;
    ngClass?: string | string[] | Set<string> | { [klass: string]: any; }; 

}
