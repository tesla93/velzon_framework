import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNoNumbers]'
})
export class NoNumbersDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: any): void {
    const initialValue = this.el.nativeElement.value;
    this.el.nativeElement.value = initialValue.replace(/[^A-Za-z ]/g, '');

    if (initialValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}