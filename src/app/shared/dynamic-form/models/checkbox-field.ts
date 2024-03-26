import { Field } from './field';

export class CheckboxField extends Field<boolean> {

  constructor(data?: Partial<CheckboxField>) {
    super(data);

    this.fieldType = data?.fieldType ?? 'checkbox';
  }
}