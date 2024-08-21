import { Component, OnInit, inject } from '@angular/core';
import { FormContainerComponent } from '../../../../shared/components/form-container/form-container.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ClientService } from '../../../../core/services/api/client.service';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { getErrorMessage } from '../../../../shared/utils/formErrorHandler';
import { ClientRequest } from '../../../../core/models/client/request/client-request.model';
import { ToastService } from 'ngx-french-toast';

const MATERIAL_MODULES = [MatInputModule, MatButtonModule, MatFormFieldModule];
const ANGULAR_MODULES = [ReactiveFormsModule, RouterLink];
const MY_COMPONENTS = [FormContainerComponent];

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [MATERIAL_MODULES, ANGULAR_MODULES, MY_COMPONENTS],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss',
})
export class ClientFormComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly clientService = inject(ClientService);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly toastService = inject(ToastService);
  protected readonly getErrorMessage = getErrorMessage;

  title = '';
  id?: number;

  form = this.fb.group({
    name: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    address: [''],
    city: [''],
    ci: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        /* ecuadorianIdValidator(), */
      ],
    ],
  });

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.id = id;
        this.clientService.getById(id).subscribe((client) => {
          this.title = 'Editar cliente';
          this.form.patchValue(client);
        });
      } else {
        this.title = 'Crear cliente';
      }
    });
  }

  save() {
    if (this.form.valid) {
      const client: ClientRequest = {
        name: this.form.value.name!,
        lastname: this.form.value.lastname!,
        email: this.form.value.email!,
        phone: this.form.value.phone!,
        address: this.form.value.address || undefined,
        city: this.form.value.city || undefined,
        ci: this.form.value.ci!,
      };
      if (this.id) this.update(client, this.id);
      else this.createNew(client);
    } else this.form.markAllAsTouched();
  }

  private createNew(client: ClientRequest) {
    this.clientService.createNew(client).subscribe(() => {
      this.navigateToList('Cliente creado exitosamente');
    });
  }

  private update(client: ClientRequest, id: number) {
    this.clientService.update(id, client).subscribe(() => {
      this.navigateToList('Cliente actualizado extitosamente');
    });
  }

  private navigateToList(title: string) {
    this.toastService.success({ title });
    this.router.navigateByUrl('/home/inventory/list');
  }
}
