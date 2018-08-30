class SocketIORouter {
    constructor(io, redisClient, chatroomName) {
      this.io = io;
      this.redisClient = redisClient;
      this.chatroomName = chatroomName;
    }
  
    router() {
      this.io.on('connection', (socket) => {
        // THIS IS THE POINT WHERE...
        console.log('a user has connected to our socket.io server');
        console.log('this is from socket.io', socket.session.passport);

        // for broadcasting:
        // io.emit('chat message', msg);
        
        if (!socket.session.passport) {
          socket.emit('unauthorized')
        } else {
          this.onConnect(socket);
  
          socket.on('chat message', (msg) => {
            this.onMessageReceived(socket, msg); // required. check function
          });
  
          socket.on('I NEED MORE', (count) => {
            this.onLoadMore(socket, count);
          });
        }
      });
    }
  
    onConnect(socket) {
      this.redisClient.lrange(this.chatroomName, 0, 20, (err, messages) => {
        if (err) {
          console.log(err);
          this.io.emit('chat error', 'SORRY! Something\'s wrong :(');
          return;
        }
        messages.reverse();
        socket.emit('initial messages', messages);
      });
    }
  
    onMessageReceived(socket, msg, cb) {
      const user = socket.session.passport.user;
      const wholeMessage = user.profile.displayName + ": " + msg;
  
      this.redisClient.lpush(this.chatroomName, wholeMessage, (err) => {
        if (err) {
          console.log(err);
          this.io.emit('chat error', 'SORRY! Something\'s wrong :(');
          return;
        }
        this.io.emit('chat message', wholeMessage);
        if (cb != null) {
          cb();
        }
      })
    }
  
    onLoadMore(socket, count) {
      console.log(-count-20, -count);
      this.redisClient.lrange(this.chatroomName, count, count + 20, (err, messages) => {
        console.log(messages);
        if (err) {
          console.log(err);
          this.io.emit('chat error', 'SORRY! Something\'s wrong :(');
          return;
        }
        socket.emit('your messages', messages);
      });
    }
  }
  
  module.exports = SocketIORouter;

// class SocketIORouter{

//     constructor(io,userService){
//         this.io = io;
//         this.userService = userService;
//     }

//     router(){
//         this.io.use((socket, next)=>{
//             if(!socket.session.passport){
//                 socket.disconnect();
//             }else{
//                 next();
//             }
//         });
//         this.io.on('connection',this.connection.bind(this));
//     }

//     connection(socket){
//         socket.emit('username', socket.session.passport.user);

//         socket.on('getUsers',this.getUsers(socket).bind(this));
//     }

//     getUsers(socket){
//         return (data)=>{
//             return this.userService.list().then((users)=>{
//                 socket.emit('users',users);
//             });
//         };
//     }
    
// }

// module.exports = SocketIORouter