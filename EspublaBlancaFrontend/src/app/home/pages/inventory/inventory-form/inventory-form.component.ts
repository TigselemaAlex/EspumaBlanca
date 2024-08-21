import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastService } from 'ngx-french-toast';
import { ProductCategoryDto } from '../../../../core/models/inventory/category/response/product-category-dto.model';
import { ProductRequest } from '../../../../core/models/inventory/product/request/product-request.model';
import { InventoryService } from '../../../../core/services/api/inventory.service';
import { FormContainerComponent } from '../../../../shared/components/form-container/form-container.component';
import { getErrorMessage } from '../../../../shared/utils/formErrorHandler';

import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Subject, takeUntil } from 'rxjs';
const MATERIAL_MODULES = [
  MatInputModule,
  MatButtonModule,
  MatFormFieldModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatIconModule,
  MatChipsModule,
];

const ANGULAR_MODULES = [ReactiveFormsModule, RouterLink];
const MY_COMPONENTS = [FormContainerComponent];

@Component({
  selector: 'app-inventory-form',
  standalone: true,
  imports: [MATERIAL_MODULES, ANGULAR_MODULES, MY_COMPONENTS],
  templateUrl: './inventory-form.component.html',
  styleUrl: './inventory-form.component.scss',
})
export class InventoryFormComponent implements OnInit, OnDestroy {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly inventoryService = inject(InventoryService);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly toastService = inject(ToastService);
  protected readonly getErrorMessage = getErrorMessage;
  protected _onDestroy = new Subject<void>();

  title = '';
  id?: number;

  searchValue = new FormControl('');
  categories: ProductCategoryDto[] = [];

  form = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    stock: [0, [Validators.required, Validators.min(0)]],
    minStock: [1, [Validators.required, Validators.min(1)]],
    category: [
      undefined as ProductCategoryDto | undefined,
      Validators.required,
    ],
  });

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.id = id;
        this.inventoryService.getProductById(id).subscribe((product) => {
          this.title = 'Editar producto';
          this.form.patchValue({
            ...product,
            category: product.category,
          });
        });
      } else {
        this.title = 'Crear producto';
      }
    });

    this.getEnabledCategories();

    this.searchValue.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe((value) => {
        if (value !== null) this.getEnabledCategories(value);
      });
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  getEnabledCategories(name?: string, page?: number) {
    this.inventoryService
      .getAllEnabledCategories(name, page)
      .subscribe((resp) => {
        const categories: ProductCategoryDto[] = resp.content;
        this.categories = categories;
      });
  }

  save() {
    if (this.form.valid) {
      const product: ProductRequest = {
        category: this.form.value.category!.id,
        minStock: this.form.value.minStock!,
        name: this.form.value.name!,
        description: this.form.value.description,
        stock: this.form.value.stock!,
      };
      if (this.id) this.update(product, this.id);
      else this.createNew(product);
    } else this.form.markAllAsTouched();
  }

  displayFn(category: ProductCategoryDto): string {
    return category && category.name ? category.name : '';
  }

  onSelectChange(event: MatAutocompleteSelectedEvent) {
    this.form.patchValue({ category: event.option.value });
  }

  private createNew(product: ProductRequest) {
    this.inventoryService.createProduct(product).subscribe(() => {
      this.navigateToList('Producto creado exitosamente');
    });
  }

  private update(product: ProductRequest, id: number) {
    this.inventoryService.updateProduct(id, product).subscribe(() => {
      this.navigateToList('Producto actualizado exitosamente');
    });
  }

  private navigateToList(title: string) {
    this.toastService.success({ title });
    this.router.navigateByUrl('/home/inventory/list');
  }
}
