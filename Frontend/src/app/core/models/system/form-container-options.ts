import { ValidatorFn } from '@angular/forms';

export interface FormContainerOptions {
  title?: string;
  cancelLink?: string;
  form: FormItem[];
  formValidators?: ValidatorFn[];
  cancelAction?: () => void;
}

export interface FormItem {
  value?: any;
  key?: any;
  label?: string;
  validators?: ValidatorFn[];
  required?: boolean;
  class?: string;
  readonly?: boolean;
  placeholder?: string;
  controlType?:
    | 'text'
    | 'number'
    | 'email'
    | 'date'
    | 'dropdown'
    | 'list'
    | 'textArea'
    | 'mask'
    | 'password';
  options?: { key: string; value: string }[];
  mask?: string;
  currency?: string;
}
