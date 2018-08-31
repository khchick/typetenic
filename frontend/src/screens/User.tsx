import * as React from "react";
import LinearGradient from "react-native-linear-gradient";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authAction";

interface UserProps {
  navigator: Navigator;
  onLogoutPress: () => void;
}

class PureUser extends React.Component<UserProps> {
  static navigatorButtons = {
    rightButtons: [
      {
        icon: require("../assets/settings.png"), // for icon button, provide the local image asset name
        id: "settings" // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
      }
    ]
  };

  render() {
    return (
      <LinearGradient colors={["#9EF8E4", "#30519B"]} style={[{ flex: 1 }]}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigator.push({
                screen: "Settings",
                title: "Settings"
              })
            }
          >
            <Text style={styles.welcome}>Setting</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              this.props.navigator.push({
                screen: "ResetProfile",
                title: "Edit Profile"
              })
            }
          >
            <Text style={styles.welcome}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.onLogoutPress()}>
            <Text style={styles.welcome}>Logout</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}

const MapStateToProps = (state: any) => {
  return {
    isLoggedIn: state.authReducer
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  onLogoutPress: () => dispatch(logoutUser())
});

const User = connect(
  MapStateToProps,
  mapDispatchToProps
)(PureUser);
export default User;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
