import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hideCardNumber'
})
export class HideCardNumberPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    const visibleDigits = 4;
    const totalDigits = value.length;

    // Display the first and last four digits, hide the rest
    const visiblePart = value.substring(0, visibleDigits);
    const hiddenPart = '*'.repeat(totalDigits - visibleDigits * 2);
    const lastFourDigits = value.substring(totalDigits - visibleDigits);

    return `${visiblePart}${hiddenPart}${lastFourDigits}`;
  }
}
