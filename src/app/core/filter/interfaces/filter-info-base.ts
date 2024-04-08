export interface IFilterInfoBase {
    propertyName: string;
    notNeedToDelete?: boolean;
    $type: string;
}

export interface ISimpleFilterInfoBase<T> extends IFilterInfoBase {
    value: T;
}
