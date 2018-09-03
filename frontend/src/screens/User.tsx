import * as React from "react";
import LinearGradient from "react-native-linear-gradient";
import {
  Platform,
  StyleSheet,
  Dimensions,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/authAction";

interface UserProps {
  navigator: Navigator;
  onLogoutPress: () => void;
}

const { height, width } = Dimensions.get("window");

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
          <View style={styles.card}>
            <Text>MY IMAGE</Text>
          </View>

          <TouchableOpacity
            onPress={() =>
              this.props.navigator.push({
                screen: "Settings",
                title: "Settings"
              })
            }
          >
            <Text style={styles.btnText}>Setting</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              this.props.navigator.push({
                screen: "ResetProfile",
                title: "Edit Profile"
              })
            }
          >
            <Text style={styles.btnText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.onLogoutPress()}>
            <Text style={styles.btnText}>Logout</Text>
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
    // textAlign: "center",
    margin: 10
  },
  btnText: {
    color: "#fff",
    fontWeight: "700",
    textAlign: "center"
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",

    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    width: width * 0.8, // percent or minus
    height: height * 0.6,
    margin: 20
  }
});
