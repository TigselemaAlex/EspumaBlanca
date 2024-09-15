import { Component, inject, OnInit } from '@angular/core';
import { TableContainerComponent } from '../../../../shared/components/table-container/table-container.component';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryManagementComponent } from '../category-management/category-management.component';
import { BaseTableComponent } from '../../../../shared/components/base-table/base-table-component';
import { PaginatorState } from 'primeng/paginator';
import { DialogAction } from '../../../../shared/utils/confirmDialogEnum';
import { InventoryService } from '../../../../core/services/api/inventory.service';

const SHARED_COMPONENTS = [
  TableContainerComponent,
  CategoryManagementComponent,
];
const PRIME_NG_MODULES = [
  InputTextModule,
  IconFieldModule,
  InputIconModule,
  ButtonModule,
  TooltipModule,
];
const ANGULAR_MODULES = [ReactiveFormsModule];

@Component({
  selector: 'esp-inventory-list',
  standalone: true,
  imports: [SHARED_COMPONENTS, PRIME_NG_MODULES, ANGULAR_MODULES],
  templateUrl: './inventory-list.component.html',
  styleUrl: './inventory-list.component.scss',
})
export class InventoryListComponent
  extends BaseTableComponent
  implements OnInit
{
  private readonly inventoryService = inject(InventoryService);

  visibleCategoryManagement = true;

  constructor() {
    super();
    this.initTable();
    this.filterForm = this.fb.group({
      searchValue: [''],
    });
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(name?: string, category?: number, page?: number) {
    this.tableContainerOptions.loading = true;
    this.inventoryService
      .getAllProducts(name, category, page)
      .subscribe((resp) => {
        setTimeout(() => {
          this.tableContainerOptions.loading = false;
          this.tableContainerOptions.table.value = resp.content;
        }, 300);
        this.tableContainerOptions.paginator.totalRecords = resp.totalItems;
      });
  }

  override initTable(): void {
    this.tableContainerOptions.title = 'Inventario';
    this.tableContainerOptions.newButton = {
      label: 'Nuevo producto',
      link: '/home/inventory/new',
    };
    this.tableContainerOptions.table = {
      actions: {
        edit: {
          routerLink: '/home/inventory/edit',
        },
      },
      columns: [
        { columnDef: 'name', header: 'Nombre' },
        { columnDef: 'description', header: 'Descripción' },
        { columnDef: 'stock', header: 'Existencias' },
        { columnDef: 'minStock', header: 'Min. existencias' },
        { columnDef: 'category', header: 'Categoría' },
        { columnDef: 'enabled', header: 'Estado' },
        { columnDef: 'actions', header: 'Acciones' },
      ],
    };
  }

  override onPageChange(event: PaginatorState): void {}
  override onConfirmationDialog(id: number, action: DialogAction): void {}

  onFilter() {}
  clearSearch() {}

  openCategoryManagementDialog() {
    this.visibleCategoryManagement = !this.visibleCategoryManagement;
  }
}
