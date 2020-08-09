import { Component, OnInit } from '@angular/core';

import { User } from '../../auth/models/user.model';

import { SidebarService } from '../../services/sidebar.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  public user: User;
  public menuItems: any[];

  constructor(
    private sidebarService: SidebarService,
    private userService: UserService
  ) {
    this.menuItems = this.sidebarService.menu;
    this.user = this.userService.user;
  }

  ngOnInit(): void {}
}
