import { ProductCategoryDto } from '../../category/response/product-category-dto.model';

export interface ProductDto {
  id: number;
  enabled: number;
  name: string;
  description: string;
  stock: number;
  minStock: number;
  category: ProductCategoryDto;
}
