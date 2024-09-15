import { Component, inject, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { ClientRequest } from '../../../../core/models/client/request/client-request.model';
import { ClientService } from '../../../../core/services/api/client.service';
import { BaseFormComponent } from '../../../../shared/components/base-form/base-form-component';
import { FormContainerComponent } from '../../../../shared/components/form-container/form-container.component';
import { slideVertical } from './../../../../shared/animations/slide-vertical-animation';

const SHARED_COMPONENTS = [FormContainerComponent];
const PRIME_NG_MODULES = [
  ButtonModule,
  InputTextModule,
  FloatLabelModule,
  InputMaskModule,
];

@Component({
  selector: 'esp-client-form',
  standalone: true,
  imports: [SHARED_COMPONENTS, PRIME_NG_MODULES],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss',
  animations: [slideVertical],
})
export class ClientFormComponent extends BaseFormComponent implements OnInit {
  private readonly clientService = inject(ClientService);

  ngOnInit(): void {
    this.initForm();
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.id = id;
        this.clientService.getById(id).subscribe((client) => {
          this.options.title = 'Editar cliente';
          this.dataToPatch = client;
        });
      }
    });
  }

  override initForm(): void {
    this.options.form = [
      {
        key: 'ci',
        controlType: 'text',
        class: 'col-12 md:col-4',
        validators: [Validators.minLength(10), Validators.maxLength(10)],
        required: true,
        placeholder: 'Ingrese la cédula',
        label: 'Cédula',
      },
      {
        class: 'md:col-8',
      },
      {
        key: 'name',
        controlType: 'text',
        class: 'col-12 md:col-6',
        placeholder: 'Ingrese el/los nombre(s)',
        required: true,
        label: 'Nombre(s)',
      },
      {
        key: 'lastname',
        controlType: 'text',
        class: 'col-12 md:col-6',
        placeholder: 'Ingrese el/los apellido(s)',
        required: true,
        label: 'Apellido(s)',
      },
      {
        key: 'email',
        controlType: 'email',
        class: 'col-12 md:col-6',
        validators: [Validators.email],
        required: true,
        placeholder: 'Ingrese el email',
        label: 'Email',
      },
      {
        key: 'phone',
        controlType: 'mask',
        class: 'col-12 md:col-6',
        validators: [Validators.pattern(/^[0-9]{10}$/)],
        required: true,
        mask: '9 9 9 9 9 9 9 9 9 9',
        label: 'Teléfono',
      },
      {
        key: 'address',
        controlType: 'text',
        class: 'col-12 md:col-6',
        placeholder: 'Ingrese la dirección',
        label: 'Dirección',
      },
      {
        key: 'city',
        controlType: 'text',
        class: 'col-12 md:col-6',
        placeholder: 'Ingrese la ciudad',
        label: 'Ciudad',
      },
    ];
    this.options.cancelLink = '/home/clients/list';
    this.options.title = 'Crear cliente';
  }

  override save(data: ClientRequest): void {
    const client: ClientRequest = data;
    if (this.id) this.update(client, this.id);
    else this.create(client);
  }

  private create(client: ClientRequest): void {
    this.clientService.createNew(client).subscribe(() => {
      this.navigateToList('Cliente creado exitosamente');
    });
  }

  private update(client: ClientRequest, id: number): void {
    this.clientService.update(id, client).subscribe(() => {
      this.navigateToList('Cliente actualizado extitosamente');
    });
  }
}
