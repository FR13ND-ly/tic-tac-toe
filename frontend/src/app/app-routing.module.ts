import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./landing-page/landing-page.module').then(m => m.LandingPageModule) },
  { path: 'create', loadChildren: () => import('./create-room/create-room.module').then(m => m.CreateRoomModule) },
  { path: 'play/:id', loadChildren: () => import('./play-room/play-room.module').then(m => m.PlayRoomModule) },
  { path: 'join/:id', loadChildren: () => import('./play-room/play-room.module').then(m => m.PlayRoomModule), data: { join: true} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
