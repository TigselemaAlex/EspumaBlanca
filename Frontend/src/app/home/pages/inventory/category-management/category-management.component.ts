import {
  Component,
  inject,
  model,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorState } from 'primeng/paginator';
import { TooltipModule } from 'primeng/tooltip';
import { slideHorizontal } from '../../../../shared/animations/slide-vertical-animation';
import { BaseTableComponent } from '../../../../shared/components/base-table/base-table-component';
import { TableContainerComponent } from '../../../../shared/components/table-container/table-container.component';
import { DialogAction } from '../../../../shared/utils/confirmDialogEnum';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { InventoryService } from './../../../../core/services/api/inventory.service';

const SHARED_COMPONENTS = [TableContainerComponent, CategoryFormComponent];
const PRIME_NG_MODULES = [
  DialogModule,
  InputTextModule,
  IconFieldModule,
  InputIconModule,
  ButtonModule,
  TooltipModule,
];

const ANGULAR_MODULES = [ReactiveFormsModule];

@Component({
  selector: 'esp-category-management',
  standalone: true,
  imports: [SHARED_COMPONENTS, PRIME_NG_MODULES, ANGULAR_MODULES],
  templateUrl: './category-management.component.html',
  styleUrl: './category-management.component.scss',
  animations: [slideHorizontal],
})
export class CategoryManagementComponent
  extends BaseTableComponent
  implements OnChanges
{
  private readonly inventoryService = inject(InventoryService);

  constructor() {
    super();
    this.initTable();
  }

  visible = model<boolean>(false);

  categoryFormVisible = false;
  categoryId?: number;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible'].currentValue) {
      this.getCategories();
      this.initTable();
    }
  }

  getCategories(name?: string, page?: number) {
    this.tableContainerOptions.loading = true;
    this.inventoryService.getAllCategories(name, page).subscribe((resp) => {
      setTimeout(() => {
        this.tableContainerOptions.table.value = resp.content;
        this.tableContainerOptions.loading = false;
      }, 300);
      this.tableContainerOptions.paginator.totalRecords = resp.totalItems;
    });
  }

  override initTable(): void {
    this.tableContainerOptions.title = 'Categorías';
    this.tableContainerOptions.newButton = {
      label: 'Nuevo categoría',
      click: () => {
        this.categoryFormVisible = true;
        this.categoryId = undefined;
      },
    };
    this.tableContainerOptions.table = {
      actions: {
        edit: {
          click: (id) => {
            this.categoryId = id;
            this.categoryFormVisible = true;
          },
        },
      },
      columns: [
        { columnDef: 'name', header: 'Nombre' },
        { columnDef: 'enabled', header: 'Estado' },
        { columnDef: 'actions', header: 'Acciones' },
      ],
    };
  }
  override onPageChange(event: PaginatorState): void {}
  override onConfirmationDialog(id: number, action: DialogAction): void {
    switch (action) {
      case DialogAction.DELETE:
        this.delete(id);
        break;
      case DialogAction.DISABLE:
        this.disable(id);
        break;
      case DialogAction.ENABLE:
        this.enable(id);
        break;
    }
  }
  delete(id: number) {
    this.inventoryService.deleteCategory(id).subscribe(() => {
      this.showToastAndReloadTable('Categoría eliminada exitosamente', () =>
        this.closeAllAndReloadTable()
      );
    });
  }
  disable(id: number) {
    this.inventoryService.disableCategory(id).subscribe(() => {
      this.showToastAndReloadTable('Categoría inhabilitada exitosamente', () =>
        this.closeAllAndReloadTable()
      );
    });
  }
  enable(id: number) {
    this.inventoryService.enableCategory(id).subscribe(() => {
      this.showToastAndReloadTable('Categoría habilitada exitosamente', () =>
        this.closeAllAndReloadTable()
      );
    });
  }

  closeAllAndReloadTable() {
    this.categoryFormVisible = false;
    this.categoryId = undefined;
    this.getCategories();
  }
}
