import { Pipe } from "@angular/core";
import { FormControl } from "@angular/forms";

export class Field<T> {
    /**
     * field type if the field is input, radio button or checkbox
     */
    fieldType?: string;
  
    /**
     * field name will be used to uniquely identify the form element
     * as well as two-way binding
     * thus property name of the class and field name should be matched
     */
    name: string;
  
    /**
     * class to be applied to the element
     */
    class?: string;
    /**
     * class to be applied to a big higher element such as <mat-form-field>
     */
    parentClass?: string;
    parentStyle?: unknown;

    id?: string;
  
    
    placeHolder?: string;
  
    /**
     * if the element is required
     */
    required?: boolean = false;
  
    /**
     * if element is disabled
     */
    disabled = false;
  
    /**
     * order the element by priority
     */
    order?: number;
  
    /**
     * default value
     */
    value!: T;

    formControl?: FormControl;
  
    /**
     * label of the element
     */
    label?: string;
    externalLabel?: string;
  
    readonly?: boolean=false;   
    hidden?: boolean=false;
    pipe?: Pipe;
    onChangeHandler: (...args: any[]) => void;
    
  
    constructor(data?: Partial<Field<any>>) {
      this.name = data?.name ?? '';
      this.fieldType = data?.fieldType;
      this.class = data?.class;
      this.parentClass = data?.parentClass;
      this.placeHolder = data?.placeHolder;
      this.required = data?.required;
      this.order = data?.order;
      this.label = data?.label;
      this.readonly = data?.readonly;
      this.hidden = data?.hidden;
      this.externalLabel = data?.externalLabel;
      this.parentStyle = data?.parentStyle;
      this.pipe = data?.pipe
    this.onChangeHandler = data?.onChangeHandler ?? (() => {});

    }
  }
  