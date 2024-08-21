import { Component, inject, OnInit } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { TableContainerComponent } from '../../../../shared/components/table-container/table-container.component';
import { TableContainerOptions } from '../../../../core/models/system/table-container-options.model';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from 'ngx-french-toast';
import { AuthorityStorageService } from '../../../../core/services/application/authority-storage.service';
import {
  getValueFromDef,
  getClassFromDef,
} from '../../../../shared/utils/tableUtil';
import { TableHeader } from '../../../../core/models/system/table-header.model';
import { AuthorityName } from '../../../../core/models/auth/response/current-user.model';
import {
  ConfirmDialogComponent,
  DialogAction,
} from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { LaundryServiceService } from '../../../../core/services/api/laundry-service.service';
import { LaundryServiceDto } from '../../../../core/models/laundry_service/response/laundry-service-dto.model';
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
  selector: 'app-service-list',
  standalone: true,
  imports: [ANGULAR_MODULES, MATERIAL_MODULES, MY_COMPONENTS],
  templateUrl: './service-list.component.html',
  styleUrl: './service-list.component.scss',
})
export class ServiceListComponent implements OnInit {
  private readonly laundryServicesService = inject(LaundryServiceService);
  private readonly dialog = inject(MatDialog);
  private readonly toastService = inject(ToastService);
  private readonly fb = inject(NonNullableFormBuilder);
  protected readonly authorityStorage = inject(AuthorityStorageService);
  protected readonly getValueFromDef = getValueFromDef;
  protected readonly getClassFromDef = getClassFromDef;

  services: LaundryServiceDto[] = [];

  displayedColumns: TableHeader[] = [
    { columnDef: 'name', header: 'Nombre' },
    { columnDef: 'description', header: 'Descripción' },
    { columnDef: 'price', header: 'Precio' },
    { columnDef: 'unitType', header: 'Tipo de unidad' },
    { columnDef: 'enabled', header: 'Estado' },
    { columnDef: 'actions', header: 'Acciones' },
  ];

  tableContainerOptions: TableContainerOptions = {
    title: 'Servicios de lavandería',
    loading: true,
    newButton: {
      label: 'Nuevo servicio',
      link: '/home/services/new',
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
    this.getServices();
  }

  getServices(name?: string, page?: number) {
    this.tableContainerOptions.loading = true;
    this.laundryServicesService.getAll(name, page).subscribe((resp) => {
      setTimeout(() => {
        this.services = resp.content;
        this.tableContainerOptions.loading = false;
      }, 300);
      this.tableContainerOptions.paginator = {
        length: resp.totalItems,
        pageIndex: resp.currentPage,
      };
    });
  }

  getColums(): string[] {
    return this.displayedColumns.map((header) =>
      header.columnDef ? header.columnDef : ''
    );
  }

  openConfirmDialog(service: LaundryServiceDto, action: DialogAction) {
    let data = {
      title: '',
      content: '',
    };

    switch (action) {
      case DialogAction.DELETE:
        data = {
          title: 'Confirmar eliminación permanente',
          content: `¿Está seguro que desea eliminar al servicio <strong class="text-red-700">${service.name}</strong>? <br> <br> <p class="text-center text-xl"><strong class="text-amber-700 uppercase">esta acción no se puede deshacer</strong></p>`,
        };
        break;
      case DialogAction.DISABLE:
        data = {
          title: 'Confirmar inhabilitación de servicio',
          content: `¿Está seguro que desea inhabilitar al servicio <strong class="text-zinc-700">${service.name}</strong>?`,
        };
        break;
      case DialogAction.ENABLE:
        data = {
          title: 'Confirmar habilitación de servicio',
          content: `¿Está seguro que desea habilitar al cliente <strong class="text-purple-700">${service.name}</strong>?`,
        };
        break;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        if (action === DialogAction.DELETE) {
          this.deleteService(service.id);
        } else if (action === DialogAction.ENABLE) {
          this.enableService(service.id);
        } else if (action === DialogAction.DISABLE) {
          this.disableService(service.id);
        }
      }
    });
  }

  disableService(id: number) {
    this.laundryServicesService.disable(id).subscribe(() => {
      this.toastService.success({
        title: 'Servicio inhabilitado exitosamente',
      });
      this.getServices();
    });
  }
  enableService(id: number) {
    this.laundryServicesService.enable(id).subscribe(() => {
      this.toastService.success({
        title: 'Servicio habilitado exitosamente',
      });
      this.getServices();
    });
  }
  deleteService(id: number) {
    this.laundryServicesService.delete(id).subscribe(() => {
      this.toastService.success({
        title: 'Servicio eliminado exitosamente',
      });
      this.getServices();
    });
  }

  onFilter() {
    this.lastSearchValue = {
      searchValue: this.filterForm.get('searchValue')?.value,
    };
    this.getServices(this.lastSearchValue.searchValue);
  }

  onPageChange($event: PageEvent) {
    this.getServices(this.lastSearchValue.searchValue, $event.pageIndex);
  }
}
