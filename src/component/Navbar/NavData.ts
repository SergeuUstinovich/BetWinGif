import { ScrollSpy } from '../ScrollSpy'

export const navItems = [
  {
    id: 1,
    label: 'Static banner',
    path: '/',
    icon: 'ki-note',
  },
  {
    id: 2,
    label: 'Gif banner',
    path: '/gif-banners',
    icon: 'ki-note-2',
  },
  {
    id: 3,
    label: 'Football/Sport',
    path: '#',
    icon: 'ki-calculatoror',
    children: [
      {
        id: 4,
        label: 'Submenu item 1',
        path: '#',
        icon: 'ki-user-square',
      },
    ],
  },
  {
    id: 5,
    label: 'User',
    path: '#',
    children: [
      {
        id: 6,
        label: 'Setting',
        path: '#',
        icon: 'ki-setting-2',
        children: [
          {
            id: 7,
            component: ScrollSpy,
          },
        ],
      },
    ],
  },
]
