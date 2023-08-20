import { Component, inject } from '@angular/core';
import { GameService } from '../core/services/game.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PlayerService } from '../core/services/player.service';
import { Location } from '@angular/common';
import { Game } from '../core/models/game.';

@Component({
  selector: 'app-play-room',
  templateUrl: './play-room.component.html',
  styleUrls: ['./play-room.component.scss']
})
export class PlayRoomComponent {
  
  gameService = inject(GameService)
  playerService = inject(PlayerService)
  route = inject(ActivatedRoute)
  router = inject(Router)
  location = inject(Location)

  username = this.playerService.getUsername()

  game$: Observable<Game> = this.route.params.pipe(
    switchMap((params : any)=> {
      if (this.route.snapshot.data['join']) this.join(params.id)
      return this.gameService.exists(params.id).pipe(
        switchMap((exists : any) => {
          if (!exists) {
            alert("Game not found")
            return this.router.navigate(['/'])
          }
          return this.gameService.getGame(params.id).pipe(
            tap(console.log)
          )
        })
      )
    })
  )

  join(gameId: string) {
    this.gameService.exists(gameId).subscribe((exists : boolean): Promise<boolean> | void => {
      if (!exists) {
        alert('Game not found')
        return this.router.navigate(['/'])
      }
      let data = {
        user : {
          name: this.playerService.getUsername(),
          id: this.playerService.getOrCreateId(),
        },
        gameId
      }
      this.gameService.joinGame(data)
      this.location.replaceState(`/play/${gameId}`)
    })    
  }
  
}
