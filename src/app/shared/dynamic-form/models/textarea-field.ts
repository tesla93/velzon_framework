import { Field } from './field';

export class TextAreaField extends Field<string> {
  override fieldType = 'textarea';
  rows!: number;

  constructor(data?: Partial<TextAreaField>) {
    super(data);
    this.rows = data?.rows ?? 2;
  }
}