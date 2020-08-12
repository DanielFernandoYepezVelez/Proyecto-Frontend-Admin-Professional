import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../services/user.service';

import { User } from 'src/app/auth/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  public total: number;
  public users: User[];
  public desde = 0;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService
      .getAllUsers(this.desde)
      .subscribe(({ totalUsers, users }) => {
        this.total = totalUsers[0].Total;
        this.users = users;
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
}
