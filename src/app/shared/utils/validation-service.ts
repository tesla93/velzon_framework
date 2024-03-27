import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  maskCardValidator(mask: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const actualValue = control.value;
      const actualValueWithoutSpaces = actualValue.replace(/\s/g, '');
      if (!mask.test(actualValueWithoutSpaces)) {
        return { 'maskError': { actualValue } };
      }

      return null;
    };
  }
  maxValueValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const maxValue = 100000.00;
      const input = typeof control.value === 'string' ? parseFloat(control.value.replace(/,/g, '')) : control.value || 0;
      return input > maxValue ? { 'maxValueExceeded': true } : null;
    };
  }
  formatNumberWithZerosAndCommas(number: number): string {
    const formattedNumber = number.toFixed(2); // Ensures two decimal places, even if zero
    return formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  conditionalMaxValueValidator(option: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let maxValue = 0;
      if (option === 'percentage') {
        maxValue = 100.00;
      } else if (option === 'regular') {
        maxValue = 9999.99;
      }

      const input = typeof control.value === 'string' ? parseFloat(control.value.replace(/,/g, '')) : control.value || 0;
      return input > maxValue ? { 'maxValueExceeded': true } : null;
    };
  }
}