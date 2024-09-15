import { Component, inject, OnInit } from '@angular/core';
import { ProfileService } from '../../../../core/services/api/profile.service';
import { AuthorityStorageService } from '../../../../core/services/application/authority-storage.service';
import { ProfileDto } from '../../../../core/models/profile/response/profile-dto.model';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { RouterLink } from '@angular/router';
import { DividerModule } from 'primeng/divider';

const PRIME_NG_MODULES = [ButtonModule, CardModule, ChipModule, DividerModule];
const ANGULAR_MODULES = [RouterLink];

@Component({
  selector: 'esp-profile-view',
  standalone: true,
  imports: [PRIME_NG_MODULES, ANGULAR_MODULES],
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.scss',
})
export class ProfileViewComponent implements OnInit {
  private readonly profileService = inject(ProfileService);
  private readonly authorityStorage = inject(AuthorityStorageService);

  profile!: ProfileDto;

  ngOnInit(): void {
    this.authorityStorage.currentUser$.subscribe((resp) => {
      const id = resp.id;
      if (id) {
        this.profileService.getProfile(id).subscribe((resp) => {
          this.profile = resp;
        });
      }
    });
  }
}
