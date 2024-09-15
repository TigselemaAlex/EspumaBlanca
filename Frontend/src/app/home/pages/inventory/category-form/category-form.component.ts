import {
  Component,
  effect,
  inject,
  input,
  model,
  OnInit,
  output,
} from '@angular/core';
import { BaseFormComponent } from '../../../../shared/components/base-form/base-form-component';
import { FormContainerComponent } from '../../../../shared/components/form-container/form-container.component';
import { ProductCategoryRequest } from '../../../../core/models/inventory/category/request/product-category-request.model';
import { InventoryService } from '../../../../core/services/api/inventory.service';

const SHARED_COMPONENTS = [FormContainerComponent];

@Component({
  selector: 'esp-category-form',
  standalone: true,
  imports: [SHARED_COMPONENTS],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss',
})
export class CategoryFormComponent extends BaseFormComponent implements OnInit {
  private readonly inventoyService = inject(InventoryService);

  constructor() {
    super();
    effect(() => {
      if (this.category()) {
        this.options.title = 'Editar categoría';
        this.id = this.category();
        if (this.id) {
          this.inventoyService.getCategoryById(this.id).subscribe((resp) => {
            this.dataToPatch = resp;
          });
        }
      } else {
        this.options.title = 'Nueva categoría';
        this.dataToPatch = undefined;
        this.id = undefined;
      }
    });
  }
  visible = model<boolean>(false);
  category = model.required<number>();
  reload = output<void>();

  ngOnInit(): void {
    this.initForm();
  }

  override save(data: any): void {
    const request: ProductCategoryRequest = data;
    if (this.id) this.update(this.id, request);
    else this.create(request);
  }
  override initForm(): void {
    this.options.form = [
      {
        key: 'name',
        controlType: 'text',
        label: 'Nombre',
        placeholder: 'Ingrese el nombre',
        required: true,
      },
    ];
    this.options.title = 'Nueva categoría';
    this.options.cancelAction = () => {
      this.visible.set(false);
    };
  }

  private create(category: ProductCategoryRequest) {
    this.inventoyService.createCategory(category).subscribe(() => {
      this.navigateToList('Categoría creada exitosamente');
      this.reloadAndReset();
    });
  }

  private update(id: number, category: ProductCategoryRequest) {
    this.inventoyService.updateCategory(id, category).subscribe(() => {
      this.navigateToList('Categoría actualizada exitosamente');
      this.reloadAndReset();
    });
  }

  private reloadAndReset(): void {
    this.reload.emit();
    this.visible.set(false);
  }
}
