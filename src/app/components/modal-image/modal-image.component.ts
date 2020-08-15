import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { ModalImageService } from '../../services/modal-image.service';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [],
})
export class ModalImageComponent implements OnInit {
  public imgUpload: File;
  public imgTemp = null;

  constructor(
    public modalImageService: ModalImageService,
    public fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {}

  cerrarModal() {
    this.imgTemp = null;
    this.modalImageService.closeModal();
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
    const id = this.modalImageService.id;
    const tipo = this.modalImageService.tipo;

    /* Este Servico Es Una Promesa */
    this.fileUploadService
      .updatePhoto(this.imgUpload, tipo, id)
      .then((img) => {
        Swal.fire('Guardado', 'Cambios Exitosos', 'success');
        this.modalImageService.newImage.emit(img);
        this.cerrarModal();
      })
      .catch((err) => {
        // console.log(err);
        Swal.fire('Error', 'Cambios NO Exitosos', 'error');
      });
  }
}
