import { Component, inject, Input, OnInit } from '@angular/core';
import { Game } from 'src/app/core/models/game.';
import { PlayerService } from 'src/app/core/services/player.service';

@Component({
  selector: 'play-room-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() game! : Game

  playerService = inject(PlayerService)
  username : string = ''
  state : string = 'watching'

  ngOnInit(): void {
    this.username = this.playerService.getUsername()
    this.state = this.playerService.getUserSymbol(this.game)
  }

  

}
