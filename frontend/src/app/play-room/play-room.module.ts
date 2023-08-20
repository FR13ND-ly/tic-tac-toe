import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayRoomComponent } from './play-room.component';
import { BoardComponent } from './board/board.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { OverlayComponent } from './overlay/overlay.component';
import { InfoComponent } from './info/info.component';



@NgModule({
  declarations: [
    PlayRoomComponent,
    BoardComponent,
    PlaceholderComponent,
    HeaderComponent,
    OverlayComponent,
    InfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: PlayRoomComponent }
    ])
  ]
})
export class PlayRoomModule { }
