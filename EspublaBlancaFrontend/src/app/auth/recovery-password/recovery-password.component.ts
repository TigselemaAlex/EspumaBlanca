import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { getErrorMessage } from '../../shared/utils/formErrorHandler';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-recovery-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    RouterLink,
    MatFormFieldModule,
    MatInput,
    MatIconModule,
  ],
  templateUrl: './recovery-password.component.html',
  styleUrl: './recovery-password.component.scss',
})
export class RecoveryPasswordComponent {
  private readonly fb = inject(FormBuilder);
  protected readonly getErrorMessage = getErrorMessage;

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
