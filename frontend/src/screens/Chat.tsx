import * as React from 'react';
import Config from 'react-native-config';
import io from 'socket.io-client/dist/socket.io';
import axios from 'axios';
import { GiftedChat } from "react-native-gifted-chat";

const userID = 28;

interface IChatProps {
  navigator: Navigator;
  targetID: number;
  token: string;
  conID: number;
}

interface IChatStates {
  messages: []
}

export default class Chat extends React.Component<IChatProps, IChatStates> {

  constructor(props: any) {
    super(props);

    this.state = {
      messages: [],
    };
  }

  componentWillMount() {
    this.socket = io(Config.API_SERVER, { jsonp: false });
  }

  componentDidMount() {
    // List messages
    let self = this;
    axios.get(`${Config.API_SERVER}/api/chat/messages/${this.props.conID}`, {
      headers: {
        'Authorization': `Bearer ${this.props.token}`
      }
    })
      .then(function (res) {
        self.setState({
          messages: res.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    
    // Join conversation (room)
    this.socket.emit('online', this.props.conID);
    this.socket.on('broadcast message', (msg: any) => {
      this.onReceive(msg);
    })
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  onSend(messages = []) {
    this.socket.emit('message', messages);
    axios.post(`${Config.API_SERVER}/api/chat/messages/${this.props.conID}/${this.props.targetID}`, {
      "content": messages[0].text
    }, {
        headers: {
          'Authorization': `Bearer ${this.props.token}`,
        }
      })
      .then(() => {
        // this.setState(previousState => ({
        //   messages: GiftedChat.append(previousState.messages, messages),
        // }))
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

  // initSocket = () => {
  //   const socket = io(socketUrl)
  //   socket.on('connect', () => {
  //     console.log("Connected");
  //   })
  //   this.setState({ socket })
  // }

}
