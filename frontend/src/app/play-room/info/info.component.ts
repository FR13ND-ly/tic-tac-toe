import { Component, inject, Input } from '@angular/core';
import { Game } from 'src/app/core/models/game.';
import { PlayerService } from 'src/app/core/services/player.service';

@Component({
  selector: 'game-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {

  playerService = inject(PlayerService)
  
  @Input() game! : Game

}
