import { Component, inject, OnInit } from '@angular/core';
import { FormContainerComponent } from '../../../../shared/components/form-container/form-container.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProfileService } from '../../../../core/services/api/profile.service';
import { ToastService } from 'ngx-french-toast';
import { getErrorMessage } from '../../../../shared/utils/formErrorHandler';
import { AuthorityStorageService } from '../../../../core/services/application/authority-storage.service';
import { ProfileRequest } from '../../../../core/models/profile/request/profile-request.model';

const MATERIAL_COMPONENTS = [MatButtonModule, MatFormField, MatInputModule];
const ANGULAR_MODULES = [ReactiveFormsModule, RouterLink];
const MY_COMPONENTS = [FormContainerComponent];

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [MY_COMPONENTS, MATERIAL_COMPONENTS, ANGULAR_MODULES],
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.scss',
})
export class ProfileFormComponent implements OnInit {
  private readonly profileService = inject(ProfileService);
  private readonly authorityStorage = inject(AuthorityStorageService);
  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);
  private readonly fb = inject(NonNullableFormBuilder);
  protected readonly getErrorMessage = getErrorMessage;

  title = 'Editar perfil';

  form = this.fb.group({
    id: [undefined as number | undefined],
    name: ['', Validators.required],
    lastname: ['', Validators.required],
    ci: [{ value: '', disabled: true }, Validators.required],
    email: ['', Validators.email],
    phone: [
      { value: '', disabled: true },
      [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
    ],
  });

  ngOnInit(): void {
    this.authorityStorage.currentUser$.subscribe((resp) => {
      const id = resp.id;
      if (id) {
        this.profileService.getProfile(id).subscribe((resp) => {
          this.form.patchValue(resp);
        });
      }
    });
  }

  save() {
    if (this.form.valid) {
      const request: ProfileRequest = {
        name: this.form.value.name!,
        lastname: this.form.value.lastname!,
        email: this.form.value.email,
      };
      this.profileService
        .update(this.form.value.id!, request)
        .subscribe((resp) => {
          this.toastService.success({
            title: 'Perfil actualizado exitosamente',
          });
          this.router.navigateByUrl('/home/profile/view');
        });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
