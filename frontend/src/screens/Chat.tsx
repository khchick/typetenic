import * as React from 'react';
import {
    StyleSheet, 
    Text, 
    View,
    TouchableOpacity
} from 'react-native';

interface ChatProps {
    navigator: Navigator
}
export default class Chat extends React.Component<ChatProps> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Chat Message</Text>

        <TouchableOpacity onPress={() => this.props.navigator.push({
            screen: 'ProfileScreen',
            title: 'Profile of someone'
        })}>
            <Text style={styles.welcome}>Click to show profile</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
