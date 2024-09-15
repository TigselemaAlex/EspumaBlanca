import { Component } from '@angular/core';
import { BaseFormComponent } from '../../shared/components/base-form/base-form-component';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { RouterLink } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputErrorMessageComponent } from '../../shared/components/input-error-message/input-error-message.component';
import { slideVertical } from '../../shared/animations/slide-vertical-animation';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';
import { getErrorMessage } from '../../shared/utils/formErrorHandler';

const PRIME_NG_MODULES = [
  InputTextModule,
  FloatLabelModule,
  ButtonModule,
  MessagesModule,
];
const ANGULAR_MODULES = [ReactiveFormsModule, RouterLink];
const SHARED_COMPONENTS = [InputErrorMessageComponent];

@Component({
  selector: 'app-recovery-password',
  standalone: true,
  imports: [PRIME_NG_MODULES, ANGULAR_MODULES, SHARED_COMPONENTS],
  templateUrl: './recovery-password.component.html',
  styleUrl: './recovery-password.component.scss',
  animations: [slideVertical],
})
export class RecoveryPasswordComponent extends BaseFormComponent {
  override save(data: any): void {}
  override initForm(): void {}
  protected readonly getErrorMessage = getErrorMessage;
  messages: Message[] = [
    {
      severity: 'info',
      detail:
        'Introduzca su cédula para enviarle un correo con la contraseña de recuperación.',
    },
    {
      severity: 'warn',
      detail:
        'En caso de no poder restablecer su contraseña, por favor, póngase en contacto con el administrador.',
    },
  ];

  form = this.fb.group({
    ci: [
      '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
    ],
  });

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      Object.values(this.form.controls).forEach((control) => {
        if (control.invalid) control.markAsDirty();
      });
    }
  }
}
