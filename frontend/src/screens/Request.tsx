import * as React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
    StyleSheet, 
    Text, 
    View
} from 'react-native';

interface RequestProps {
    navigator: Navigator
}
export default class Request extends React.Component<RequestProps> {

  static navigatorButtons = {
    rightButtons: [     
      {
        icon: require('../assets/sort.png'), // for icon button, provide the local image asset name
        id: 'settings' // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
      }
    ]
  };

  render() {
    return (
      <LinearGradient colors={['#9EF8E4', '#30519B']} style={[{flex: 1}]}>
      <View style={styles.container}>
        <Text style={styles.welcome}>Request List</Text>
        
        
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
