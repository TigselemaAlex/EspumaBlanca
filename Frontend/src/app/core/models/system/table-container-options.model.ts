import { PaginatorState } from 'primeng/paginator';
import { TableHeader } from './table-header.model';

export interface TableContainerOptions {
  title: string;
  newButton?: {
    label: string;
    link?: string;
    click?: () => void;
  };
  loading: boolean;
  table: {
    columns: TableHeader[];
    value?: any;
    actions?: {
      edit: {
        routerLink?: string;
        click?: (id: number) => void;
      };
    };
  };
  paginator: {
    state: PaginatorState;
    totalRecords: number;
  };
}
