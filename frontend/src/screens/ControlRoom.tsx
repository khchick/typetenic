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
  onLogoutPress: () => void;
}

interface UserState {
  ownProfile: any;
  imageUrl: any;
}

class PureUser extends React.Component<UserProps, UserState> {
  constructor(props: UserProps) {
    super(props);
    this.state = {
      ownProfile: null,
      imageUrl: "https://data.whicdn.com/images/287294903/large.jpg" // Dua lipa
    };
  }

  async componentWillMount() {
    axios
      .get(`${Config.API_SERVER}/api/user/myprofile`, {
        headers: {
          Authorization: "Bearer " + this.props.token
        }
      })
      .then(res => {
        this.setState({
          ownProfile: res.data,
          imageUrl: `${Config.API_SERVER}` + res.data[0].profile_pic
        });
        console.log(res.data[0].profile_pic);
        console.log(this.state.imageUrl);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <LinearGradient colors={["#9EF8E4", "#30519B"]} style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.card}>
            <Image
              style={styles.avatar}
              source={{
                uri: this.state.imageUrl
              }}
            />
          </View>

          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() =>
              this.props.navigator.push({
                screen: "Settings",
                title: "Settings",
                navigatorButtons: {
                  leftButtons: [
                    {
                      title: "Done",
                      id: "done"
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
                title: "Edit Profile",
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
            onPress={() => {
              // NEW PAGE TO BE ADDED
            }} 
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
    token: state.auth.token
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
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
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
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: -3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    width: width * 0.5,
    height: height* 0.4,
    marginBottom: 20
  },
  avatar: {
    width: width * 0.5,
    height: height * 0.4
  }
});
