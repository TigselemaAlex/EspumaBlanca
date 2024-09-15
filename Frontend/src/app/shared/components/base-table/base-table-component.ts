import { inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TableContainerOptions } from '../../../core/models/system/table-container-options.model';
import { AuthorityStorageService } from '../../../core/services/application/authority-storage.service';
import { PaginatorState } from 'primeng/paginator';
import { DialogAction } from '../../utils/confirmDialogEnum';

export abstract class BaseTableComponent {
  protected readonly fb = inject(NonNullableFormBuilder);
  protected readonly messageService = inject(MessageService);
  protected readonly authorityStorage = inject(AuthorityStorageService);

  protected tableContainerOptions: TableContainerOptions = {
    title: '',
    loading: false,
    table: {
      columns: [],
      value: [],
    },
    paginator: {
      state: {
        first: 0,
      },
      totalRecords: 0,
    },
  };

  protected filterForm!: FormGroup;
  protected lastSearchValue: { searchValue?: string } = {};

  protected showToastAndReloadTable(summary: string, reload: () => void): void {
    this.messageService.add({
      severity: 'success',
      summary,
    });
    reload();
  }
  abstract initTable(): void;
  abstract onPageChange(event: PaginatorState): void;
  abstract onConfirmationDialog(id: number, action: DialogAction): void;
}
