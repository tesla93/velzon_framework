import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'MENUITEMS.MENU.TEXT',
    isTitle: true
  },
  {
    id: 30,
    label: 'MENUITEMS.AGOL.DASHBOARD.TEXT',
    icon: 'home',
    link: '/agol/dashboard',
  }, 
  {
    id: 31,
    label: 'MENUITEMS.AGOL.REPORTS.TEXT',
    link: '/agol/report',
    icon: 'layers',
  },
  {
    id: 32,
    label: 'MENUITEMS.AGOL.CATALOGS.TEXT',
    icon: 'package',
    subItems : [
      {
        id: 33,
        label: 'MENUITEMS.AGOL.CATALOGS.STATUS',
        link: '/catalogs/status',
        parentId: 32
      }
    ]
  },
];
