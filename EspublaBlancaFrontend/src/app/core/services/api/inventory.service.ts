import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { PageDto } from '../../models/pageable/page-dto.model';
import { ProductCategoryDto } from '../../models/inventory/category/response/product-category-dto.model';
import { ProductCategoryRequest } from '../../models/inventory/category/request/product-category-request.model';
import { ProductDto } from '../../models/inventory/product/response/product-dto.model';
import { ProductRequest } from '../../models/inventory/product/request/product-request.model';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private readonly categoryEndpoint =
    environment.apiUrl + '/protected/inventory/categories';
  private readonly productEndpoint =
    environment.apiUrl + '/protected/inventory/products';
  private readonly http = inject(HttpClient);

  getAllCategories(name?: string, page?: number) {
    let params = new HttpParams();
    if (name) params = params.set('name', name);
    if (page) params = params.set('page', page);

    return this.http.get<PageDto>(this.categoryEndpoint, {
      params,
    });
  }

  getAllEnabledCategories(name?: string, page?: number) {
    let params = new HttpParams();
    if (name) params = params.set('name', name);
    if (page) params = params.set('page', page);

    return this.http.get<PageDto>(this.categoryEndpoint + '/enabled', {
      params,
    });
  }

  getCategoryById(id: number) {
    return this.http.get<ProductCategoryDto>(`${this.categoryEndpoint}/${id}`);
  }

  createCategory(request: ProductCategoryRequest) {
    return this.http.post<ProductCategoryDto>(this.categoryEndpoint, request);
  }

  updateCategory(id: number, request: ProductCategoryRequest) {
    return this.http.put<ProductCategoryDto>(
      `${this.categoryEndpoint}/${id}`,
      request
    );
  }

  deleteCategory(id: number) {
    return this.http.delete<void>(`${this.categoryEndpoint}/${id}`);
  }

  enableCategory(id: number) {
    return this.http.put<void>(`${this.categoryEndpoint}/${id}/enable`, {});
  }

  disableCategory(id: number) {
    return this.http.put<void>(`${this.categoryEndpoint}/${id}/disable`, {});
  }

  getAllProducts(name?: string, category?: number, page?: number) {
    let params = new HttpParams();
    if (name) params = params.set('name', name);
    if (category) params = params.set('category', category);
    if (page) params = params.set('page', page);
    return this.http.get<PageDto>(this.productEndpoint, { params });
  }

  getAllEnabledProducts(name?: string, category?: number, page?: number) {
    let params = new HttpParams();
    if (name) params = params.set('name', name);
    if (category) params = params.set('category', category);
    if (page) params = params.set('page', page);
    return this.http.get<PageDto>(this.productEndpoint + '/enabled', {
      params,
    });
  }

  getProductById(id: number) {
    return this.http.get<ProductDto>(`${this.productEndpoint}/${id}`);
  }

  createProduct(request: ProductRequest) {
    return this.http.post<ProductDto>(this.productEndpoint, request);
  }

  updateProduct(id: number, request: ProductRequest) {
    return this.http.put<ProductDto>(`${this.productEndpoint}/${id}`, request);
  }

  deleteProduct(id: number) {
    return this.http.delete<void>(`${this.productEndpoint}/${id}`);
  }

  enableProduct(id: number) {
    return this.http.put<void>(`${this.productEndpoint}/${id}/enable`, {});
  }

  disableProduct(id: number) {
    return this.http.put<void>(`${this.productEndpoint}/${id}/disable`, {});
  }
}
