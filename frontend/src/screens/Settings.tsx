import * as React from 'react';
import LinearGradient from 'react-native-linear-gradient';
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
      <LinearGradient colors={['#9EF8E4', '#30519B']} style={[{flex: 1}]}>
      <View style={styles.container}>
        <Text style={styles.welcome}>Settings here</Text>


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
