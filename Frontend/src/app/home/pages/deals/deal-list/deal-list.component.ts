import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorState } from 'primeng/paginator';
import { TooltipModule } from 'primeng/tooltip';
import { DealService } from '../../../../core/services/api/deal.service';
import { BaseTableComponent } from '../../../../shared/components/base-table/base-table-component';
import { TableContainerComponent } from '../../../../shared/components/table-container/table-container.component';
import { DialogAction } from '../../../../shared/utils/confirmDialogEnum';

const SHARED_COMPONENTS = [TableContainerComponent];
const PRIME_NG_MODULES = [
  InputTextModule,
  IconFieldModule,
  InputIconModule,
  ButtonModule,
  TooltipModule,
];
const ANGULAR_MODULES = [ReactiveFormsModule];

@Component({
  selector: 'esp-deal-list',
  standalone: true,
  imports: [SHARED_COMPONENTS, PRIME_NG_MODULES, ANGULAR_MODULES],
  templateUrl: './deal-list.component.html',
  styleUrl: './deal-list.component.scss',
})
export class DealListComponent extends BaseTableComponent implements OnInit {
  onFilter() {
    throw new Error('Method not implemented.');
  }
  clearSearch() {
    throw new Error('Method not implemented.');
  }
  private readonly dealService = inject(DealService);

  constructor() {
    super();
    this.initTable();
    this.filterForm = this.fb.group({
      searchValue: [''],
    });
  }

  ngOnInit(): void {
    this.getDeals();
  }

  getDeals(name?: string, page?: number) {
    this.tableContainerOptions.loading = true;
    this.dealService.getAll(name, page).subscribe((resp) => {
      setTimeout(() => {
        this.tableContainerOptions.table.value = resp.content;
        this.tableContainerOptions.loading = false;
      }, 300);
      this.tableContainerOptions.paginator.totalRecords = resp.totalItems;
    });
  }

  override initTable(): void {
    this.tableContainerOptions.title = 'Promociones';
    this.tableContainerOptions.newButton = {
      label: 'Nueva promoción',
      link: '/home/deals/new',
    };
    this.tableContainerOptions.table = {
      actions: {
        edit: {
          routerLink: '/home/deals/edit',
        },
      },
      columns: [
        { columnDef: 'name', header: 'Nombre', frozen: true },
        { columnDef: 'value', header: 'Valor', frozen: true },
        { columnDef: 'enabled', header: 'Estado' },
        { columnDef: 'actions', header: 'Acciones' },
      ],
    };
  }

  override onPageChange(event: PaginatorState): void {
    this.tableContainerOptions.paginator.state.first = event.first!;
    this.getDeals(this.lastSearchValue.searchValue, event.page);
  }
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
    this.dealService.delete(id).subscribe(() => {
      this.showToastAndReloadTable('Cliente habilitado exitosamente.', () => {
        this.getDeals();
      });
    });
  }
  disable(id: number) {
    this.dealService.disable(id).subscribe(() => {
      this.showToastAndReloadTable('Cliente habilitado exitosamente.', () => {
        this.getDeals();
      });
    });
  }
  enable(id: number) {
    this.dealService.enable(id).subscribe(() => {
      this.showToastAndReloadTable('Cliente habilitado exitosamente.', () => {
        this.getDeals();
      });
    });
  }
}
