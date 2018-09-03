import * as React from "react";
import LinearGradient from "react-native-linear-gradient";
import {
  Platform,
  StyleSheet,
  Dimensions,
  Text,
  View,
  Image,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/authAction";

interface UserProps {
  navigator: Navigator;
  // onLogoutPress: () => void;
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
            <Image
              style={styles.avatar}
              source={{
                uri: "https://data.whicdn.com/images/287294903/large.jpg"
              }}
            />
          </View>

          <TouchableOpacity
            style={styles.btnContainer}
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
            style={styles.btnContainer}
            onPress={() =>
              this.props.navigator.push({
                screen: "ResetProfile",
                title: "Edit Profile"
              })
            }
          >
            <Text style={styles.btnText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() =>
              this.props.navigator.push({
                screen: "LoginScreen",
                title: "Login"
              })
            }
          >
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
  btnContainer: {
    backgroundColor: "rgb(255,129,0)",
    paddingHorizontal: 15,
    paddingVertical: 15,
    // marginHorizontal: 0,
    marginVertical: 15,
    width: "40%",
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 10
  },
  btnText: {
    color: "#fff",
    fontWeight: "900",
    textAlign: "center"
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",

    padding: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    width: width * 0.6, // percent or minus
    height: height * 0.4,
    margin: 20
  },
  avatar: {
    width: width * 0.5,
    height: height * 0.3
  }
});
