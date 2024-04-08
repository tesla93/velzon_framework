export interface IDynamicFilter {
    fieldName: string;
    defaultValue: any;
    data: any;
    placeholder: string;
    componentRef: any;
    destroy(): void;
}