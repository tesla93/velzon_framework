
import { Field } from './field';

export class SelectField extends Field<any> {
  override fieldType = 'select';
  selectListItem!: any[]
  searchable!: boolean;
  clearable!: boolean;
  multiple!: boolean;
  selectSpinner!: boolean;
  bindLabel!: string;
  bindValue!: string;
  iconUrl!: string;


  constructor(data?: Partial<SelectField>) {
    super(data);
    this.selectListItem = data?.selectListItem ?? [];
    this.searchable = data?.searchable ?? false;
    this.clearable = data?.clearable ?? true;
    this.multiple = data?.multiple ?? false;
    this.selectSpinner = data?.selectSpinner ?? false;
    this.bindLabel = data?.bindLabel ?? '';
    this.bindValue = data?.bindValue ?? '';
    this.iconUrl = data?.iconUrl ?? '';

  }
}