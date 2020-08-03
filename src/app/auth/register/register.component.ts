import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public formSubmitted = false;
  public registerForm = this.formBuilder.group(
    {
      name: ['', [Validators.minLength(3), Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      password2: ['', [Validators.required]],
      terms: [false, [Validators.required]],
    },
    {
      validators: this.passwordsIguales('password', 'password2'),
    }
  );

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  createUser() {
    this.formSubmitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.userService.createUser(this.registerForm.value).subscribe(
      (res) => {
        // console.log(res);
        this.router.navigateByUrl('/login');
      },
      (err) => {
        // console.log(err);
        Swal.fire('Error', err.error.error, 'error');
      }
    );
  }

  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo).invalid && this.formSubmitted) {
      return true;
    }
  }

  contrasenasNoValidas() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if (
      (pass1 !== pass2 || pass1 === '' || pass2 === '') &&
      this.formSubmitted
    ) {
      return true;
    } else {
      return false;
    }
  }

  /* VALIDADOR SINCRONO */
  passwordsIguales(pass1Name: string, passName2: string) {
    return (formGroup: FormGroup) => {
      /* Aqui Ya tengo Los Campos Del Fomulario */
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(passName2);

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }
    };
  }

  aceptarTerminos() {
    /* No Olvidar Que Esto Es Un Valor Booleano */
    return !this.registerForm.get('terms').value && this.formSubmitted;
  }
}
