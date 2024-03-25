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
    link: '/agol/dashboard',
  },
  {
    id: 31,
    label: 'MENUITEMS.AGOL.REPORTS.TEXT',
    link: '/agol/report',
  },
];
