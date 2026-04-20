import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { AlbumComponent } from './features/album/album.component';
import { AuthComponent } from './features/auth/auth.component';
import { AdminComponent } from './features/admin/admin.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'album/:id', component: AlbumComponent },
  { path: 'mon-compte', component: AuthComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', redirectTo: '' }
];