import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menuPrincipal = [
    { icon : 'home', name: 'Inicio', route: 'home' },
    { icon : 'article', name: 'Catálogo', route: '', submenu: [
      { icon : 'group', name: 'Usuarios', route: 'users' },
      { icon : 'foundation', name: 'Fundaciones', route: 'fundaciones' },
    ] }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
