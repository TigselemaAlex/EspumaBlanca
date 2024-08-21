import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  TemplateRef,
  contentChild,
  input,
  output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { TableContainerOptions } from '../../../core/models/system/table-container-options.model';
import { getCustomPaginatorIntl } from '../../utils/customPaginatorIntl';

@Component({
  selector: 'app-table-container',
  standalone: true,
  imports: [
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatPaginatorModule,
    NgTemplateOutlet,
    MatProgressSpinnerModule,
  ],
  templateUrl: './table-container.component.html',
  styleUrl: './table-container.component.scss',
  providers: [
    { provide: MatPaginatorIntl, useFactory: getCustomPaginatorIntl },
  ],
})
export class TableContainerComponent {
  options = input.required<TableContainerOptions>();
  pageChange = output<PageEvent>();
  optionsTemplate = contentChild<TemplateRef<any>>('options');
  filterTemplate = contentChild<TemplateRef<any>>('filter');
  tableTemplate = contentChild<TemplateRef<any>>('table');
}
