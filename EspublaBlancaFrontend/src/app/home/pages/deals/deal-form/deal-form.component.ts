import { Component, inject, OnInit } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormContainerComponent } from '../../../../shared/components/form-container/form-container.component';
import { ToastService } from 'ngx-french-toast';
import { InventoryService } from '../../../../core/services/api/inventory.service';
import { getErrorMessage } from '../../../../shared/utils/formErrorHandler';
import { DealService } from '../../../../core/services/api/deal.service';
import { DealRequest } from '../../../../core/models/deals/request/deal-request.model';

const MATERIAL_MODULES = [MatInputModule, MatButtonModule, MatFormFieldModule];

const ANGULAR_MODULES = [ReactiveFormsModule, RouterLink];
const MY_COMPONENTS = [FormContainerComponent];

@Component({
  selector: 'app-deal-form',
  standalone: true,
  imports: [MATERIAL_MODULES, ANGULAR_MODULES, MY_COMPONENTS],
  templateUrl: './deal-form.component.html',
  styleUrl: './deal-form.component.scss',
})
export class DealFormComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly dealService = inject(DealService);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly toastService = inject(ToastService);
  protected readonly getErrorMessage = getErrorMessage;

  title = '';
  id?: number;

  form = this.fb.group({
    name: ['', Validators.required],
    value: [
      undefined as number | undefined,
      [Validators.required, Validators.min(0)],
    ],
  });

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.id = id;
        this.dealService.getById(id).subscribe((deal) => {
          this.title = 'Editar promoción';
          this.form.patchValue(deal);
        });
      } else {
        this.title = 'Crear promoción';
      }
    });
  }

  save() {
    if (this.form.valid) {
      const deal: DealRequest = {
        name: this.form.value.name!,
        value: this.form.value.value!,
      };

      if (this.id) this.update(this.id, deal);
      else this.create(deal);
    } else this.form.markAllAsTouched();
  }

  private update(id: number, deal: DealRequest) {
    this.dealService.update(id, deal).subscribe(() => {
      this.navigateToList('Promoción actualizada exitosamente');
    });
  }

  private create(deal: DealRequest) {
    this.dealService.create(deal).subscribe(() => {
      this.navigateToList('Promoción creada exitosamente');
    });
  }

  private navigateToList(title: string) {
    this.toastService.success({ title });
    this.router.navigateByUrl('/home/deals/list');
  }
}
