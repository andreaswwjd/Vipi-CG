
export default {
  /* 
  EFS_Datum: {
    component: () => import('./EFS/Datum'),
    title: 'Datum',
    placeholders: { f0:'Plats', f1:'Tidpunkt' },
  },
  EFS_LivsvagTitle: {
    component: () => import('./EFS/LivsvagTitle'),
    title: 'Titel (Livsväg)',
    placeholders: { f0:'Rubrik', f1:'Tema', f2:'etc.' },
  },
  EFS_LowerThird: {
    component: () => import('./EFS/LowerThird'),
    title: 'Titel (Lower third)',
    placeholders: { f0:'Rubrik',f1:'Talare',f2:'etc.',f3:'Tema' },
  },
  EFS_Namnskylt: {
    component: () => import('./EFS/Namnskylt'),
    title: 'Namnskylt',
    placeholders: { f0:'Namn',f1:'Titel' },
  },
  EFS_Notis: {
    component: () => import('./EFS/Notis'),
    title: 'Notis',
    placeholders: { f0:'i', f1:'Typ (fet stil)', f2:'Notis' },
  },
  EFS_Swish: {
    component: () => import('./EFS/Swish'),
    title: 'Swish',
    placeholders: { f0:'Swish', f1:'Bg', f2:'Hemsida' },
  },
  EFS_Tema: {
    component: () => import('./EFS/Tema'),
    title: 'Tema',
    placeholders: { f0:'Tema/Sammanhang' },
  },
  EFS_Title: {
    component: () => import('./EFS/Title'),
    title: 'Titel (fullskärm)',
    placeholders: { f0:'Rubrik', f1:'Tema', f2:'etc.' },
  },
  EFS_Bibelord: {
    component: () => import('./EFS/Bibelord'),
    title: 'Bibelord',
    placeholders: { f0:'Text', f1:'Referens' },
  },
  */
  FKAB_Namnskylt: {
    component: () => import('./FKAB/Namnskylt'),
    title: 'Namnskylt (FKAB)',
    placeholders: { f0:'Namn',f1:'Titel' },
  },
  FKAB_Datum: {
    component: () => import('./FKAB/Datum'),
    title: 'Datum (FKAB)',
    placeholders: { f0:'Plats', f1:'Tidpunkt' },
  },
  FKAB_Notis: {
    component: () => import('./FKAB/Notis'),
    title: 'Notis (FKAB)',
    placeholders: { f0:'i', f1:'Typ (fet stil)', f2:'Notis' },
  },
  FKAB_Title: {
    component: () => import('./FKAB/Title'),
    title: 'Titel (FKAB)',
    placeholders: { f0:'Rubrik',f1:'Talare',f2:'etc.',f3:'Tema' },
  },
}
