import * as React from "react";
import LinearGradient from "react-native-linear-gradient";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import axios from "axios";
import Config from "react-native-config";
import { AsyncStorage } from "react-native";
import { transparentNav } from './styles/common';
import { connect } from 'react-redux';
import LeftTopButton from "./components/LeftTopButton";
import RightTopButton from "./components/RightTopButton";

const { height, width } = Dimensions.get("window");

interface IDeckProps {
  navigator: Navigator;
  token: string;
  userID: number;
}

interface IDeckStates {
  connectedSuggestions: any;
  connectedUsers: any;
}

class Deck extends React.Component<IDeckProps, IDeckStates> {
  constructor(props: IDeckProps) {
    super(props);
    this.state = {
      connectedSuggestions: [],
      connectedUsers: [],
    };
  }

  async componentWillMount() {
    axios
      .get(`${Config.API_SERVER}/api/connection/deck/suggested`, {
        headers: {
          Authorization: "Bearer " + this.props.token
        }
      })
      .then(res => {
        this.setState({
          connectedSuggestions: res.data
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <LinearGradient colors={["#9EF8E4", "#30519B"]} style={[{ flex: 1 }]}>
        <View style={styles.container}>
          <View style={styles.topButtonContainer}>
            <LeftTopButton
              leftButtonName={"TYPE"}
              onPress={() => {
                axios
                  .get(`${Config.API_SERVER}/api/connection/deck/suggested`, {
                    headers: {
                      Authorization: "Bearer " + this.props.token
                    }
                  })
                  .then(res => {
                    this.setState({
                      connectedSuggestions: res.data
                    });
                  })
                  .catch(err => console.log(err));
              }}
            />
            <RightTopButton
              rightButtonName={"TEN"}
              onPress={() => {
                axios
                  .get(`${Config.API_SERVER}/api/connection/deck/mypicks`, {
                    headers: {
                      Authorization: "Bearer " + this.props.token
                    }
                  })
                  .then(res => {
                    this.setState({
                      connectedSuggestions: res.data
                    });
                  })
                  .catch(err => console.log(err));
              }}
            />
          </View>
          <ScrollView
            horizontal={true}
            snapToInterval={width - 40} // card width offset margin
            snapToAlignment={"center"}
            decelerationRate={0} // stop scrolling momentum
          >
            {this.state.connectedSuggestions.map(
              ({
                id,
                display_name,
                dob,
                gender,
                location,
                key_atr,
                key_atr_desc,
                mbti,
                conID
              }) => (
                  <View>
                    <View style={styles.card}>
                      <Image
                        style={styles.avatar}
                        source={require('../assets/16Types/adventurer.png')}
                      />
                      <View>
                        <Text style={styles.nameText}>{display_name}</Text>
                      </View>
                      <Text style={styles.inputText}>{dob}</Text>

                      <Text style={styles.inputText}>{location}</Text>
                      <Text style={styles.inputText}>{key_atr_desc}</Text>
                    </View>
                    <TouchableOpacity style={styles.chatButtonContainer}
                      onPress={() => {

                        console.log(this.props.token),
                          axios.post(`${Config.API_SERVER}/api/chat/conversation/${id}`,
                            {},
                            {
                              headers: {
                                Authorization: `Bearer ${this.props.token}`
                              }
                            })
                            .then(res => {
                              conID = res.data;
                              this.props.navigator.push({
                                screen: 'ChatTabScreen',
                                passProps: { userID: this.props.userID, targetID: id, conID: conID, token: this.props.token },
                              });
                            })
                            .catch(err => console.log(err))

                      }}>
                      <Text style={styles.chatButtonText}>CHAT</Text>
                    </TouchableOpacity>
                  </View>
                )
            )}
          </ScrollView>
        </View>
      </LinearGradient>
    );
  }
}

const MapStateToProps = (state: any) => {
  return {
    token: state.auth.token,
    userID: state.profile.id
  }
}

export default connect(MapStateToProps)(Deck);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },
  topButtonContainer: {
    flexDirection: "row",
    height: 38
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 5,
    marginTop: 20,
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 2, height: -3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    width: width * 0.8, // percent or minus
    height: height * 0.65,
  },
  avatar: {
    width: width * 0.4,
    height: height * 0.3
  },
  nameText: {
    fontSize: 20,
    color: "#3B5998",
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: 2.5,
    marginTop: 5
  },
  inputText: {
    backgroundColor: "#E5F5FA",
    color: "#3B5998",
    marginVertical: 7,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 25,
    width: 250,
    textAlign: "center"
  },
  chatButtonContainer: {
    flexDirection: "row",
    height: 30,
    width: width * 0.2,
    backgroundColor: '#F0957F',
    //borderColor: 'white',
    borderWidth: 1,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginLeft: 110
  },
  chatButtonText: {
    color: 'white',
    textAlign: 'center',
    letterSpacing: 4,
    fontSize: 12,
    fontWeight: "800",
  }
});