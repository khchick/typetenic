import * as React from 'react';
import {
    StyleSheet, 
    Text, 
    View
} from 'react-native';

interface SettingsProps {
    navigator: Navigator
}
export default class Settings extends React.Component<SettingsProps> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Settings here</Text>
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
