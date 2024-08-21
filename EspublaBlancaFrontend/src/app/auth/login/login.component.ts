import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthLoginRequest } from '../../core/models/auth/request/auth-login-request.model';
import { AuthService } from '../../core/services/api/auth.service';
import { getErrorMessage } from '../../shared/utils/formErrorHandler';

const ANGULAR_MODULES = [ReactiveFormsModule, RouterLink];
const MATERIAl_MODULES = [
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
];

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ANGULAR_MODULES, MATERIAl_MODULES],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  protected readonly getErrorMessage = getErrorMessage;

  hidePassword = signal(true);

  form = this.fb.group({
    ci: [
      '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
    ],
    password: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(20)],
    ],
  });

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
