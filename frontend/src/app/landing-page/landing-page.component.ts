import { Component, inject } from '@angular/core';
import { PlayerService } from '../core/services/player.service';
import { GameService } from '../core/services/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {

  playerService = inject(PlayerService)
  gameService = inject(GameService)
  router = inject(Router)
  
  data = {
    user : {
      name: this.playerService.getUsername(),
      id: this.playerService.getOrCreateId(),
    },
    gameId : ''
  }

  start: boolean = true
  continue: boolean = false

  onContinue() {
    this.gameService.exists(this.data.gameId).subscribe((exists : boolean) => {
      if (!exists) return alert('Game not found')
      this.continue = true
    })
  }

  onInputName(name: string) {
    this.playerService.setUsername(name)  
  }

  onEnter() {
    if (this.data.user.name === '') return alert('Please input your name')
    this.gameService.joinGame(this.data)
    this.router.navigate(['/play', this.data.gameId])
  }
}
