import { IObjectReferenceFilter } from "../interfaces/object-reference-filter";

export class ObjectReferenceFilter implements IObjectReferenceFilter {
    public type = "objectReference";
    constructor(public propertyName: string, public value: string) {
    }
}
