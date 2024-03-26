import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Field } from './models/field';
import { FormGroup } from '@angular/forms';
import { ButtonItems } from '../generic-buttons/classes/button-items';
import { UtilsService } from '../utils/utils-service';
@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
})
export class DynamicFormComponent implements OnInit, OnChanges {

  @Input() fields!: Field<any>[];
  @Input() data!: any;
  @Input() customForm!: FormGroup;
  @Input() buttons!: ButtonItems[];

  @Input() submitted = false;
  @Input() showSpinner = false;
  @Output() valueChanged = new EventEmitter<any>();
  @Output() submitEvent = new EventEmitter<any>();
  @Output() changeForm = new EventEmitter<any>();

  get customFormControls() { return this.customForm.controls; }

  constructor(public utilsService: UtilsService) {
  }

  ngOnInit(): void {
   
    if (this.changeForm.observed) {
      this.customForm.valueChanges.subscribe(() => {
        this.changeForm.emit(this.customForm.getRawValue());
      })
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fields']) {
      this.fields = this.fields?.filter(x => !x.hidden)
    }
  }

 

  clear(field: any) {
    this.data[field.fieldName] = null;
  }
  valueChange(field: any, value: any) {
    this.valueChanged.emit({ field, value });
  }

  onSubmitEvent(): void {
    this.submitted = true;
    this.submitEvent.emit(this.customForm);
  }
}
