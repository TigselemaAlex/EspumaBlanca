import { Component, inject, OnInit } from '@angular/core';
import { FormContainerComponent } from '../../../../shared/components/form-container/form-container.component';
import { BaseFormComponent } from '../../../../shared/components/base-form/base-form-component';
import { DealService } from '../../../../core/services/api/deal.service';
import { Validators } from '@angular/forms';
import { DealRequest } from '../../../../core/models/deals/request/deal-request.model';

const SHARED_COMPONENTS = [FormContainerComponent];

@Component({
  selector: 'esp-deal-form',
  standalone: true,
  imports: [SHARED_COMPONENTS],
  templateUrl: './deal-form.component.html',
  styleUrl: './deal-form.component.scss',
})
export class DealFormComponent extends BaseFormComponent implements OnInit {
  private readonly dealService = inject(DealService);

  ngOnInit(): void {
    this.initForm();
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.id = id;
        this.dealService.getById(id).subscribe((deal) => {
          this.options.title = 'Editar promoción';
          this.dataToPatch = deal;
        });
      }
    });
  }

  override initForm(): void {
    this.options.form = [
      {
        key: 'name',
        class: 'col-12 md:col-6',
        controlType: 'text',
        label: 'Nombre',
        placeholder: 'Ingrese el nombre',
        required: true,
      },
      {
        key: 'value',
        class: ' col-12 md:col-6',
        controlType: 'number',
        label: 'Valor',
        currency: 'USD',
        placeholder: 'Ingrese el valor',
        validators: [Validators.min(0)],
        required: true,
      },
    ];
    this.options.cancelLink = '/home/deals/list';
    this.options.title = 'Nueva promoción';
  }

  override save(data: any): void {
    const deal: DealRequest = data;
    if (this.id) this.update(this.id, deal);
    else this.create(deal);
  }

  private create(deal: DealRequest): void {
    this.dealService
      .create(deal)
      .subscribe(() => this.navigateToList('Promoción creada exitosamente'));
  }

  private update(id: number, deal: DealRequest): void {
    this.dealService
      .update(id, deal)
      .subscribe(() =>
        this.navigateToList('Promoción actualizada exitosamente')
      );
  }
}
