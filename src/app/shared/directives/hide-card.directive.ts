// password-toggle.directive.ts
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[passwordToggle]',
})
export class PasswordToggleDirective {
  constructor(private el: ElementRef) {}

  @HostListener('focus') onFocus() {
    this.togglePasswordVisibility(true);
  }

  @HostListener('blur') onBlur() {
    this.togglePasswordVisibility(false);
  }

  private togglePasswordVisibility(showPassword: boolean): void {
    const inputEl: HTMLInputElement = this.el.nativeElement;
    inputEl.type = showPassword ? 'text' : 'password';
  }
}
