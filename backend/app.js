// General Initialization
require('dotenv').config();
const NODE_ENV = process.env.NODE_ENV || 'development'
const knexFile = require('./knexfile')[NODE_ENV]
const knex = require('knex')(knexFile)
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jwt-simple')
const axios = require('axios');
const authClass = require('./utils/auth')
const config = require('./utils/config')
const https = require('https')

const app = express();
const auth = authClass();

let server = require('http').Server(app);
let io = require('socket.io')(server);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(auth.initialize());

// Dependency Injection for Routers and Services
const { ConnectionRouter,
    UserRouter,
    SocketIORouter } = require('./routers');

const { ConnectionService,
    UserService } = require('./services');

let connectionService = new ConnectionService(knex);
let userService = new UserService(knex);

app.use('/api/connection', auth.authenticate(), (new ConnectionRouter(connectionService)).router());
app.use('/api/user', auth.authenticate(), (new UserRouter(userService)).router());

// Login routers
app.post("/api/login", async function (req, res) {
    if (req.body.email && req.body.password) {
        var email = req.body.email;
        var password = req.body.password;
        var user = await knex.select('id')
            .from('users')
            .where('email', email)
            .andWhere('password', password)
        if (user.length !== 0) {
            var payload = {
                id: user[0].id
            };
            var token = jwt.encode(payload, config.jwtSecret);
            res.json({
                token: token
            });
        } else {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);

    }
});

app.post("/api/login/facebook", function (req, res) {
    if (req.body.access_token) {
        var accessToken = req.body.access_token;

        axios.get(`https://graph.facebook.com/me?access_token=${accessToken}`)
            .then((data) => {
                if (!data.data.error) {
                    var payload = {
                        id: accessToken
                    };
                    users.push({
                        id: accessToken,
                        name: "Facebook User",
                        email: "placeholder@gmail.com",
                        password: "123456"
                    })
                    var token = jwt.encode(payload, config.jwtSecret);
                    res.json({
                        token: token
                    });
                } else {
                    res.sendStatus(401);
                }
            }).catch((err) => {
                console.log(err);
                res.sendStatus(401);
            });
    } else {
        res.sendStatus(401);
    }
});

app.listen(8080);
