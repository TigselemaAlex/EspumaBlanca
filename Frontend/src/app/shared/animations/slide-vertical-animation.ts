import { animate, style, transition, trigger } from '@angular/animations';

export const slideVertical = trigger('slideVertical', [
  transition(':enter', [
    style({ display: 'block', transform: 'translateY(-100%)', opacity: 0 }),
    animate('300ms', style({ transform: 'translateY(0)', opacity: 1 })),
  ]),
  transition(':leave', [
    style({ display: 'block', transform: 'translateY(0)', opacity: 1 }),
    animate('300ms', style({ transform: 'translateY(-100%)', opacity: 0 })),
  ]),
]);

export const slideHorizontal = trigger('slideHorizontal', [
  transition(':enter', [
    style({ transform: 'translateX(100%)', opacity: 0 }),
    animate(
      '300ms ease-in-out',
      style({ transform: 'translateX(0)', opacity: 1 })
    ),
  ]),
  transition(':leave', [
    style({ transform: 'translateX(0)', opacity: 1 }),
    animate(
      '300ms ease-in-out',
      style({ transform: 'translateX(100%)', opacity: 0 })
    ),
  ]),
]);
