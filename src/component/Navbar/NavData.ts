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
    label: 'USER',
    icon: 'ki-user',
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
  {
    id: 8,
    type: 'section',
    label: 'MISCELLANEOUS',
  },
  {
    id: 9,
    label: 'My manager',
    path: '#',
    icon: 'ki-some-files',
    adminOnly: true,
    children: [
      {
        id: 10,
        label: 'StatickImg',
        path: '/admin-meneger',
      },
      {
        id: 11,
        label: 'DynamicGif',
        path: '/admin-meneger-gif',
      },
    ],
  },
]
