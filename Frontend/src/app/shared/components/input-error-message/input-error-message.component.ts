import { Component, input } from '@angular/core';

@Component({
  selector: 'esp-input-error-message',
  standalone: true,
  imports: [],
  templateUrl: './input-error-message.component.html',
  styleUrl: './input-error-message.component.scss',
})
export class InputErrorMessageComponent {
  message = input.required();
}
