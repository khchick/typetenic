import * as React from 'react';
import {
    StyleSheet, 
    Text, 
    View,
    TouchableOpacity
} from 'react-native';

interface ProfileProps {
    navigator: Navigator
}
export default class Profile extends React.Component<ProfileProps> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Profile</Text>
        <TouchableOpacity onPress={() => 
          this.props.navigator.showLightBox({
            screen: "ReqestTabScreen", // unique ID registered with Navigation.registerScreen
            passProps: {}, // simple serializable object that will pass as props to the lightbox (optional)
            style: {
              backgroundBlur: "dark", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
              backgroundColor: "#ffffff", // tint color for the background, you can specify alpha here (optional)
              tapBackgroundToDismiss: true // dismisses LightBox on background taps (optional)
            },
            adjustSoftInput: "resize", // android only, adjust soft input, modes: 'nothing', 'pan', 'resize', 'unspecified' (optional, default 'unspecified')
            })
            // this.props.navigator.toggleTabs({
            //   to: 'hidden', // required, 'hidden' = hide tab bar, 'shown' = show tab bar
            //   animated: true // does the toggle have transition animation or does it happen immediately (optional)
            // })
        }>
          <Text style={styles.welcome}>Click to show lightbox</Text>
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
