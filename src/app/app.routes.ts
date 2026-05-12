import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Album } from './features/album/album';
import { Auth } from './features/auth/auth';
import { Admin } from './features/admin/admin';


export const routes: Routes = [
  { path: '', component: Home},
  { path: 'album/:id', component: Album },
  { path: 'mon-compte', component: Auth },
  { path: 'admin', component: Admin },
  { path: '**', redirectTo: '' }
];