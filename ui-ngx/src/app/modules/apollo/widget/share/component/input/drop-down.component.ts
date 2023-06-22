import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'my-dropdown',
  template: `
    <select [disabled]="disabled" [value]="value" (change)="onChange($event.target.value)">
      <option *ngFor="let option of options" [value]="option">{{option}}</option>
    </select>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    }
  ]
})
export class DropdownComponent implements ControlValueAccessor {
  options = ['Option 1', 'Option 2', 'Option 3'];
  value: any;
  disabled: boolean;
  onChange = (_) => {};
  onTouched = () => {};

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}
