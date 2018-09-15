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
import axios from "axios";
import Config from "react-native-config";

const { height, width } = Dimensions.get("window");

interface UserProps {
  navigator: Navigator;
  token: string;
  imageUrl: string;
  onLogoutPress: () => void;
}


class PureUser extends React.Component<UserProps> {

  render() {
    return (
      <LinearGradient colors={["#9EF8E4", "#30519B"]} style={{ flex: 1 }}>
        <View style={styles.container}>
          {/* <View style={styles.card}> */}
            <Image
              style={styles.avatar}
              source={{
                uri: `${Config.API_SERVER}` + this.props.imageUrl
              }}
            />
          {/* </View> */}

          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() =>
              this.props.navigator.push({
                screen: "Settings",
                title: "SETTINGS",
                navigatorButtons: {
                  leftButtons: [
                    {
                      title: "Done",
                      id: "settings"
                    }
                  ]
                }
              })
            }
          >
            <Text style={styles.btnText}>SETTINGS</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() =>
              this.props.navigator.push({
                screen: "ResetProfile",
                title: "EDIT PROFILE",
                navigatorButtons: {
                  leftButtons: [
                    {
                      title: "Done",
                      id: "edit profile"
                    }
                  ]
                }
              })
            }
          >
            <Text style={styles.btnText}>EDIT PROFILE</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() =>
              this.props.navigator.push({
                screen: "AboutMBTI",
                title: "ABOUT MBTI",
                // navigatorButtons: {
                //   leftButtons: [
                //     {
                //       title: "Done",
                //       id: "about m"
                //     }
                //   ]
                // }
              })
            }
          >
            <Text style={styles.btnText}>ABOUT MBTI</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => this.props.onLogoutPress()}
          >
            <Text style={styles.btnText}>LOGOUT</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}

const MapStateToProps = (state: any) => {
  return {
    token: state.auth.token,
    imageUrl: state.profile.profilePic
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
  btnContainer: {
    backgroundColor: "#F0957F",
    marginVertical: 10,
    width: width * 0.5,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 2
  },
  btnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    letterSpacing: 4
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: width * 0.5,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: -3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    width: width * 0.6,
    height: width * 0.6,
    marginBottom: 20
  },
  avatar: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: width * 0.6 * 0.5,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: -3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    width: width * 0.6,
    height: width * 0.6,
    marginBottom: 30,
    resizeMode: 'contain'
  }
});
