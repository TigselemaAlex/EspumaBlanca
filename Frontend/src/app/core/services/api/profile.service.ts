import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { ProfileDto } from '../../models/profile/response/profile-dto.model';
import { ProfileRequest } from '../../models/profile/request/profile-request.model';
import { ProfileUpdatePasswordRequest } from '../../models/profile/request/profile-update-password-request.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly endpoint = environment.apiUrl + '/protected/profile';
  private readonly http = inject(HttpClient);

  getProfile(id: number) {
    return this.http.get<ProfileDto>(this.endpoint + '/' + id);
  }

  update(id: number, request: ProfileRequest) {
    return this.http.put<ProfileDto>(this.endpoint + '/' + id, request);
  }

  updatePassword(id: number, request: ProfileUpdatePasswordRequest) {
    return this.http.put<ProfileDto>(
      this.endpoint + '/' + id + '/update/password',
      request
    );
  }
}
