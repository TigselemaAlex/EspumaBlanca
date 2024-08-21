import { Component, OnInit, inject } from '@angular/core';
import { ClientService } from '../../../../core/services/api/client.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { TableHeader } from '../../../../core/models/system/table-header.model';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  getClassFromDef,
  getValueFromDef,
} from '../../../../shared/utils/tableUtil';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ClientFullNameDto } from '../../../../core/models/client/response/client-full-name-dto.model';
import { MatDialog } from '@angular/material/dialog';
import {
  ConfirmDialogComponent,
  DialogAction,
} from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { ToastService } from 'ngx-french-toast';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TableContainerComponent } from '../../../../shared/components/table-container/table-container.component';
import { TableContainerOptions } from '../../../../core/models/system/table-container-options.model';
import { AuthorityStorageService } from '../../../../core/services/application/authority-storage.service';
import { AuthorityName } from '../../../../core/models/auth/response/current-user.model';

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
];
const MY_COMPONENTS = [TableContainerComponent];

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [ANGULAR_MODULES, MATERIAL_MODULES, MY_COMPONENTS],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss',
})
export class ClientListComponent implements OnInit {
  private readonly clientService = inject(ClientService);
  private readonly dialog = inject(MatDialog);
  private readonly toastService = inject(ToastService);
  private readonly fb = inject(NonNullableFormBuilder);
  protected readonly authorityStorage = inject(AuthorityStorageService);
  protected readonly getValueFromDef = getValueFromDef;
  protected readonly getClassFromDef = getClassFromDef;

  displayedColumns: TableHeader[] = [
    { columnDef: 'ci', header: 'Cédula' },
    { columnDef: 'fullName', header: 'Nombre Completo' },
    { columnDef: 'email', header: 'Email' },
    { columnDef: 'phone', header: 'Teléfono' },
    { columnDef: 'address', header: 'Dirección' },
    { columnDef: 'city', header: 'Ciudad' },
    { columnDef: 'enabled', header: 'Estado' },
    { columnDef: 'actions', header: 'Acciones' },
  ];

  clients: ClientFullNameDto[] = [];

  tableContainerOptions: TableContainerOptions = {
    title: 'Clientes',
    loading: true,
    newButton: {
      label: 'Nuevo cliente',
      link: '/home/clients/new',
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
  });

  lastSearchValue: { searchValue?: string } = {};

  ngOnInit(): void {
    this.getClients();
  }

  /* API CALL FUNCTIONS */
  getClients(searchValue?: string, page?: number) {
    this.tableContainerOptions.loading = true;
    this.clientService.getAll(searchValue, page).subscribe((resp) => {
      setTimeout(() => {
        this.tableContainerOptions.loading = false;
        this.clients = resp.content;
      }, 300);
      this.tableContainerOptions.paginator = {
        length: resp.totalItems,
        pageIndex: resp.currentPage,
      };
    });
  }

  enableClient(id: number) {
    this.clientService.enable(id).subscribe(() => {
      this.toastService.success({
        title: 'Cliente habilitado exitosamente',
      });
      this.getClients();
    });
  }

  disableClient(id: number) {
    this.clientService.disable(id).subscribe(() => {
      this.toastService.success({
        title: 'Cliente inhabilidato exitosamente',
      });
      this.getClients();
    });
  }

  deleteClient(id: number) {
    this.clientService.delete(id).subscribe(() => {
      this.toastService.success({
        title: 'Cliente eliminado permanentemente',
      });
      this.getClients();
    });
  }

  getColums(): string[] {
    return this.displayedColumns.map((header) =>
      header.columnDef ? header.columnDef : ''
    );
  }

  /* DIALOG */
  openConfirmDialog(client: ClientFullNameDto, action: DialogAction) {
    let data = {
      title: '',
      content: '',
    };

    switch (action) {
      case DialogAction.DELETE:
        data = {
          title: 'Confirmar eliminación permanente',
          content: `¿Está seguro que desea eliminar al cliente <strong class="text-red-700">${client.fullName}</strong> con ci: <strong class="text-red-700">${client.ci}</strong>? <br> <br> <p class="text-center text-xl"><strong class="text-amber-700 uppercase">esta acción no se puede deshacer</strong></p>`,
        };
        break;
      case DialogAction.DISABLE:
        data = {
          title: 'Confirmar inhabilitación de cliente',
          content: `¿Está seguro que desea inhabilitar al cliente <strong class="text-zinc-700">${client.fullName}</strong> con ci: <strong class="text-zinc-700">${client.ci}</strong>?`,
        };
        break;
      case DialogAction.ENABLE:
        data = {
          title: 'Confirmar habilitación de cliente',
          content: `¿Está seguro que desea habilitar al cliente <strong class="text-purple-700">${client.fullName}</strong> con ci: <strong class="text-purple-700">${client.ci}</strong>?`,
        };
        break;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        if (action === DialogAction.DELETE) {
          this.deleteClient(client.id);
        } else if (action === DialogAction.ENABLE) {
          this.enableClient(client.id);
        } else if (action === DialogAction.DISABLE) {
          this.disableClient(client.id);
        }
      }
    });
  }

  /* FILTER AND PAGINATION */

  onFilter() {
    this.lastSearchValue = {
      searchValue: this.filterForm.get('searchValue')?.value,
    };
    this.getClients(this.lastSearchValue.searchValue);
  }

  onPageChange($event: PageEvent) {
    this.getClients(this.lastSearchValue.searchValue, $event.pageIndex);
  }
}
