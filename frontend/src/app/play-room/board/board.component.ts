import { Component, Input, inject } from '@angular/core';
import { GameService } from '../../core/services/game.service';
import { PlayerService } from '../../core/services/player.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  gameService = inject(GameService)
  playerService = inject(PlayerService)

  @Input() game: any

  onMove(x: number, y: number) {
    console.log(
      this.game.turn !== this.playerService.getUserSymbol(this.game),
      this.game.board[x][y] !== '',
      !this.checkNear(x, y) && this.game.extendable
    )
    if (this.game.turn !== this.playerService.getUserSymbol(this.game)) return
    if (this.game.board[x][y] !== '') return
    if (!this.checkNear(x, y) && this.game.extendable) return
    this.gameService.move({
      gameId: this.game.id,
      x,
      y
    })
  }

  outOfBorder(x : number, y : number) {
    return y < 0 || x < 0 || y >= this.game.board[0].length || x >= this.game.board.length
  }

  checkNear(x: number, y: number) {
    let mut = [
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]
    return mut.some(m => {
      if (this.outOfBorder(x - m[0], y - m[1])) return false
      return this.game.board[x - m[0]][y - m[1]] !== '' && !this.outOfBorder(x - m[0], y - m[1])
    })
  }


}
