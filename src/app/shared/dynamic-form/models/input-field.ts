import { InputValidationType } from '@shared/enums/input-validation-type';
import { Field } from './field';

export class InputField extends Field<string> {
  override fieldType = 'input';
  /**
    * element type such as if the input is text or number
    */
  type?: string = 'text';
  maxlength = 100;
  hasShowButton?: boolean = false;
  mask?: string;
  dateFormat = 'yyyy-MM-dd'
  onKeyUp: (...args: any[]) => void;
  onInput: (...args: any[]) => void;
  validationType?: InputValidationType = InputValidationType.All
  constructor(data?: Partial<InputField>) {
    super(data);
    this.validationType = data?.validationType ?? InputValidationType.All
    this.maxlength = data?.maxlength ?? 100;
    this.type = data?.type;
    this.hasShowButton = data?.hasShowButton
    this.mask = data?.mask;
    this.dateFormat = data?.dateFormat ?? 'yyyy-MM-dd';
    this.onKeyUp = data?.onKeyUp ?? (() => { })
    this.onInput = data?.onInput ?? (() => { })
  }
}