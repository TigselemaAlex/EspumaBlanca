import { NgTemplateOutlet } from '@angular/common';
import { Component, TemplateRef, contentChild, effect } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-form-container',
  standalone: true,
  imports: [MatDividerModule, MatButtonModule, NgTemplateOutlet],
  templateUrl: './form-container.component.html',
  styleUrl: './form-container.component.scss',
})
export class FormContainerComponent {
  indicationTemplate = contentChild<TemplateRef<any>>('indication');
  headerTemplate = contentChild<TemplateRef<any>>('header');
  bodyTemplate = contentChild<TemplateRef<any>>('body');
  footerTemplate = contentChild<TemplateRef<any>>('footer');
}
