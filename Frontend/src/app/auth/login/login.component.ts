import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthLoginRequest } from '../../core/models/auth/request/auth-login-request.model';
import { slideVertical } from '../../shared/animations/slide-vertical-animation';
import { BaseFormComponent } from '../../shared/components/base-form/base-form-component';
import { InputErrorMessageComponent } from '../../shared/components/input-error-message/input-error-message.component';
import { AuthService } from './../../core/services/api/auth.service';
import { getErrorMessage } from '../../shared/utils/formErrorHandler';

const PRIME_NG_MODULES = [
  FloatLabelModule,
  InputTextModule,
  PasswordModule,
  ButtonModule,
];
const ANGULAR_MODULES = [ReactiveFormsModule, RouterLink];
const SHARED_COMPONENTS = [InputErrorMessageComponent];

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ANGULAR_MODULES, PRIME_NG_MODULES, SHARED_COMPONENTS],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [slideVertical],
})
export class LoginComponent extends BaseFormComponent {
  private readonly authService = inject(AuthService);
  protected readonly getErrorMessage = getErrorMessage;
  hidePassword = signal(true);

  form = this.fb.group({
    ci: [
      '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
    ],
    password: [
      undefined as undefined | string,
      [Validators.required, Validators.minLength(6), Validators.maxLength(20)],
    ],
  });
  override save(data: any): void {}
  override initForm(): void {}
  onSubmit() {
    if (this.form.valid) {
      const request: AuthLoginRequest = {
        ci: this.form.value.ci!,
        password: this.form.value.password!,
      };

      this.authService.login(request).subscribe(() => {
        this.router.navigate(['/home']);
      });
    } else {
      Object.values(this.form.controls).forEach((control) => {
        if (control.invalid) control.markAsDirty();
      });
    }
  }
}
