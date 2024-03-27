import { Field } from './field';

export class AttachmentField extends Field<any> {
  override fieldType = 'attachment';
  removable = false;
  expandable = false;
  files: File[] = [];
  onRemoveHandler: (...args: any[]) => void;

  constructor(data?: Partial<AttachmentField>) {
    super(data);

    this.removable = data?.removable ?? false;
    this.expandable = data?.expandable ?? false;
    this.onRemoveHandler = data?.onRemoveHandler ?? (() => {});
    this.files = data?.files ?? [];

  }
}