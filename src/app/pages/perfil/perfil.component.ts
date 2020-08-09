import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UserService } from '../../services/user.service';
import { FileUploadService } from '../../services/file-upload.service';

import { User } from 'src/app/auth/models/user.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [],
})
export class PerfilComponent implements OnInit {
  public profileForm: FormGroup;
  public user: User;
  public imgUpload: File;
  public imgTemp = null;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private fileUploadService: FileUploadService
  ) {
    this.user = userService.user;
  }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
    });
  }

  updateProfile() {
    this.userService.updateProfile(this.profileForm.value).subscribe(
      () => {
        const { name, email } = this.profileForm.value;
        /* Esto Cambia En La Pantalla Principal, Porque todos los
        objetos en JS, Son Pasados Por Referencia, En todas Partes
        donde exista la propiedad name, y email, se va actualizar
        al nuevo valor que viene del formulario profileForm */
        this.user.name = name;
        this.user.email = email;

        Swal.fire('Guardado', 'Cambios Exitosos', 'success');
      },
      (err) => {
        Swal.fire('Error', 'Cambios NO Exitosos', 'error');
      }
    );
  }

  selectImage(file: File) {
    this.imgUpload = file;

    if (!file) {
      return (this.imgTemp = null);
    }

    /* Estoy Creando Una Imagen Tempral Solo Para La Vista
    Del Frontend */
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }

  imgLoading() {
    /* Este Servico Es Una Promesa */
    this.fileUploadService
      .updatePhoto(this.imgUpload, 'users', this.user.id)
      .then((res) => {
        this.user.img = res;
        Swal.fire('Guardado', 'Cambios Exitosos', 'success');
      })
      .catch((err) => {
        // console.log(err);
        Swal.fire('Error', 'Cambios NO Exitosos', 'error');
      });
  }
}
