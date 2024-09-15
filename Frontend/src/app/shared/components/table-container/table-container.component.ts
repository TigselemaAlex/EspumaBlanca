import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  contentChild,
  HostListener,
  inject,
  input,
  output,
  TemplateRef,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Confirmation, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { AuthorityName } from '../../../core/models/auth/response/current-user.model';
import { TableContainerOptions } from '../../../core/models/system/table-container-options.model';
import { getClassFromDef, getValueFromDef } from '../../utils/tableUtil';
import { ScrollToTopButtonComponent } from '../scroll-to-top-button/scroll-to-top-button.component';
import { DialogAction } from './../../utils/confirmDialogEnum';

const PRIME_NG_MODULES = [
  CardModule,
  ButtonModule,
  ProgressSpinnerModule,
  PaginatorModule,
  DividerModule,
  TableModule,
  TooltipModule,
];

const SHARED_COMPONENTS = [ScrollToTopButtonComponent];
const ANGULAR_MODULES = [RouterLink, NgTemplateOutlet];

@Component({
  selector: 'esp-table-container',
  standalone: true,
  imports: [PRIME_NG_MODULES, ANGULAR_MODULES, SHARED_COMPONENTS],
  templateUrl: './table-container.component.html',
  styleUrl: './table-container.component.scss',
})
export class TableContainerComponent {
  protected readonly confirmationService = inject(ConfirmationService);
  protected readonly getValueFromDef = getValueFromDef;
  protected readonly getClassFromDef = getClassFromDef;
  protected readonly router = inject(Router);
  protected authorities = AuthorityName;
  protected dialogAction = DialogAction;

  options = input.required<TableContainerOptions>();
  pageChange = output<PaginatorState>();
  optionsTemplate = contentChild<TemplateRef<any>>('options');
  filterTemplate = contentChild<TemplateRef<any>>('filter');
  confirmResponse = output<{ id: number; action: DialogAction }>();

  selectedItem: any;

  openConfirmDialog(item: any, action: DialogAction) {
    this.selectedItem = item;
    const confirmation = this.getConfirmationBody(action, this.selectedItem.id);
    this.confirmationService.confirm(confirmation);
  }

  @HostListener('document:keydown', ['$event'])
  deleteOnKeyPress(event: KeyboardEvent) {
    if (this.selectedItem) {
      let action: DialogAction;
      if (event.key === 'Delete') {
        if (event.shiftKey) {
          action = DialogAction.DELETE;
        } else {
          if (this.selectedItem.enabled) action = DialogAction.DISABLE;
          else action = DialogAction.ENABLE;
        }
        const confirmation = this.getConfirmationBody(
          action,
          this.selectedItem.id
        );
        this.confirmationService.confirm(confirmation);
      }
      if (event.key === 'F2') {
        if (this.options().table.actions?.edit.routerLink)
          this.router.navigate([
            this.options().table.actions?.edit.routerLink,
            this.selectedItem.id,
          ]);
        else
          this.options().table.actions?.edit.click?.call(
            this,
            this.selectedItem.id
          );
      }
    }
  }

  private getConfirmationBody(action: DialogAction, id: number): Confirmation {
    const confirmation: Confirmation = {
      message: '¿Está seguro que desea continuar?',
      accept: () => {
        this.confirmResponse.emit({ id, action });
      },
    };
    switch (action) {
      case DialogAction.DELETE:
        confirmation.header = 'Confirmar eliminación permanente';
        confirmation.message = `¿Está seguro que desea continuar? <br> <br> <p class="text-lg "><strong class="text-red-400">Importante: esta acción eliminará de forma permanente toda la información relacionada al item que desea eliminar.</strong></p>`;
        break;
      case DialogAction.DISABLE:
        confirmation.header = 'Confirmar inhabilitación';
        break;
      case DialogAction.ENABLE:
        confirmation.header = 'Confirmar habilitación';
        break;
    }
    return confirmation;
  }
}
