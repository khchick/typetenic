const express = require('express');
const bodyParser = require('body-parser');
const flash = require('connect-flash');


module.exports = (knex, redisClient)=>{
    let app = express();
    let server = require('http').Server(app);
    let io = require('socket.io')(server);
    app.use(express.static("public"));
    app.use(flash());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    require('./init-sessions')(app,io,redisClient);
    require('./init-passport')(app,knex);

    return{
        app : app,
        server: server,
        io: io
    }
}