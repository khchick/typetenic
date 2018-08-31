import * as React from 'react';
// import { checkToken } from '../../src/actions/authAction';
import Config from 'react-native-config';
import axios from 'axios';
import { GiftedChat } from "react-native-gifted-chat";

const conversationID = 1;
const targetID = 2;

export default class MyChat extends React.Component {
  state = {
    messages: [],
  };

  componentDidMount() {
    let self = this;
    axios.get(`${Config.API_SERVER}/api/chat/messages/${conversationID}`, {
        headers: {
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MX0.plkfYqsnuNkp_SrCfyBEfXoQ9D_Wly7EXTOaqgzePR0',
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
  }

  onSend(messages = []) {
    axios.post(`${Config.API_SERVER}/api/chat/messages/${conversationID}/${targetID}`, {
      "content": messages[0].text
    }, {
      headers: {
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MX0.plkfYqsnuNkp_SrCfyBEfXoQ9D_Wly7EXTOaqgzePR0',
    }
  })
    .then(() => {
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }))
    })
  }

  onReceive(data: any) {
    const { id, senderId, text, createdAt } = data;
    const incomingMessage = {
      _id: id,
      text: text,
      createdAt: new Date(createdAt),
      user: {
        _id: senderId,
        name: senderId,
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmXGGuS_PrRhQt73sGzdZvnkQrPXvtA-9cjcPxJLhLo8rW-sVA"
      }
    };

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, incomingMessage)
    }));
  }

  render() {
    return (
      <GiftedChat 
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    )
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
