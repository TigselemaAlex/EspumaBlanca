import { FormGroup } from '@angular/forms';

export function getErrorMessage(
  controlName: string,
  form: FormGroup
): string | null {
  const control = form.get(controlName);
  if (control && control.errors) {
    if (control.hasError('required')) return 'Es obligatorio';
    if (control.hasError('email')) return 'Email inválido';
    if (control.hasError('minlength'))
      return `Mínimo  ${control.errors['minlength'].requiredLength} caracteres`;
    if (control.hasError('maxlength'))
      return `Máximo  ${control.errors['maxlength'].requiredLength} caracteres`;
    if (control.hasError('min')) return `Mínimo ${control.errors['min'].min}`;
    if (control.hasError('max')) return `Máximo ${control.errors['max'].max}`;
    if (control.hasError('pattern')) return 'Valor inválido';
    if (control.hasError('lowerDate')) return 'La fecha debe ser mayor';
    if (control.hasError('invalidCi')) return 'Cédula inválida';
    if (control.hasError('mismatch')) return 'Las contraseñas no coinciden';
  }
  console.log('no hay error');
  return null;
}
