import { Injectable, inject } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private socket = inject(Socket)
  private http = inject(HttpClient)


  private game$ = this.socket.fromEvent('game').pipe(
    map((res: any) => {
      return JSON.parse(res)
    }),
  );

  getGame(id: string) {
    this.socket.emit('getGame', id);
    return this.game$
  }

  newGame(game: any) {
    console.log(game)
    this.socket.emit('newGame', game);
  }
  
  joinGame(player: any) {
    this.socket.emit('joinGame', player);
  }

  getGameId() {
    var randLetter1 = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    var randLetter2 = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    var uniqid = randLetter1 + randLetter2 + Date.now().toString().slice(-4)
    return uniqid;
  }   

  exists(id : string) {
    return this.http.get(`${environment.api}/exists/${id}`) as Observable<boolean>
  }

  resign(data: any) {
    this.socket.emit('resign', data);
  }
  
  move(data: any) {
    this.socket.emit('move', data);
  }
}
