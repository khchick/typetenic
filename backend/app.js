// General Initialization
require("dotenv").config();
const NODE_ENV = process.env.NODE_ENV || "development"
const PORT = process.env.PORT || "8443"
const knexFile = require("./knexfile")[NODE_ENV]
const knex = require("knex")(knexFile)
const express = require("express");
// const morgan = require('morgan'); // For detailed log 
const bodyParser = require("body-parser");
const jwt = require("jwt-simple")
const axios = require("axios");
const authClass = require("./utils/auth")
const config = require("./utils/config")
const bcrypt = require('./utils/bcrypt');

const app = express();
const auth = authClass();

// Connect to Socket IO
const server = require("http").Server(app);
const io = require("socket.io")(server);

// app.use(morgan('combined')); // For detailed log 
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(auth.initialize());

// Dependency Injection for Routers and Services
const { ChatRouter,
    ConnectionRouter,
    NotificationRouter,
    UserRouter } = require("./routers");

const { ChatService,
    ConnectionService,
    NotificationService,
    UserService } = require("./services");

let chatService = new ChatService(knex);
let connectionService = new ConnectionService(knex);
let notificationService = new NotificationService(knex);
let userService = new UserService(knex);

app.use("/api/chat", auth.authenticate(), (new ChatRouter(chatService)).router());
app.use("/api/connection", auth.authenticate(), (new ConnectionRouter(connectionService)).router());
app.use("/api/notification", auth.authenticate(), (new NotificationRouter(notificationService)).router());
app.use("/api/user", auth.authenticate(), (new UserRouter(userService)).router());

// Sign up / Login routers
app.post("/api/signup", async (req, res) => {
    if (req.body.email && req.body.password) {
        let hash = await bcrypt.hashPassword(req.body.password)

        let userID = await knex("users").insert({
            email: req.body.email,
            password: hash
        })
            .returning("id")

        var payload = {
            id: userID[0]
        };
        var token = jwt.encode(payload, config.jwtSecret);
        res.json({
            id: payload.id,
            token: token
        });
    } else {
        res.sendStatus(401);
    }
})

app.post("/api/login", async function (req, res) {
    try {
        let users = await knex('users').where({ email: req.body.email });
        if (users.length == 0) {
            return done(null, false, { message: 'Incorrect credentials' });
        }
        let user = users[0];
        let result = await bcrypt.checkPassword(req.body.password, user.password);
        if (result) {
            var payload = {
                id: users[0].id
            };
            var token = jwt.encode(payload, config.jwtSecret);
            res.json({
                id: payload.id,
                token: token
            });
        } else {
            res.sendStatus(401);
        }
    } catch (err) {
        res.sendStatus(401);
    }
});

app.post("/api/login/facebook", function (req, response) {
    if (req.body.access_token) {
        var accessToken = req.body.access_token;
        axios.get(`https://graph.facebook.com/me?fields=id,name,picture,email&access_token=${accessToken}`)
            .then(async function (res) {
                if (!res.data.error) {
                    let query = knex
                        .select('id')
                        .from('users')
                        .where('fbID', res.data.id)
                    return query.then(async function (rows) {
                        if (rows.length === 0) {
                            var user = await knex('users')
                                .insert({
                                    display_name: res.data.name,
                                    email: res.data.email,
                                    fbID: res.data.id
                                })
                                .returning('id')
                            var payload = {
                                id: user.id
                            }
                            var token = jwt.encode(payload, config.jwtSecret);
                            response.json({
                                token: token
                            });
                        } else {
                            var payload = {
                                id: rows[0].id
                            }
                            var token = jwt.encode(payload, config.jwtSecret);
                            response.json({
                                id: payload.id,
                                token: token
                            });
                        }
                    })
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

app.get('/', (req, res) => { // For testing socket function
    res.sendFile(__dirname + '/views/io_test.html');
});

// Socket IO events handling
io.on('connection', (socket) => {
    socket.on('online', (conID) => {
        socket.join(conID);
        socket.conID = conID;
    });

    socket.on('message', (messages) => {
        io.to(socket.conID).emit('broadcast message', messages);
    })
});

server.listen(PORT, () => console.log(`listening on *: ${PORT}`));
