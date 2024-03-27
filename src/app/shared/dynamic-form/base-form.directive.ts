import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: 'base-form',
})
export class BaseFormDirective<T> {
  @Input() field!: T;

  /**
   * value to be used for two-way binding
   */
  @Input() value: any;

  @Input() hasErrors = false;
  @Input() isSubmitted = false;

  @Input() control!: AbstractControl;

  /**
   * clear event
   */
  @Output() clear = new EventEmitter<any>();
  /**
   * value change event
   */
  @Output() valueChange = new EventEmitter<any>();

  get val(): any {
    return this.value;
  }

  set val(val: any) {
    this.value = val;
    this.valueChange.emit(this.value);
  }
}
