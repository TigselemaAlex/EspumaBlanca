import { AuthService } from './../../../../core/services/api/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import { ProfileRequest } from '../../../../core/models/profile/request/profile-request.model';
import { AuthorityStorageService } from '../../../../core/services/application/authority-storage.service';
import { BaseFormComponent } from '../../../../shared/components/base-form/base-form-component';
import { FormContainerComponent } from '../../../../shared/components/form-container/form-container.component';
import { ProfileService } from './../../../../core/services/api/profile.service';
import { switchMap, tap } from 'rxjs';

const SHARED_COMPONENTS = [FormContainerComponent];

@Component({
  selector: 'esp-profile-form',
  standalone: true,
  imports: [SHARED_COMPONENTS],
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.scss',
})
export class ProfileFormComponent extends BaseFormComponent implements OnInit {
  private readonly profileService = inject(ProfileService);
  private readonly authorityStorage = inject(AuthorityStorageService);
  private readonly authService = inject(AuthService);

  ngOnInit(): void {
    this.initForm();
    this.authorityStorage.currentUser$.subscribe((resp) => {
      this.id = resp.id;
      if (this.id) {
        this.profileService.getProfile(this.id).subscribe((resp) => {
          this.dataToPatch = resp;
        });
      }
    });
  }

  override save(data: any): void {
    const request: ProfileRequest = data;
    if (this.id)
      this.profileService
        .update(this.id, request)
        .pipe(
          tap(() => this.navigateToList('Perfil actualizado exitosamente')),
          switchMap(() => this.authService.currentUser())
        )
        .subscribe();
  }

  override initForm(): void {
    this.options.form = [
      {
        key: 'ci',
        required: true,
        controlType: 'text',
        class: 'col-12 md:col-4',
        label: 'Cédula',
        placeholder: 'Ingrese la cédula',
        readonly: true,
      },
      {
        class: 'md:col-8',
      },
      {
        key: 'name',
        required: true,
        controlType: 'text',
        class: 'col-12 md:col-6',
        label: 'Nombre(s)',
        placeholder: 'Ingrese el/los nombre(s)',
      },
      {
        key: 'lastname',
        required: true,
        controlType: 'text',
        class: 'col-12 md:col-6',
        label: 'Apellido(s)',
        placeholder: 'Ingrese el/los apellido(s)',
      },
      {
        key: 'email',
        required: true,
        controlType: 'email',
        class: 'col-12 md:col-6',
        label: 'Email',
        placeholder: 'Ingrese el email',
        readonly: true,
      },
      {
        key: 'phone',
        required: true,
        controlType: 'mask',
        mask: '9 9 9 9 9 9 9 9 9 9',
        class: 'col-12 md:col-6',
        label: 'Teléfono',
        placeholder: 'Ingrese el número de teléfono',
      },
    ];
    this.options.title = 'Editar perfil';
    this.options.cancelLink = '/home/profile/view';
  }
}
