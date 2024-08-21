import { Component, inject, input, OnInit } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { ToastService } from 'ngx-french-toast';
import { AuthorityName } from '../../../../core/models/auth/response/current-user.model';
import { ProductCategoryRequest } from '../../../../core/models/inventory/category/request/product-category-request.model';
import { ProductCategoryDto } from '../../../../core/models/inventory/category/response/product-category-dto.model';
import { TableContainerOptions } from '../../../../core/models/system/table-container-options.model';
import { TableHeader } from '../../../../core/models/system/table-header.model';
import { InventoryService } from '../../../../core/services/api/inventory.service';
import { AuthorityStorageService } from '../../../../core/services/application/authority-storage.service';
import {
  ConfirmDialogComponent,
  DialogAction,
} from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { FormContainerComponent } from '../../../../shared/components/form-container/form-container.component';
import { TableContainerComponent } from '../../../../shared/components/table-container/table-container.component';
import { getErrorMessage } from '../../../../shared/utils/formErrorHandler';
import {
  getClassFromDef,
  getValueFromDef,
} from '../../../../shared/utils/tableUtil';

const ANGULAR_MODULES = [RouterLink, ReactiveFormsModule];
const MATERIAL_MODULES = [
  MatTableModule,
  MatButtonModule,
  MatPaginatorModule,
  MatIconModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatTooltipModule,
  MatPaginatorModule,
  MatDialogModule,
];
const MY_COMPONENTS = [TableContainerComponent, FormContainerComponent];

@Component({
  selector: 'app-category-management',
  standalone: true,
  imports: [ANGULAR_MODULES, MATERIAL_MODULES, MY_COMPONENTS],
  templateUrl: './category-management.component.html',
  styleUrl: './category-management.component.scss',
})
export class CategoryManagementComponent implements OnInit {
  private readonly inventoryService = inject(InventoryService);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly toastService = inject(ToastService);
  protected readonly getErrorMessage = getErrorMessage;
  private readonly dialog = inject(MatDialog);
  protected readonly authorityStorage = inject(AuthorityStorageService);
  protected readonly getValueFromDef = getValueFromDef;
  protected readonly getClassFromDef = getClassFromDef;

  visible = input.required();

  categories: ProductCategoryDto[] = [];

  displayedColumns: TableHeader[] = [
    { columnDef: 'name', header: 'Nombre' },
    { columnDef: 'enabled', header: 'Estado' },
    { columnDef: 'actions', header: 'Acciones' },
  ];

  tableContainerOptions: TableContainerOptions = {
    title: 'Categorias',
    loading: false,
    paginator: {
      length: 0,
      pageIndex: 0,
    },
  };

  dialogAction = DialogAction;
  authorities = AuthorityName;

  filterForm = this.fb.group({
    searchValue: [''],
  });

  lastSearchValue: { searchValue?: string } = {};

  title = 'Nueva categoria';
  form = this.fb.group({
    id: [undefined as number | undefined],
    name: ['', Validators.required],
  });

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(name?: string, page?: number) {
    this.tableContainerOptions.loading = true;
    this.inventoryService.getAllCategories(name, page).subscribe((resp) => {
      setTimeout(() => {
        this.categories = resp.content;
        this.tableContainerOptions.loading = false;
      }, 300);
      this.tableContainerOptions.paginator.length = resp.totalItems;
      this.tableContainerOptions.paginator.pageIndex = resp.currentPage;
    });
  }

  getColums(): string[] {
    return this.displayedColumns.map((header) =>
      header.columnDef ? header.columnDef : ''
    );
  }

  onPageChange($event: PageEvent) {
    this.getCategories(this.lastSearchValue.searchValue, $event.pageIndex);
  }

  onFilter() {
    this.lastSearchValue = {
      searchValue: this.filterForm.get('searchValue')?.value,
    };
    this.getCategories(this.lastSearchValue.searchValue);
  }

  openConfirmDialog(category: ProductCategoryDto, action: DialogAction) {
    let data = {
      title: '',
      content: '',
    };

    switch (action) {
      case DialogAction.DELETE:
        data = {
          title: 'Confirmar eliminación permanente',
          content: `¿Está seguro que desea eliminar la categoría <strong class="text-red-700">${category.name}</strong>?
          <br> <br>
          <p class="text-center text-xl"><strong class="text-yellow-700 uppercase">Tenga en cuenta que se eliminarán tambien de forma permanente los productos asociados a esta categoría.</strong></p>
          <br> <br>
          <p class="text-center text-xl"><strong class="text-amber-700 uppercase">esta acción no se puede deshacer</strong></p>`,
        };
        break;
      case DialogAction.DISABLE:
        data = {
          title: 'Confirmar inhabilitación de categoría',
          content: `¿Está seguro que desea inhabilitar la categoría <strong class="text-zinc-700">${category.name}</strong>?`,
        };
        break;
      case DialogAction.ENABLE:
        data = {
          title: 'Confirmar habilitación de categoría',
          content: `¿Está seguro que desea habilitar la categoría <strong class="text-purple-700">${category.name}</strong>?`,
        };
        break;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        if (action === DialogAction.DELETE) {
          this.deleteCategory(category.id);
        } else if (action === DialogAction.ENABLE) {
          this.enableCategory(category.id);
        } else if (action === DialogAction.DISABLE) {
          this.disableCategory(category.id);
        }
      }
    });
  }
  private disableCategory(id: number) {
    this.inventoryService.disableCategory(id).subscribe(() => {
      this.toastService.success({
        title: 'Categoría deshabilitada exitosamente',
      });
      this.getCategories();
      this.reset();
    });
  }
  private enableCategory(id: number) {
    this.inventoryService.enableCategory(id).subscribe(() => {
      this.toastService.success({
        title: 'Categoría habilitada exitosamente',
      });
      this.getCategories();
      this.reset();
    });
  }
  private deleteCategory(id: number) {
    this.inventoryService.deleteCategory(id).subscribe(() => {
      this.toastService.success({
        title: 'Categoría eliminada exitosamente',
      });
      this.getCategories();
      this.reset();
    });
  }
  save() {
    if (this.form.valid) {
      const category: ProductCategoryRequest = {
        name: this.form.value.name!,
      };
      const id = this.form.value.id;
      if (id) this.update(id, category);
      else this.create(category);
    } else {
      this.form.markAllAsTouched();
    }
  }

  private create(category: ProductCategoryRequest) {
    this.inventoryService.createCategory(category).subscribe(() => {
      this.toastService.success({
        title: 'Categoría creada exitosamente',
      });
      this.getCategories();
      this.reset();
    });
  }

  private update(id: number, category: ProductCategoryRequest) {
    this.inventoryService.updateCategory(id, category).subscribe((resp) => {
      this.toastService.success({
        title: 'Categoría actualizada exitosamente',
      });
      this.getCategories();
      this.reset();
    });
  }

  setFormData(category?: ProductCategoryDto) {
    if (category) {
      this.form.patchValue(category);
      this.title = 'Editar categoría';
    } else {
      this.form.reset();
      this.title = 'Nueva categoría';
    }
  }

  reset() {
    this.filterForm.reset();
    this.form.reset();
  }
}
