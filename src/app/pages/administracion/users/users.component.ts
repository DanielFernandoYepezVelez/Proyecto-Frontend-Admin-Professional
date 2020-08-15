import { Component, OnInit, OnDestroy } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { UserService } from '../../../services/user.service';
import { SearchsService } from '../../../services/searchs.service';
import { ModalImageService } from '../../../services/modal-image.service';

import { User } from 'src/app/auth/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit, OnDestroy {
  public total: number;
  public users: User[];
  public usersTemp: User[];
  public desde = 0;
  public cargando: boolean;
  public imgSubs: Subscription;

  constructor(
    private userService: UserService,
    private searchService: SearchsService,
    private modalImageService: ModalImageService
  ) {}

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.getUsers();

    this.imgSubs = this.modalImageService.newImage
      .pipe(delay(100))
      .subscribe((img) => {
        this.getUsers();
      });
  }

  getUsers() {
    this.cargando = true;

    this.userService
      .getAllUsers(this.desde)
      .subscribe(({ totalUsers, usersFinal }) => {
        this.total = totalUsers;
        this.users = usersFinal;
        this.usersTemp = usersFinal;

        this.cargando = false;
      });
  }

  cambiarPagina(valor: number) {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.total) {
      this.desde -= valor;
    }

    this.getUsers();
  }

  searchInput(term: string) {
    if (term.length === 0) {
      return (this.users = this.usersTemp);
    }

    this.searchService.search('users', term).subscribe((results) => {
      this.users = results;
    });
  }

  deleteUser(user: User) {
    if (user.id === this.userService.idUser) {
      return Swal.fire('Error', 'No Puede Borrarse A Si Mismo', 'error');
    }

    Swal.fire({
      title: '¿Deseas Eliminarlo?',
      text: `Estas Seguro Que Quieres Eliminar ${user.name}!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminarlo!',
    }).then((result) => {
      if (result.value) {
        this.userService.deleteUser(user).subscribe((res) => {
          console.log(res);

          Swal.fire({
            title: `Usuario ${user.name} Eliminado`,
            icon: 'success',
          });

          this.getUsers();
        });
      }
    });
  }

  changeRole(user: User) {
    this.userService.saveRoleUser(user).subscribe((res) => console.log(res));
  }

  abrirModal(user: User) {
    this.modalImageService.showModal('users', user.id, user.img);
  }
}
