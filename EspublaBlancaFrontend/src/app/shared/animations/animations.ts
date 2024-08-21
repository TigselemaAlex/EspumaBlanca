import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const widthInOutTrigger = trigger('widhtInOut', [
  transition(':enter', [
    style({ width: '0px' }),
    animate('0.1s', style({ width: '*' })),
  ]),
  transition(':leave', [animate('0.1s', style({ width: '0px' }))]),
]);

export const marginTrigger = trigger('margin', [
  state('expanded', style({ marginLeft: '{{drawerInitMargin}}' }), {
    params: { drawerInitMargin: '10px' },
  }),
  state('collapsed', style({ marginLeft: '88px' })),
  transition('expanded <=> collapsed', animate('0.1s')),
]);
