import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ClientDto } from '../../models/client/response/client-dto.model';
import { PageDto } from '../../models/pageable/page-dto.model';
import { ClientRequest } from '../../models/client/request/client-request.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private readonly endpoint = environment.apiUrl + '/protected/clients';
  private readonly http = inject(HttpClient);

  getAll(value?: string, page?: number) {
    let params = new HttpParams();
    if (value) {
      params = params.set('value', value);
    }
    if (page) {
      params = params.set('page', page.toString());
    }
    return this.http.get<PageDto>(this.endpoint, {
      params,
    });
  }

  getById(id: number) {
    return this.http.get<ClientDto>(`${this.endpoint}/${id}`);
  }

  createNew(request: ClientRequest) {
    return this.http.post<ClientDto>(this.endpoint, request);
  }

  update(id: number, request: ClientRequest) {
    return this.http.put<ClientDto>(`${this.endpoint}/${id}`, request);
  }

  delete(id: number) {
    return this.http.delete(`${this.endpoint}/${id}`);
  }

  enable(id: number) {
    return this.http.put(`${this.endpoint}/${id}/enable`, null);
  }

  disable(id: number) {
    return this.http.put(`${this.endpoint}/${id}/disable`, null);
  }
}
