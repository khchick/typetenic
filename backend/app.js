// General Initialization
require('dotenv').config(); // Define environments
const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = process.env.REDIS_PORT || 6379
const NODE_ENV = process.env.NODE_ENV || 'development' 

const knexFile = require('./knexfile')[NODE_ENV] // Connect to DB
const knex = require('knex')(knexFile)

const redis = require('redis'); // Connect to Redis server
const redisClient = redis.createClient({
    host: REDIS_HOST,
    port: REDIS_PORT
})

const fs = require('fs');
const https = require('https')

const isLoggedIn = require('./utils/guard').isLoggedIn;

// Dependency Injection for Routers and Services
// const ViewRouter = require('./ViewRouter');

// const { DishRouter,
//         FavRouter,
//         MealRouter,
//         RestRouter,
//         UserRouter,
//         SocketIORouter } = require('./routers');

// const { DishService,
//         FavService,
//         MealService,
//         RestService,
//         UserService } = require('./services');

// let dishService = new DishService(knex);
// let favService = new FavService(knex,redisClient); // REDIS ONLY REQUIRED FOR USER RELATED SERVICES?
// let mealService = new MealService(knex);
// let restService = new RestService(knex,redisClient); // REDIS ONLY REQUIRED FOR USER RELATED SERVICES?
// let userService = new UserService(knex,redisClient); // REDIS ONLY REQUIRED FOR USER RELATED SERVICES?

const {app,server,io} = require('./utils/init-app')(knex, redisClient);

app.use((req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals = {
            loggedIn: true
        };
    }
});

// new SocketIORouter(io,userService).router();
// app.use('/',new ViewRouter().router());
// app.use('/api/dish', (new DishRouter(dishService)).router());
// app.use('/api/fav', (new FavRouter(favService)).router());
// app.use('/api/meal', (new MealRouter(mealService)).router());
// app.use('/api/rest', (new RestRouter(restService)).router());
// app.use('/api/user', (new UserRouter(userService)).router());
  
const httpsOptions = {
    key: fs.readFileSync('./localhost.key'),
    cert: fs.readFileSync('./localhost.crt')
}

https.createServer(httpsOptions, app).listen(8080, () => {
    console.log('Application started at port ' + 8080)
})

