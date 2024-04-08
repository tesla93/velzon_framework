import { IDynamicFilter } from "../interfaces/dynamic-filter";

export class DynamicFilter implements IDynamicFilter {
    fieldName!: string;
    defaultValue: any;
    data: any;
    placeholder!: string;

    componentRef: any;
    destroy(): void {
        if (this.componentRef) {
            this.componentRef.destroy();
        }
    }
}