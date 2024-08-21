import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
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
import { ProductCategoryDto } from '../../../../core/models/inventory/category/response/product-category-dto.model';
import { ProductDto } from '../../../../core/models/inventory/product/response/product-dto.model';
import { TableContainerOptions } from '../../../../core/models/system/table-container-options.model';
import { TableHeader } from '../../../../core/models/system/table-header.model';
import { InventoryService } from '../../../../core/services/api/inventory.service';
import { AuthorityStorageService } from '../../../../core/services/application/authority-storage.service';
import {
  ConfirmDialogComponent,
  DialogAction,
} from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { TableContainerComponent } from '../../../../shared/components/table-container/table-container.component';
import {
  getClassFromDef,
  getValueFromDef,
} from '../../../../shared/utils/tableUtil';
import { CategoryManagementComponent } from '../category-management/category-management.component';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { Subject, takeUntil } from 'rxjs';

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
  MatAutocompleteModule,
  MatChipsModule,
];
const MY_COMPONENTS = [TableContainerComponent];

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  imports: [ANGULAR_MODULES, MATERIAL_MODULES, MY_COMPONENTS],
  templateUrl: './inventory-list.component.html',
  styleUrl: './inventory-list.component.scss',
})
export class InventoryListComponent implements OnInit, OnDestroy {
  private readonly inventoryService = inject(InventoryService);
  private readonly dialog = inject(MatDialog);
  private readonly toastService = inject(ToastService);
  private readonly fb = inject(NonNullableFormBuilder);
  protected readonly authorityStorage = inject(AuthorityStorageService);
  protected readonly getValueFromDef = getValueFromDef;
  protected readonly getClassFromDef = getClassFromDef;
  protected _onDestroy = new Subject<void>();

  displayedColumns: TableHeader[] = [
    { columnDef: 'name', header: 'Nombre' },
    { columnDef: 'description', header: 'Descripción' },
    { columnDef: 'stock', header: 'Existencias' },
    { columnDef: 'minStock', header: 'Min. existencias' },
    { columnDef: 'category', header: 'Categoría' },
    { columnDef: 'enabled', header: 'Estado' },
    { columnDef: 'actions', header: 'Acciones' },
  ];

  products: ProductDto[] = [];

  tableContainerOptions: TableContainerOptions = {
    title: 'Productos',
    loading: false,
    newButton: {
      label: 'Nuevo producto',
      link: '/home/inventory/new',
    },
    paginator: {
      length: 0,
      pageIndex: 0,
    },
  };

  dialogAction = DialogAction;
  authorities = AuthorityName;

  filterForm = this.fb.group({
    searchValue: [''],
    category: [undefined as ProductCategoryDto | undefined],
  });

  categoryNameSearch = new FormControl('');
  categories: ProductCategoryDto[] = [];
  lastSearchValue: { searchValue?: string; category?: number } = {};

  ngOnInit(): void {
    this.getProducts();
    this.getEnabledCategories();

    this.categoryNameSearch.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe((value) => {
        if (value !== null) this.getEnabledCategories(value);
      });
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  getProducts(name?: string, category?: number, page?: number) {
    this.tableContainerOptions.loading = true;
    this.inventoryService
      .getAllProducts(name, category, page)
      .subscribe((resp) => {
        setTimeout(() => {
          this.tableContainerOptions.loading = false;
          this.products = resp.content;
        }, 300);
        this.tableContainerOptions.paginator = {
          length: resp.totalItems,
          pageIndex: resp.currentPage,
        };
      });
  }

  getEnabledCategories(name?: string, page?: number) {
    this.inventoryService
      .getAllEnabledCategories(name, page)
      .subscribe((resp) => {
        const categories: ProductCategoryDto[] = resp.content;
        this.categories = categories;
      });
  }

  getColums(): string[] {
    return this.displayedColumns.map((header) =>
      header.columnDef ? header.columnDef : ''
    );
  }

  displayFn(category: ProductCategoryDto): string {
    return category && category.name ? category.name : '';
  }

  onSelectChange(event: MatAutocompleteSelectedEvent) {
    this.filterForm.patchValue({ category: event.option.value });
  }

  onPageChange($event: PageEvent) {
    this.getProducts(
      this.lastSearchValue.searchValue,
      this.lastSearchValue.category,
      $event.pageIndex
    );
  }

  onFilter() {
    this.lastSearchValue = {
      searchValue: this.filterForm.get('searchValue')?.value,
      category: this.filterForm.get('category')?.value?.id,
    };

    console.log(this.lastSearchValue);
    this.getProducts(
      this.lastSearchValue.searchValue,
      this.lastSearchValue.category
    );
  }

  openCategoryManagementDialog() {
    const categoryManagementDialogRef = this.dialog.open(
      CategoryManagementComponent,
      {
        maxWidth: '95vw',
        panelClass: 'w-full',
        position: {
          top: '24px',
        },
      }
    );
    categoryManagementDialogRef.afterClosed().subscribe(() => {
      this.getProducts();
      this.filterForm.reset();
      this.lastSearchValue = {
        searchValue: '',
        category: undefined,
      };
    });
  }
  openConfirmDialog(product: ProductDto, action: DialogAction) {
    let data = {
      title: '',
      content: '',
    };

    switch (action) {
      case DialogAction.DELETE:
        data = {
          title: 'Confirmar eliminación permanente',
          content: `¿Está seguro que desea eliminar el producto <strong class="text-red-700">${product.name}</strong>? <br> <br> <p class="text-center text-xl"><strong class="text-amber-700 uppercase">esta acción no se puede deshacer</strong></p>`,
        };
        break;
      case DialogAction.DISABLE:
        data = {
          title: 'Confirmar inhabilitación de cliente',
          content: `¿Está seguro que desea inhabilitar el producto <strong class="text-zinc-700">${product.name}</strong>?`,
        };
        break;
      case DialogAction.ENABLE:
        data = {
          title: 'Confirmar habilitación de cliente',
          content: `¿Está seguro que desea habilitar el producto <strong class="text-purple-700">${product.name}</strong>?`,
        };
        break;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        if (action === DialogAction.DELETE) {
          this.deleteProduct(product.id);
        } else if (action === DialogAction.ENABLE) {
          this.enableProduct(product.id);
        } else if (action === DialogAction.DISABLE) {
          this.disableProduct(product.id);
        }
      }
    });
  }

  disableProduct(id: number) {
    this.inventoryService.disableProduct(id).subscribe(() => {
      this.toastService.success({
        title: 'Producto deshabilitado exitosamente',
      });
      this.getProducts();
    });
  }
  enableProduct(id: number) {
    this.inventoryService.enableProduct(id).subscribe(() => {
      this.toastService.success({
        title: 'Producto habilitado exitosamente',
      });
      this.getProducts();
    });
  }
  deleteProduct(id: any) {
    this.inventoryService.deleteProduct(id).subscribe(() => {
      this.toastService.success({
        title: 'Producto eliminado exitosamente',
      });
      this.getProducts();
    });
  }
}
