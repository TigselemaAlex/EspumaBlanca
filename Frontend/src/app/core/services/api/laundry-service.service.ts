import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { PageDto } from '../../models/pageable/page-dto.model';
import { LaundryServiceDto } from '../../models/laundry_service/response/laundry-service-dto.model';
import { LaundryServiceRequest } from '../../models/laundry_service/request/laundry-service-request.model';

@Injectable({
  providedIn: 'root',
})
export class LaundryServiceService {
  private readonly endpoint =
    environment.apiUrl + '/protected/laundry-services';
  private readonly http = inject(HttpClient);

  getAll(name?: string, page?: number) {
    let params = new HttpParams();
    if (name) params = params.set('name', name);
    if (page) params = params.set('page', page);
    return this.http.get<PageDto>(this.endpoint, { params });
  }

  getById(id: number) {
    return this.http.get<LaundryServiceDto>(`${this.endpoint}/${id}`);
  }

  create(request: LaundryServiceRequest) {
    return this.http.post<LaundryServiceDto>(this.endpoint, request);
  }

  update(id: number, request: LaundryServiceRequest) {
    return this.http.put<LaundryServiceDto>(`${this.endpoint}/${id}`, request);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }

  enable(id: number) {
    return this.http.put<void>(`${this.endpoint}/${id}/enable`, {});
  }

  disable(id: number) {
    return this.http.put<void>(`${this.endpoint}/${id}/disable`, {});
  }
}
