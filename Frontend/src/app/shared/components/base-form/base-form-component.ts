import { inject } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormContainerOptions } from '../../../core/models/system/form-container-options';

export abstract class BaseFormComponent {
  protected readonly fb = inject(NonNullableFormBuilder);
  protected readonly router = inject(Router);
  protected readonly activatedRoute = inject(ActivatedRoute);
  protected readonly messageService = inject(MessageService);

  protected id?: number;
  protected dataToPatch?: any;

  protected options: FormContainerOptions = {} as FormContainerOptions;

  protected navigateToList(title: string): void {
    this.messageService.add({
      severity: 'success',
      summary: title,
    });
    if (this.options.cancelLink)
      this.router.navigateByUrl(this.options.cancelLink);
  }

  abstract save(data: any): void;
  abstract initForm(): void;
}
