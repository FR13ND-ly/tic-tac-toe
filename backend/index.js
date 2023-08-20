const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origins: ['http://localhost:4200']
    }}
);
const factory =  require('./controllers/game');
const cors = require('cors');
const gameFactory = new factory.GamesFactory();

app.use(cors())

io.on("connection", socket => {

    socket.on("getGame", (id) => {
        gameFactory.getById(id, socket);
    });
    
    socket.on("newGame", game => {
        gameFactory.new(game);
    });

    socket.on("move", data => {
        gameFactory.move(data);
    });
    
    socket.on("joinGame", data => {
        gameFactory.join(data);
    });

    socket.on("disconnect", () => {
        gameFactory.disconnect(socket)
    });
});

app.get('/exists/:id', (req, res) => {
    res.send(gameFactory.exists(req.params.id));
});


http.listen(5000, () => {
    console.log('Listening on port 5000');
});