import { Component, inject, OnInit } from '@angular/core';
import { LaundryServiceService } from '../../../../core/services/api/laundry-service.service';
import { BaseFormComponent } from '../../../../shared/components/base-form/base-form-component';
import { FormContainerComponent } from '../../../../shared/components/form-container/form-container.component';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { LaundryServiceRequest } from '../../../../core/models/laundry_service/request/laundry-service-request.model';
import { Validators } from '@angular/forms';

const SHARED_COMPONENTS = [FormContainerComponent];
const PRIME_NG_MODULES = [
  ButtonModule,
  InputTextModule,
  FloatLabelModule,
  InputMaskModule,
];
@Component({
  selector: 'esp-service-form',
  standalone: true,
  imports: [SHARED_COMPONENTS, PRIME_NG_MODULES],
  templateUrl: './service-form.component.html',
  styleUrl: './service-form.component.scss',
})
export class ServiceFormComponent extends BaseFormComponent implements OnInit {
  private readonly laundryServicesService = inject(LaundryServiceService);

  ngOnInit(): void {
    this.initForm();
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.id = id;
        this.laundryServicesService.getById(id).subscribe((service) => {
          this.options.title = 'Editar servicio';
          this.dataToPatch = service;
        });
      }
    });
  }

  override initForm(): void {
    this.options.form = [
      {
        key: 'name',
        controlType: 'text',
        required: true,
        class: 'col-12 md:col-6',
        placeholder: 'Ingrese el nombre',
        label: 'Nombre',
      },
      {
        key: 'price',
        controlType: 'number',
        required: true,
        class: 'col-6 md:col-3',
        label: 'Precio',
        currency: 'USD',
        validators: [Validators.min(0)],
      },
      {
        key: 'unitType',
        controlType: 'text',
        class: 'col-6 md:col-3',
        label: 'Tipo de unidad',
      },
      {
        key: 'description',
        controlType: 'textArea',
        class: 'col-12',
        placeholder: 'Ingrese la descripción',
        label: 'Descripción',
      },
    ];
    this.options.cancelLink = '/home/services/list';
    this.options.title = 'Crear servicio';
  }

  save(data: LaundryServiceRequest) {
    const service: LaundryServiceRequest = data;
    if (this.id) this.update(service, this.id);
    else this.create(service);
  }

  private create(service: LaundryServiceRequest): void {
    this.laundryServicesService.create(service).subscribe(() => {
      this.navigateToList('Servicio creado exitosamente');
    });
  }

  private update(service: LaundryServiceRequest, id: number): void {
    this.laundryServicesService.update(id, service).subscribe(() => {
      this.navigateToList('Servicio actualizado exitosamente');
    });
  }
}
