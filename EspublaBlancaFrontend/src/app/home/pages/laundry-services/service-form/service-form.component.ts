import { Component, inject, OnInit } from '@angular/core';
import { LaundryServiceService } from '../../../../core/services/api/laundry-service.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  ReactiveFormsModule,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToastService } from 'ngx-french-toast';
import { FormContainerComponent } from '../../../../shared/components/form-container/form-container.component';
import { getErrorMessage } from '../../../../shared/utils/formErrorHandler';
import { LaundryServiceRequest } from '../../../../core/models/laundry_service/request/laundry-service-request.model';

const MATERIAL_MODULES = [MatInputModule, MatButtonModule, MatFormFieldModule];
const ANGULAR_MODULES = [ReactiveFormsModule, RouterLink];
const MY_COMPONENTS = [FormContainerComponent];

@Component({
  selector: 'app-service-form',
  standalone: true,
  imports: [MATERIAL_MODULES, ANGULAR_MODULES, MY_COMPONENTS],
  templateUrl: './service-form.component.html',
  styleUrl: './service-form.component.scss',
})
export class ServiceFormComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly laundryServicesService = inject(LaundryServiceService);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly toastService = inject(ToastService);
  protected readonly getErrorMessage = getErrorMessage;

  title = '';
  id?: number;

  form = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    price: [0.0, [Validators.required]],
    unitType: [''],
  });

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.id = id;
        this.laundryServicesService.getById(id).subscribe((service) => {
          this.title = 'Editar servicio';
          this.form.patchValue(service);
        });
      } else {
        this.title = 'Crear servicio';
      }
    });
  }

  save() {
    if (this.form.valid) {
      const service: LaundryServiceRequest = {
        name: this.form.value.name!,
        description: this.form.value.description,
        price: this.form.value.price!,
        unitType: this.form.value.unitType,
      };

      if (this.id) {
        this.update(service, this.id);
      } else {
        this.create(service);
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  private create(service: LaundryServiceRequest) {
    this.laundryServicesService.create(service).subscribe(() => {
      this.toastService.success({
        title: 'Servicio creado exitosamente',
      });
      this.router.navigateByUrl('/home/services');
    });
  }

  private update(service: LaundryServiceRequest, id: number) {
    this.laundryServicesService.update(id, service).subscribe(() => {
      this.toastService.success({
        title: 'Servicio creado exitosamente',
      });
      this.router.navigateByUrl('/home/services');
    });
  }
}
