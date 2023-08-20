import { Component, Input, OnInit, OnChanges, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/app/core/models/game.';

@Component({
  selector: 'play-room-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit, OnChanges {

  router = inject(Router)

  @Input() game! : Game
  invitationLink: string = ''
  state: string = "waiting"

  ngOnInit(): void {
    this.invitationLink = `${window.location.origin}/join/${this.game.id}`
    
  }

  ngOnChanges() {
    if (!this.game.user2.id) this.state = 'waiting'
    else this.state = ''
    if (this.game.winner == 'X') this.state = 'X won'
    if (this.game.winner == 'O') this.state = 'O won'
    if (this.game.winner == 'draw') this.state = 'draw'
  }
  
  copyToClipboard() {
    navigator.clipboard.writeText(this.invitationLink)
  }

  onNextGame() {
    this.router.navigate(['join', this.game.nextGame])
  }
}
