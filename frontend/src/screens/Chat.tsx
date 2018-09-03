import * as React from 'react';
// import { checkToken } from '../../src/actions/authAction';
import Config from 'react-native-config';
// window.navigator.userAgent = 'react-native';
import io from 'socket.io-client/dist/socket.io';
import axios from 'axios';
import { GiftedChat } from "react-native-gifted-chat";

const socketUrl = 'http://localhost.com:8080'
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Mjd9.55tl9fToUKG32_Yh1fB0Cqwjy4kPETaK4dSb3N_3v7k';
const userID = 27;
const conversationID = 1;
const targetID = 28;

export default class Chat extends React.Component {

  constructor(props: any) {
    super(props);

    this.socket = io('localhost:8080', { jsonp: false });

    this.socket.on('broadcast message', (msg: any) => {
      console.log('broadcast message activated');
      this.onReceive(msg);
    })

    this.state = {
      // socket: null,
      messages: [],
    };
  }

  componentWillMount() {
    this.initSocket();
  }

  componentDidMount() {
    this.socket.on('list messages', () => {
      console.log('list messages activated');
      let self = this;
      axios.get(`${Config.API_SERVER}/api/chat/messages/${conversationID}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
        .then(function (res) {
          console.log(res.data);
          self.setState({
            messages: res.data
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    })
  }

  onSend(messages = []) {
    this.socket.emit('message sent', messages);
    axios.post(`${Config.API_SERVER}/api/chat/messages/${conversationID}/${targetID}`, {
      "content": messages[0].text
    }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
      .then(() => {
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, messages),
        }))
      });
  }

  onReceive(incomingMessage: any) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, incomingMessage
        )
      };
    });
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: userID,
        }}
      />
    )
  }

  initSocket = () => {
    const socket = io(socketUrl)
    socket.on('connect', () => {
      console.log("Connected");
    })
    this.setState({ socket })
  }

}

// import * as React from 'react';
// import LinearGradient from 'react-native-linear-gradient';
// import {
//     StyleSheet, 
//     Text, 
//     View,
//     TouchableOpacity
// } from 'react-native';

// interface ChatProps {
//     navigator: Navigator
// }
// export default class Chat extends React.Component<ChatProps> {
//   render() {
//     return (
//       <LinearGradient colors={['#9EF8E4', '#30519B']} style={[{flex: 1}]}>
//       <View style={styles.container}>
//         <Text style={styles.welcome}>Chat Message</Text>

//         <TouchableOpacity onPress={() => this.props.navigator.push({
//             screen: 'ProfileScreen',
//             title: 'Profile of someone'
//         })}>
//             <Text style={styles.welcome}>Click to show profile</Text>
//         </TouchableOpacity>
//       </View>
//       </LinearGradient>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
// });
