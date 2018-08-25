import * as React from 'react';
import {
    Platform, 
    StyleSheet, 
    Text, 
    View,
    TouchableOpacity
} from 'react-native';

interface UserProps {
    navigator: Navigator
}

export default class User extends React.Component<UserProps> {

  static navigatorButtons = {
    rightButtons: [     
      {
        icon: require('../assets/settings.png'), // for icon button, provide the local image asset name
        id: 'settings' // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
      }
    ]
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.navigator.push({
            screen: 'Settings',
            title: 'Settings'
        })}>
            <Text style={styles.welcome}>Click to see Setting</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {} }>
            <Text style={styles.welcome}               
              onPress={() => this.props.navigator.resetTo({
                screen: 'LoginScreen',
                animated: false,
                navigatorStyle: {
                  navBarHidden: true, 
                  tabBarHidden: true },
              })}
            >Logout</Text>
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
