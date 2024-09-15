import { MatMenuPanel } from '@angular/material/menu';

export interface MenuItem {
  id?: string;
  icon?: string;
  label: string;
  link?: string;
  children?: MenuItem[];
}
