import { Component, inject, Input } from '@angular/core';
import { Game } from 'src/app/core/models/game.';
import { GameService } from 'src/app/core/services/game.service';
import { PlayerService } from 'src/app/core/services/player.service';

@Component({
  selector: 'game-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {

  playerService = inject(PlayerService)
  gameService = inject(GameService)
  
  @Input() game! : Game

  onResign() {
    if (!confirm("Are you sure?")) return
    let data = {
      winner : this.playerService.getUserSymbol(this.game) == 'X' ? 'O' : 'X',
      gameId : this.game.id
    }
    this.gameService.resign(data)
  }
}
