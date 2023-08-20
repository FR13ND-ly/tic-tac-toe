const { Board } = require("./board");

class GamesFactory {
    games = {}

    getById(id, socket) {
        this.games[id].connections.push(socket)
        this.sendGame(id)
    }

    sendGame(id) {
        if (!this.games[id]) return
        this.games[id].connections.forEach(socket => {
            let game = {...this.games[id]}
            game.connections = null
            socket.emit('game', JSON.stringify(game))
        })
    }
    
    new(game) {
        if (game.firstPlayer == 'r' || game.firstPlayer == '') {
            game.turn = Math.random() < 0.5 ? 'X' : 'O';
        }
        else {
            game.turn = game.firstPlayer;
        }
        if (game.extendable) {
            game.board = [
                ['','',''],
                ['',game.turn,''],
                ['','','']
            ]
            game.turn = game.turn == 'X' ? 'O' : 'X';
            game.moveNumber = 1;
        }
        this.games[game.id] = game;
    }
    
    join(data) {
        const game = this.games[data.gameId];
        if (game['user1'].id == '' && game['user2'].id != data.user.id) {
            game['user1'] = data.user;
        }
        else if (game['user2'].id == '' && game['user1'].id != data.user.id) {
            game['user2'] = data.user;
        }
        this.games[game.id] = game;
        this.sendGame(game.id)
    }

    exists(id) {
        return this.games[id] != undefined;
    }

    move(data) {
        const game = this.games[data.gameId];
        const board = new Board(game);
        this.games[data.gameId] = board.onMove(data.x, data.y)
        if (this.games[data.gameId].winner != '') this.createNextGame(this.games[data.gameId])
        this.sendGame(data.gameId)
    }

    createNextGame(game) {
        let id = this.getGameId()
        let newGame = {
            id,
            user1: {
                id: '',
                name: ''
            },
            user2: {
                id : '',
                name: '',
            },
            turn : "",
            firstPlayer : '',
            winner: '',
            winLength : game.winLength,
            extendable: game.extendable,
            moveNumber: 0,
            nextGame: '',
            connections: [],
            board : [
              ['', '', ''],
              ['', '', ''],
              ['', '', '']
            ]
        }
        this.new(newGame)
        this.games[game.id].nextGame = id
        this.sendGame(game.id)
    }

    getGameId() {
        var randLetter1 = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        var randLetter2 = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        var uniqid = randLetter1 + randLetter2 + Date.now().toString().slice(-4)
        return uniqid;
    }  

    resign(data) {
        const game = this.games[data.gameId]
        game.winner = data.winner
        this.createNextGame(game)
        this.sendGame(data.gameId)
    }

    disconnect(socket) {
        let disgames = Object.values(this.games).filter(game => {
            let check = game.connections.find(connection => {
                return connection.id == socket.id
            })
            return !!check
        })
        disgames = disgames.filter(game => {
            this.games[game.id].connections.splice(
                this.games[game.id].connections.indexOf(socket),
                1
            )
            let finished = game.winner != ''
            let disconnected = !game.connections.length
            return finished && disconnected
        })
        disgames.forEach(game => {
            delete this.games[game.id]
        })
    }
}

module.exports = {
    GamesFactory
};