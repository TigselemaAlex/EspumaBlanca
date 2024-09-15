import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

const PRIME_NG_MODULES = [ToastModule, ConfirmDialogModule];
const ANGULAR_MODULES = [RouterOutlet];
@Component({
  selector: 'esp-root',
  standalone: true,
  imports: [PRIME_NG_MODULES, ANGULAR_MODULES],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly primeNgConfig = inject(PrimeNGConfig);

  ngOnInit(): void {
    this.primeNgConfig.ripple = true;
  }
}
