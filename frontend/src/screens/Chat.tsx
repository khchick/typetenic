import * as React from 'react';
import LinearGradient from 'react-native-linear-gradient';
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
      <LinearGradient colors={['#9EF8E4', '#30519B']} style={[{flex: 1}]}>
      <View style={styles.container}>
        <Text style={styles.welcome}>Chat Message</Text>

        <TouchableOpacity onPress={() => this.props.navigator.push({
            screen: 'ProfileScreen',
            title: 'Profile of someone'
        })}>
            <Text style={styles.welcome}>Click to show profile</Text>
        </TouchableOpacity>
      </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
