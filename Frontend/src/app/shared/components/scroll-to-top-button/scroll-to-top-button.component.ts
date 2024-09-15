import { Component, HostListener, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { slideHorizontal } from '../../animations/slide-vertical-animation';

const PRIME_NG_COMPONENTS = [ButtonModule];
@Component({
  selector: 'esp-scroll-to-top-button',
  standalone: true,
  imports: [PRIME_NG_COMPONENTS],
  templateUrl: './scroll-to-top-button.component.html',
  styleUrl: './scroll-to-top-button.component.scss',
  animations: [slideHorizontal],
})
export class ScrollToTopButtonComponent {
  visible = signal<boolean>(false);

  @HostListener('window:scroll')
  onWindowScroll() {
    if (window.scrollY > 200) this.visible.set(true);
    else this.visible.set(false);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
