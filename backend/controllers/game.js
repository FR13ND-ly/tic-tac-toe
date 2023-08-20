const { Board } = require("./board");

class GamesFactory {
    games = {}

    getById(id, socket) {
        this.games[id].connections.push(socket)
        this.sendGame(id)
    }

    sendGame(id) {
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
        if (game['user2'].id == '' && game['user1'].id != data.user.id) {
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
            let noWatchers = !game.connections.length
            return finished && noWatchers
        })
        disgames.forEach(game => {
            delete this.games[game.id]
        })
    }
}

module.exports = {
    GamesFactory
};