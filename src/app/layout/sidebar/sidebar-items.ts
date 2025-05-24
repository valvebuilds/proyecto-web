import { ROLES } from '@shared/models/enums';
import { RouteInfo } from './sidebar.metadata';
import { MatIconModule } from '@angular/material/icon';

export const ROUTES: RouteInfo[] = [
  {
    path: '/dashboard/main',
    title: 'Inicio',
    iconType: 'material-icons-outlined',
    icon: 'home',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
    rolAuthority: [1, 2]
  },
  {
    path: '/page/projects',
    title: 'Gestión de proyectos',
    iconType: 'material-icons-outlined',
    icon: 'assessment',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
    rolAuthority: [1]
  },  
  {
    path: '/page/users',
    title: 'Gestión de usuarios',
    iconType: 'material-icons-outlined',
    icon: 'assessment',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
    rolAuthority: [1]
  },
  {
    path: '/page/projects',
    title: 'Mis proyectos',
    iconType: 'material-icons-outlined',
    icon: 'assessment',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
    rolAuthority: [2]
  },  
];
