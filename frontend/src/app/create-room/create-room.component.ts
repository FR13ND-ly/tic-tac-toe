import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from '../core/services/player.service';
import { GameService } from '../core/services/game.service';
import { Game } from '../core/models/game.';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent {
  
  router = inject(Router)
  playerService = inject(PlayerService)
  gameService = inject(GameService)

  onInputName(name: string) {
    this.playerService.setUsername(name)  
  }

  game: Game = {
    id: this.gameService.getGameId(),
    user1: {
      name: this.playerService.getUsername(),
      id: this.playerService.getOrCreateId(),
    },
    user2: {
      name: '',
      id: '',
    },
    turn : '',
    firstPlayer : '',
    winner: '',
    winLength : 3,
    extendable: false,
    moveNumber: 0,
    connections: [],
    board : [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]
  }


  onCreateGame() {
    if (this.game.user1.name === '') return alert('Please input your name')
    if (this.game.winLength < 3) return alert('Streak length must be at least 3')
    this.game.extendable = this.game.winLength > 3
    this.gameService.newGame(this.game)
    this.router.navigate(['/play', this.game.id])
  }
}
