import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UserService } from '../../services/user.service';

/* Como Lo Estoy Importando desde el index.html de una libreria(JS) debo aplicar lo siguiente */
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public formSubmitted = false;
  public auth2: any;

  public loginForm = this.formBuilder.group({
    email: [
      localStorage.getItem('email') || '',
      [Validators.required, Validators.email],
    ],
    password: ['', [Validators.required]],
    remember: [false],
  });

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.renderButton();
  }

  campoNoValido(campo: string): boolean {
    if (this.loginForm.get(campo).invalid && this.formSubmitted) {
      return true;
    }
  }

  login() {
    this.formSubmitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.userService.loginUser(this.loginForm.value).subscribe(
      (res) => {
        if (this.loginForm.get('remember').value) {
          localStorage.setItem('email', this.loginForm.get('email').value);
        } else {
          localStorage.removeItem('email');
        }
        // console.log(res);
        this.router.navigateByUrl('/');
      },
      (err) => {
        // console.log(err);
        Swal.fire('Error', err.error.error, 'error');
      }
    );
  }

  /* LOGIN FORMA UNO */
  /* PARA VANILLA JS, SIN CLASES */
  /* onSuccess(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    const id_token = googleUser.getAuthResponse().id_token;
    console.log(id_token);
  }

  onFailure(error) {
    console.log(error);
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
      onsuccess: this.onSuccess,
      onfailure: this.onFailure,
    });
  } */

  /* LOGIN CORRECCIÓN DE LOS CONTEXTOS(this.onSuccess y this.onFailure)*/
  /* Personalización Del Boton, Mayor Control, Para No Perder La Referencia Al This De Mis Clases */
  renderButton() {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
    });

    this.startApp();
  }

  startApp() {
    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id:
          '24949782543-qggl9q7i27ohmb15sb0p33v1435fjbgg.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
      });
      this.attachSignin(document.getElementById('my-signin2'));
    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(
      element,
      {},
      (googleUser) => {
        const id_token = googleUser.getAuthResponse().id_token;
        this.userService
          .loginUserGoogle(id_token)
          .subscribe((res) => this.router.navigateByUrl('/'));
      },
      (error) => {
        alert(JSON.stringify(error, undefined, 2));
      }
    );
  }
}
