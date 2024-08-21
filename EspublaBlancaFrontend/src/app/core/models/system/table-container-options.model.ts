export interface TableContainerOptions {
  title: string;
  newButton?: {
    label: string;
    link: string;
  };
  loading: boolean;
  paginator: {
    length: number;
    pageIndex: number;
  };
}
