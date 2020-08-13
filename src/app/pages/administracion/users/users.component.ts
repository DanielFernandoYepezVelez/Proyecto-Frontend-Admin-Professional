import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { UserService } from '../../../services/user.service';
import { SearchsService } from '../../../services/searchs.service';

import { User } from 'src/app/auth/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  public total: number;
  public users: User[];
  public usersTemp: User[];
  public desde = 0;
  public cargando: boolean;

  constructor(
    private userService: UserService,
    private searchService: SearchsService
  ) {}

  ngOnInit(): void {
    this.getUsers();
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
}
