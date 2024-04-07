import { MenuItem } from "../common-menu/menu.model";

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'MENUITEMS.MENU.TEXT',
    isTitle: true
  },
  {
    id: 30,
    label: 'MENUITEMS.AGOL.DASHBOARD.TEXT',
    icon: 'ri-home-3-line',
    link: '/agol/dashboard',
  }, 
  {
    id: 31,
    label: 'MENUITEMS.AGOL.REPORTS.TEXT',
    link: '/agol/report',
    icon: ' ri-file-text-line',
  },
  {
    id: 32,
    label: 'MENUITEMS.AGOL.CATALOGS.TEXT',
    icon: ' ri-list-check',
    subItems : [
      {
        id: 33,
        label: 'MENUITEMS.AGOL.CATALOGS.STATUS',
        // icon: 'ri-calendar-check-line',
        link: 'agol/catalogs/order-status',
        parentId: 32
      }
    ]
  },
];
