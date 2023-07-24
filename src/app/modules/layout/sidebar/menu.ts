export const Menus = [
  { title: 'Dashboard', icon: '', link: '/home' },
  { title: 'Pages', icon: '', link: '/com' },
  { title: 'Media', icon: '', link: 'FA', spacing: true },
  {
    title: 'Projects',
    icon: '',
    link: '',
    submenu: true,
    submenuItems: [
      { title: 'Submenu 1' },
      { title: 'Submenu 2' },
      { title: 'Submenu 3' },
    ],
  },
  { title: 'Analytics', icon: '', link: '' },
  { title: 'Profile', icon: '', link: '', spacing: true },
  { title: 'Setting', icon: '', link: '' },
  { title: 'Logout', icon: '', link: '' },
];
