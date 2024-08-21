import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { PageDto } from '../../models/pageable/page-dto.model';
import { DealRequest } from '../../models/deals/request/deal-request.model';
import { DealDto } from '../../models/deals/response/deal-dto.model';

@Injectable({
  providedIn: 'root',
})
export class DealService {
  private readonly endpoint = environment.apiUrl + '/protected/deals';
  private readonly http = inject(HttpClient);

  getAll(name?: string, page?: number) {
    let params = new HttpParams();
    if (name) params = params.set('name', name);
    if (page) params = params.set('page', page);
    return this.http.get<PageDto>(this.endpoint, { params });
  }

  getAllEnabled(name?: string, page?: number) {
    let params = new HttpParams();
    if (name) params = params.set('name', name);
    if (page) params = params.set('page', page);
    return this.http.get<PageDto>(this.endpoint + '/enabled', { params });
  }

  create(request: DealRequest) {
    return this.http.post<DealDto>(this.endpoint, request);
  }

  getById(id: number) {
    return this.http.get<DealDto>(`${this.endpoint}/${id}`);
  }

  update(id: number, request: DealRequest) {
    return this.http.put<DealDto>(`${this.endpoint}/${id}`, request);
  }

  enable(id: number) {
    return this.http.put<void>(`${this.endpoint}/${id}/enable`, {});
  }

  disable(id: number) {
    return this.http.put<void>(`${this.endpoint}/${id}/disable`, {});
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }
}
