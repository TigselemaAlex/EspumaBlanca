import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  contentChild,
  effect,
  inject,
  input,
  OnChanges,
  OnInit,
  output,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { FormContainerOptions } from '../../../core/models/system/form-container-options';
import { slideVertical } from '../../animations/slide-vertical-animation';
import { getErrorMessage } from '../../utils/formErrorHandler';
import { InputErrorMessageComponent } from '../input-error-message/input-error-message.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { PasswordModule } from 'primeng/password';

const SHARED_COMPONENTS = [InputErrorMessageComponent];

const PRIME_NG_MODULES = [
  DividerModule,
  CardModule,
  InputTextModule,
  InputMaskModule,
  FloatLabelModule,
  ButtonModule,
  InputMaskModule,
  InputTextareaModule,
  InputNumberModule,
  PasswordModule,
];
const ANGULAR_MODULES = [NgTemplateOutlet, ReactiveFormsModule, RouterLink];
@Component({
  selector: 'esp-form-container',
  standalone: true,
  imports: [PRIME_NG_MODULES, ANGULAR_MODULES, SHARED_COMPONENTS],
  templateUrl: './form-container.component.html',
  styleUrl: './form-container.component.scss',
  animations: [slideVertical],
})
export class FormContainerComponent implements OnInit, OnChanges {
  indicationTemplate = contentChild<TemplateRef<any>>('indication');

  protected readonly getErrorMessage = getErrorMessage;

  options = input.required<FormContainerOptions>();
  patchData = input<any>();
  onSave = output<any>();

  private readonly fb = inject(NonNullableFormBuilder);

  form!: FormGroup;

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['patchData']) {
      if (this.patchData()) {
        this.patchValues();
      } else {
        if (this.form) this.form.reset();
      }
    }
  }

  private buildForm(): void {
    const group: any = {};
    this.options().form.forEach((item) => {
      if (item.key) {
        group[item.key] = new FormControl(item.value, item.validators);
        if (item.required) {
          group[item.key].addValidators(Validators.required);
        }
      }
    });
    this.form = this.fb.group(group);
    if (this.options().formValidators) {
      this.form.addValidators(this.options().formValidators!);
    }
  }

  private patchValues() {
    this.form.patchValue(this.patchData());
  }

  validateAndSave() {
    if (this.form.valid) {
      const response = this.form.value;
      this.onSave.emit(response);
    } else
      Object.values(this.form.controls).forEach((control) => {
        if (control.invalid) control.markAsDirty();
      });
  }
}
