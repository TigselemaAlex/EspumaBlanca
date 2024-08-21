import { Component, inject, OnInit } from '@angular/core';
import { DealService } from '../../../../core/services/api/deal.service';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from 'ngx-french-toast';
import { AuthorityStorageService } from '../../../../core/services/application/authority-storage.service';
import {
  getValueFromDef,
  getClassFromDef,
} from '../../../../shared/utils/tableUtil';
import { DealDto } from '../../../../core/models/deals/response/deal-dto.model';
import { TableHeader } from '../../../../core/models/system/table-header.model';
import { TableContainerOptions } from '../../../../core/models/system/table-container-options.model';
import { AuthorityName } from '../../../../core/models/auth/response/current-user.model';
import {
  ConfirmDialogComponent,
  DialogAction,
} from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
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
  selector: 'app-deal-list',
  standalone: true,
  imports: [ANGULAR_MODULES, MATERIAL_MODULES, MY_COMPONENTS],
  templateUrl: './deal-list.component.html',
  styleUrl: './deal-list.component.scss',
})
export class DealListComponent implements OnInit {
  private readonly dealService = inject(DealService);
  private readonly dialog = inject(MatDialog);
  private readonly toastService = inject(ToastService);
  private readonly fb = inject(NonNullableFormBuilder);
  protected readonly authorityStorage = inject(AuthorityStorageService);
  protected readonly getValueFromDef = getValueFromDef;
  protected readonly getClassFromDef = getClassFromDef;

  deals: DealDto[] = [];

  displayedColumns: TableHeader[] = [
    { columnDef: 'name', header: 'Nombre' },
    { columnDef: 'value', header: 'Valor' },
    { columnDef: 'enabled', header: 'Estado' },
    { columnDef: 'actions', header: 'Acciones' },
  ];

  tableContainerOptions: TableContainerOptions = {
    title: 'Promociones',
    loading: true,
    newButton: {
      label: 'Nueva promoción',
      link: '/home/deals/new',
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
    this.getDeals();
  }

  getDeals(name?: string, page?: number) {
    this.tableContainerOptions.loading = true;
    this.dealService.getAll(name, page).subscribe((resp) => {
      setTimeout(() => {
        this.deals = resp.content;
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

  openConfirmDialog(deal: DealDto, action: DialogAction) {
    let data = {
      title: '',
      content: '',
    };

    switch (action) {
      case DialogAction.DELETE:
        data = {
          title: 'Confirmar eliminación permanente',
          content: `¿Está seguro que desea eliminar la promoción <strong class="text-red-700">${deal.name}</strong>? <br> <br> <p class="text-center text-xl"><strong class="text-amber-700 uppercase">esta acción no se puede deshacer</strong></p>`,
        };
        break;
      case DialogAction.DISABLE:
        data = {
          title: 'Confirmar inhabilitación de servicio',
          content: `¿Está seguro que desea inhabilitar la promoción <strong class="text-zinc-700">${deal.name}</strong>?`,
        };
        break;
      case DialogAction.ENABLE:
        data = {
          title: 'Confirmar habilitación de servicio',
          content: `¿Está seguro que desea habilitar la promoción <strong class="text-purple-700">${deal.name}</strong>?`,
        };
        break;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        if (action === DialogAction.DELETE) {
          this.deleteDeal(deal.id);
        } else if (action === DialogAction.ENABLE) {
          this.enableDeal(deal.id);
        } else if (action === DialogAction.DISABLE) {
          this.disableDeal(deal.id);
        }
      }
    });
  }
  disableDeal(id: any) {
    this.dealService.disable(id).subscribe(() => {
      this.showToastAndReloadTable('Promoción inhabilitada exitosamente');
    });
  }
  enableDeal(id: any) {
    this.dealService.enable(id).subscribe(() => {
      this.showToastAndReloadTable('Promoción habilitada exitosamente');
    });
  }
  deleteDeal(id: any) {
    this.dealService.delete(id).subscribe(() => {
      this.showToastAndReloadTable('Promoción eliminada exitosamente');
    });
  }
  onFilter() {
    this.lastSearchValue = {
      searchValue: this.filterForm.get('searchValue')?.value,
    };
    this.getDeals(this.lastSearchValue.searchValue);
  }
  onPageChange($event: PageEvent) {
    this.getDeals(this.lastSearchValue.searchValue, $event.pageIndex);
  }

  private showToastAndReloadTable(title: string) {
    this.toastService.success({
      title,
    });
    this.getDeals();
  }
}
