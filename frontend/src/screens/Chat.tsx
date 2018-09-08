import * as React from 'react';
import {
  View,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert
} from "react-native";
import Config from 'react-native-config';
import io from 'socket.io-client/dist/socket.io';
import axios from 'axios';
import { GiftedChat } from "react-native-gifted-chat";

interface IChatProps {
  navigator: Navigator;
  token: string;
  userID: number;
  targetID: number;
  targetName: string;
  conID: number;
}

interface IChatStates {
  messages: [];
  flippedStatus: string;
}

export default class Chat extends React.Component<IChatProps, IChatStates> {

  constructor(props: any) {
    super(props);

    this.state = {
      messages: [],
      flippedStatus: ''
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.props.navigator.setButtons({rightButtons: [
      {
        title: `View ${this.props.targetName}'s Profile`, 
        id: 'profile'
      },
    ]});
  }

  componentWillMount() {
    this.socket = io(Config.API_SERVER, { jsonp: false });
    let self = this;
    axios.get(`${Config.API_SERVER}/api/connection/flip/${this.props.targetID}`, {
      headers: {
        'Authorization': `Bearer ${this.props.token}`
      }
    })
      .then(function (res) {
        self.setState({
          flippedStatus: res.data[0].flip_status
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    
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
  }

  onReceive(incomingMessage: any) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, incomingMessage
        )
      };
    });
  }

  onNavigatorEvent(event: any) {
    if (event.id == 'profile') {
      if ( this.state.flippedStatus === 'Requested' || this.state.flippedStatus === null ) {
        this.props.navigator.push({
          screen: 'PublicProfileTabScreen',
          passProps: { targetID: this.props.targetID, token: this.props.token }
        })
      }
      if ( this.state.flippedStatus === 'Flipped') {
        this.props.navigator.push({
          screen: 'PrivateProfileTabScreen',
          passProps: { targetID: this.props.targetID, token: this.props.token }
        })
      }      
    }
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: this.props.userID
        }}
        renderAvatar={null}
      />
    )
  }

}
