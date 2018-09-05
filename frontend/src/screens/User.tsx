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
      <LinearGradient colors={["#9EF8E4", "#30519B"]} style={[{ flex: 1 }]}>
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
            onPress={() => this.props.onLogoutPress()}
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
  welcome: {
    fontSize: 20,
    // textAlign: "center",
    margin: 10
  },
  btnContainer: {
    backgroundColor: "rgb(252,163,145)",
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
    fontSize: 16,
    fontWeight: "800",
    textAlign: "center"
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",

    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    width: width * 0.7,
    margin: 20
  },
  avatar: {
    width: width * 0.6,
    height: height * 0.35
  }
});
