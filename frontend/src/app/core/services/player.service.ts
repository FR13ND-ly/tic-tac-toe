import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  

  getUsername() {
    return localStorage.getItem('username') || 'John Doe';
  }

  setUsername(username: string) {
    localStorage.setItem('username', username);
  }

  getOrCreateId() : string {
    if (localStorage.getItem('playerId') === null) {
      localStorage.setItem('playerId', this.generateId());
    }
    return <string>localStorage.getItem('playerId');
  }

  getUserSymbol(game : any) {
    if (game.user1.id === this.getOrCreateId()) {
      return 'X'
    } else if (game.user2.id === this.getOrCreateId()) {
      return 'O'
    }
    return 'watching'
  }

  generateId() {
    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    var uniqid = randLetter + Date.now()
    return uniqid;
  }
}
