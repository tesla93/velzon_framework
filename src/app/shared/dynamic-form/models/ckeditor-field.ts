import { Field } from './field';

export class CkEditorField extends Field<string> {
  override fieldType = 'ckeditor';

  constructor(data?: Partial<CkEditorField>) {
    super(data);
  }
}