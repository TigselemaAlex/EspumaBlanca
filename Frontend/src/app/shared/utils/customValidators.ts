import {
  AbstractControl,
  AbstractControlOptions,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';

export const ecuadorianIdValidator = (): ValidatorFn => {
  return (control: AbstractControl) => {
    const dni = control.value as string;

    if (!dni || typeof dni !== 'string' || !/^\d{10}$|^\d{13}$/.test(dni)) {
      return { invalidCi: true };
    }

    const provinceCode = parseInt(dni.substring(0, 2), 10);
    if (provinceCode < 1 || provinceCode > 24) {
      return { invalidCi: true };
    }

    const digits = dni.split('').map(Number);
    const checksumDigit = digits.pop();
    let sum = 0;
    let modulus = 10;

    const isValid = (multiplier: number, index: number) => {
      let product = digits[index] * multiplier;
      if (product >= 10) product -= 9;
      return product;
    };

    if (digits[2] < 6) {
      for (let i = 0; i < digits.length; i++) {
        sum += isValid(i % 2 === 0 ? 2 : 1, i);
      }
    } else if (digits[2] === 6) {
      modulus = 11;
      const multipliers = [3, 2, 7, 6, 5, 4, 3, 2];
      sum = digits.reduce((acc, digit, i) => acc + digit * multipliers[i], 0);
    } else if (digits[2] === 9) {
      modulus = 11;
      const multipliers = [4, 3, 2, 7, 6, 5, 4, 3, 2];
      sum = digits.reduce((acc, digit, i) => acc + digit * multipliers[i], 0);
    } else {
      return { invalidCi: true };
    }

    const remainder = sum % modulus;
    const expectedChecksum = remainder === 0 ? 0 : modulus - remainder;

    if (expectedChecksum !== checksumDigit) {
      return { invalidCi: true };
    }

    if (digits[2] === 6 && dni.substr(9, 4) !== '0001') {
      return { invalidCi: true };
    }

    if (
      (digits[2] === 9 || digits[2] < 6) &&
      dni.length === 13 &&
      dni.substr(10, 3) !== '001'
    ) {
      return { invalidCi: true };
    }

    return null;
  };
};

export const passwordValidator = (): ValidatorFn => {
  return (control: AbstractControl) => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (password && confirmPassword) {
      const mismatch = password !== confirmPassword;
      if (mismatch) {
        control.get('confirmPassword')?.setErrors({ mismatch: true });
      }
    }
    return null;
  };
};
