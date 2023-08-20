import { Component, inject } from '@angular/core';
import { PlayerService } from './core/services/player.service';
import { GameService } from './core/services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  playerService = inject(PlayerService)
  gameService = inject(GameService)

}
