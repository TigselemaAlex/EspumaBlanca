import { LaundryServiceService } from './../../../../core/services/api/laundry-service.service';
import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { TableContainerComponent } from '../../../../shared/components/table-container/table-container.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseTableComponent } from '../../../../shared/components/base-table/base-table-component';
import { PaginatorState } from 'primeng/paginator';
import { DialogAction } from '../../../../shared/utils/confirmDialogEnum';

const SHARED_COMPONENTS = [TableContainerComponent];
const PRIME_NG_MODULES = [
  InputTextModule,
  IconFieldModule,
  InputIconModule,
  ButtonModule,
  TooltipModule,
  TableModule,
];
const ANGULAR_MODULES = [ReactiveFormsModule];

@Component({
  selector: 'esp-service-list',
  standalone: true,
  imports: [SHARED_COMPONENTS, ANGULAR_MODULES, PRIME_NG_MODULES],
  templateUrl: './service-list.component.html',
  styleUrl: './service-list.component.scss',
})
export class ServiceListComponent extends BaseTableComponent implements OnInit {
  private readonly laundryServicesService = inject(LaundryServiceService);

  constructor() {
    super();
    this.initTable();
    this.filterForm = this.fb.group({
      searchValue: [''],
    });
  }

  ngOnInit(): void {
    this.getServices();
  }

  override initTable() {
    this.tableContainerOptions.title = 'Servicios';
    this.tableContainerOptions.newButton = {
      label: 'Nuevo servicio',
      link: '/home/services/new',
    };
    this.tableContainerOptions.table = {
      actions: {
        edit: {
          routerLink: '/home/services/edit',
        },
      },
      columns: [
        { columnDef: 'name', header: 'Nombre', frozen: true },
        { columnDef: 'description', header: 'Descripción' },
        { columnDef: 'price', header: 'Precio' },
        { columnDef: 'unitType', header: 'Tipo de unidad' },
        { columnDef: 'enabled', header: 'Estado' },
        { columnDef: 'actions', header: 'Acciones' },
      ],
    };
  }

  getServices(name?: string, page?: number) {
    this.tableContainerOptions.loading = true;
    this.laundryServicesService.getAll(name, page).subscribe((resp) => {
      setTimeout(() => {
        this.tableContainerOptions.table.value = resp.content;
        this.tableContainerOptions.loading = false;
      }, 300);
      this.tableContainerOptions.paginator.totalRecords = resp.totalItems;
    });
  }

  onConfirmationDialog(id: number, action: DialogAction) {
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

  enable(id: number) {
    this.laundryServicesService.enable(id).subscribe(() => {
      this.showToastAndReloadTable('Cliente habilitado exitosamente.', () => {
        this.getServices();
      });
    });
  }

  disable(id: number) {
    this.laundryServicesService.disable(id).subscribe(() => {
      this.showToastAndReloadTable('Cliente inhabilidato exitosamente.', () => {
        this.getServices();
      });
    });
  }

  delete(id: number) {
    this.laundryServicesService.delete(id).subscribe(() => {
      this.showToastAndReloadTable('Cliente eliminiado exitosamente.', () => {
        this.getServices();
      });
    });
  }

  onPageChange($event: PaginatorState) {
    this.tableContainerOptions.paginator.state.first = $event.first!;
    this.getServices(this.lastSearchValue.searchValue, $event.page);
  }
  onFilter() {
    this.lastSearchValue = {
      searchValue: this.filterForm.get('searchValue')?.value,
    };
    this.tableContainerOptions.paginator.state.first = 0;
    this.getServices(this.lastSearchValue.searchValue);
  }

  clearSearch() {
    this.tableContainerOptions.paginator.state.first = 0;
    this.getServices();
    this.filterForm.reset();
  }
}
