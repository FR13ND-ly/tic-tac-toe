class Board {

    game

    constructor(game) {
        this.game = game
    }


    onMove(x, y) {
        this.game.board[x][y] = this.game.turn
        this.game.moveNumber++
        this.checkWin(x, y)
        this.changeTurn()
        if (this.game.extendable && this.checkBorder(x, y)) {
          this.extendBoard(x, y)
        }
        if (!this.game.extendable && !this.game.winner) {
          this.checkDraw();
        }
        return this.game
      }

    
      checkDraw() {
        if (this.game.moveNumber === this.game.board.length * this.game.board[0].length) {
          this.game.winner = 'draw'
        }
      }
    
      changeTurn() {
        this.game.turn = this.game.turn === 'X' ? 'O' : 'X';
      }
    
      checkBorder(x, y) {
        return y === 0 || x === 0 || y === this.game.board[0].length - 1 || x === this.game.board.length - 1
      }
    
      outOfBorder(x, y) {
        return y < 0 || x < 0 || y >= this.game.board[0].length || x >= this.game.board.length
      }
    
      checkNear(x, y) {
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
    
      extendBoard(x, y) {
        if (x === 0) {
          this.game.board.unshift(new Array(this.game.board[0].length).fill(''))
        }
        if (y === 0) {
          this.game.board.forEach((row) => row.unshift(''))
        }
        if (x === this.game.board.length - 1) {
          this.game.board.push(new Array(this.game.board[0].length).fill(''))
        }
        if (y === this.game.board[0].length - 1) {
          this.game.board.forEach((row) => row.push(''))
        }
      }
    
      winGame() {
        this.game.winner = this.game.turn
      }
    
    
      checkWin(x, y) {
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
        
        let win = mut.some(m => this.game.winLength <= this.checkDiag(x, y, m[0], m[1]))
    
        if (win) {
          this.winGame()
        }
      }
    
      checkDiag(x, y, i, j) {
        let value = this.game.board[x][y]
        let streak = -1
        let xPos = x
        let yPos = y
        while (!this.outOfBorder(xPos, yPos)) {
          if (this.game.board[xPos][yPos] !== value) break
          streak++
          xPos = xPos + i
          yPos = yPos + j
        }
        xPos = x;
        yPos = y;
        while (!this.outOfBorder(xPos, yPos)) {
          if (this.game.board[xPos][yPos] !== value) break
          streak++
          xPos = xPos - i
          yPos = yPos - j
        }
        return streak
      }
}

module.exports = {
    Board
}