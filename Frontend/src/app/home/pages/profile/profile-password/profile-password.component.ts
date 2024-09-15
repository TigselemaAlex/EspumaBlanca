import { Component, inject, OnInit } from '@angular/core';
import { FormContainerComponent } from '../../../../shared/components/form-container/form-container.component';
import { BaseFormComponent } from '../../../../shared/components/base-form/base-form-component';
import { Validators } from '@angular/forms';
import { AuthorityStorageService } from '../../../../core/services/application/authority-storage.service';
import { ProfileUpdatePasswordRequest } from '../../../../core/models/profile/request/profile-update-password-request.model';
import { ProfileService } from '../../../../core/services/api/profile.service';
import { passwordValidator } from '../../../../shared/utils/customValidators';

const SHARED_COMPONENTS = [FormContainerComponent];

@Component({
  selector: 'esp-profile-password',
  standalone: true,
  imports: [SHARED_COMPONENTS],
  templateUrl: './profile-password.component.html',
  styleUrl: './profile-password.component.scss',
})
export class ProfilePasswordComponent
  extends BaseFormComponent
  implements OnInit
{
  private readonly authorityStorage = inject(AuthorityStorageService);
  private readonly profileService = inject(ProfileService);

  ngOnInit(): void {
    this.initForm();
    this.authorityStorage.currentUser$.subscribe((resp) => {
      this.id = resp.id;
    });
  }

  override save(data: any): void {
    const request: ProfileUpdatePasswordRequest = data;
    if (this.id)
      this.profileService
        .updatePassword(this.id, request)
        .subscribe(() =>
          this.navigateToList('Contraseña actualizada exitosamente')
        );
  }
  override initForm(): void {
    this.options.form = [
      {
        key: 'password',
        validators: [Validators.minLength(6), Validators.maxLength(20)],
        label: 'Nueva contraseña',
        controlType: 'password',
        required: true,
        class: 'col-12 md:col-4',
      },
      {
        key: 'confirmPassword',
        validators: [Validators.minLength(6), Validators.maxLength(20)],
        label: 'Repita la contraseña',
        controlType: 'password',
        required: true,
        class: 'col-12 md:col-4',
      },
    ];

    this.options.cancelLink = '/home/profile/view';
    this.options.title = 'Cambio de contraseña';
    this.options.formValidators = [passwordValidator()];
  }
}
