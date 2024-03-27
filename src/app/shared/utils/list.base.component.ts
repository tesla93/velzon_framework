import { GridColumn } from "../grid/classes/grid-column";
import { BaseComponent } from "./base.component";

export class ListBaseComponent<TItem> extends BaseComponent {
    showSpinner = false;
    itemsPerPage = [10, 20, 30, 50];
    totalRecords!: number;
    dataList!: TItem[]  | undefined;
    public columns: GridColumn[] = [];
}