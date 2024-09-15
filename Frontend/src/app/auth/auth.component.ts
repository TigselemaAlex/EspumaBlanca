import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardModule } from 'primeng/card';

const PRIME_NG_MODULES = [CardModule]
const ANGULAR_MODULES = [RouterOutlet]

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [PRIME_NG_MODULES, ANGULAR_MODULES],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  currentYear = new Date().getFullYear();
}
