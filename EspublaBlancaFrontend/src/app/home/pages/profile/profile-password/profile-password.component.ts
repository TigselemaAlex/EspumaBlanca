import { Component, inject, OnInit, signal } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { FormContainerComponent } from '../../../../shared/components/form-container/form-container.component';
import { ProfileService } from '../../../../core/services/api/profile.service';
import { ToastService } from 'ngx-french-toast';
import { getErrorMessage } from '../../../../shared/utils/formErrorHandler';
import { passwordValidator } from '../../../../shared/utils/customValidators';
import { MatIconModule } from '@angular/material/icon';
import { ProfileUpdatePasswordRequest } from '../../../../core/models/profile/request/profile-update-password-request.model';
import { AuthorityStorageService } from '../../../../core/services/application/authority-storage.service';

const MATERIAL_COMPONENTS = [
  MatButtonModule,
  MatFormField,
  MatInputModule,
  MatIconModule,
];
const ANGULAR_MODULES = [ReactiveFormsModule, RouterLink];
const MY_COMPONENTS = [FormContainerComponent];

@Component({
  selector: 'app-profile-password',
  standalone: true,
  imports: [MATERIAL_COMPONENTS, ANGULAR_MODULES, MY_COMPONENTS],
  templateUrl: './profile-password.component.html',
  styleUrl: './profile-password.component.scss',
})
export class ProfilePasswordComponent implements OnInit {
  private readonly profileService = inject(ProfileService);
  private readonly toastService = inject(ToastService);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly authorityStorage = inject(AuthorityStorageService);
  private readonly router = inject(Router);
  protected readonly getErrorMessage = getErrorMessage;

  hidePassword = signal(true);

  title = 'Cambio de contraseña';

  id!: number;

  form = this.fb.group(
    {
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
    },
    {
      validators: passwordValidator(),
    }
  );

  ngOnInit(): void {
    this.authorityStorage.currentUser$.subscribe((resp) => {
      const id = resp.id;
      if (id) {
        this.id = id;
      }
    });
  }

  save() {
    if (this.form.valid) {
      const request: ProfileUpdatePasswordRequest = {
        password: this.form.value.password!,
      };
      this.profileService.updatePassword(this.id, request).subscribe(() => {
        this.toastService.success({
          title: 'Contraseña actualizada exitosamente',
        });
        this.router.navigateByUrl('/home/profile/view');
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
