import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorState } from 'primeng/paginator';
import { TooltipModule } from 'primeng/tooltip';
import { ClientService } from '../../../../core/services/api/client.service';
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
  selector: 'esp-client-list',
  standalone: true,
  imports: [SHARED_COMPONENTS, ANGULAR_MODULES, PRIME_NG_MODULES],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss',
})
export class ClientListComponent extends BaseTableComponent implements OnInit {
  private readonly clientService = inject(ClientService);

  constructor() {
    super();
    this.initTable();
    this.filterForm = this.fb.group({
      searchValue: [''],
    });
  }

  ngOnInit(): void {
    this.getClients();
  }

  override initTable() {
    this.tableContainerOptions.title = 'Clientes';
    this.tableContainerOptions.newButton = {
      label: 'Nuevo cliente',
      link: '/home/clients/new',
    };
    this.tableContainerOptions.table = {
      actions: {
        edit: {
          routerLink: '/home/clients/edit',
        },
      },
      columns: [
        { columnDef: 'ci', header: 'Cédula', frozen: true },
        { columnDef: 'fullName', header: 'Nombre Completo', frozen: true },
        { columnDef: 'email', header: 'Email' },
        { columnDef: 'phone', header: 'Teléfono' },
        { columnDef: 'address', header: 'Dirección' },
        { columnDef: 'city', header: 'Ciudad' },
        { columnDef: 'enabled', header: 'Estado' },
        { columnDef: 'actions', header: 'Acciones' },
      ],
    };
  }
  /* API CALL FUNCTIONS */
  getClients(searchValue?: string, page?: number) {
    this.tableContainerOptions.loading = true;
    this.clientService.getAll(searchValue, page).subscribe((resp) => {
      setTimeout(() => {
        this.tableContainerOptions.loading = false;
        this.tableContainerOptions.table.value = resp.content;
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
    this.clientService.enable(id).subscribe(() => {
      this.showToastAndReloadTable('Cliente habilitado exitosamente.', () => {
        this.getClients();
      });
    });
  }

  disable(id: number) {
    this.clientService.disable(id).subscribe(() => {
      this.showToastAndReloadTable('Cliente inhabilidato exitosamente.', () => {
        this.getClients();
      });
    });
  }

  delete(id: number) {
    this.clientService.delete(id).subscribe(() => {
      this.showToastAndReloadTable('Cliente eliminiado exitosamente.', () => {
        this.getClients();
      });
    });
  }

  onFilter() {
    this.lastSearchValue = {
      searchValue: this.filterForm.get('searchValue')?.value,
    };
    this.tableContainerOptions.paginator.state.first = 0;
    this.getClients(this.lastSearchValue.searchValue);
  }

  override onPageChange(event: PaginatorState) {
    this.tableContainerOptions.paginator.state.first = event.first!;
    this.getClients(this.lastSearchValue.searchValue, event.page);
  }

  clearSearch() {
    this.tableContainerOptions.paginator.state.first = 0;
    this.getClients();
    this.filterForm.reset();
  }
}
