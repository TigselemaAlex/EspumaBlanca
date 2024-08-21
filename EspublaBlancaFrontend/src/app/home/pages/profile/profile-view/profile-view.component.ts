import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ProfileDto } from '../../../../core/models/profile/response/profile-dto.model';
import { ProfileService } from '../../../../core/services/api/profile.service';
import { AuthorityStorageService } from '../../../../core/services/application/authority-storage.service';

const MATERIAl_MODULES = [
  MatDividerModule,
  MatButtonModule,
  MatIconModule,
  MatChipsModule,
];
const ANGULAR_MODULES = [RouterLink];

@Component({
  selector: 'app-profile-view',
  standalone: true,
  imports: [MATERIAl_MODULES, ANGULAR_MODULES],
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
