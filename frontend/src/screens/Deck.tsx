import * as React from "react";
import LinearGradient from "react-native-linear-gradient";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from "react-native";
import axios from "axios";
import Config from "react-native-config";
import { connect } from "react-redux";
import LeftTopButton from "./components/LeftTopButton";
import RightTopButton from "./components/RightTopButton";
import AvatarImage, { getAvatar } from "./components/AvatarImage";
import {
  handleChangeTypeDeck,
  handleChangeTenDeck
} from "./../redux/actions/refreshAction";

const { height, width } = Dimensions.get("window");

interface IDeckProps {
  navigator: Navigator;
  token: string;
  userID: number;
  handleChangeTypeDeck: () => any;
  handleChangeTenDeck: () => any;
  typeDeckList: Array<any>;
  tenDeckList: Array<any>;
}

interface IDeckStates {
  deckContent: Array<any>;
}

class Deck extends React.Component<IDeckProps, IDeckStates> {
  constructor(props: IDeckProps) {
    super(props);

    this.state = {
      deckContent: this.props.typeDeckList
    };

    // this.updateState = this.updateState.bind(this);
  }

  // componentWillReceiveProps() {
  //   this.updateState();
  // }

  componentDidMount() {
    this.props.handleChangeTypeDeck()
    this.setState({
      deckContent: this.props.typeDeckList
    });
    this.props.handleChangeTenDeck()
  }

  // updateState() {
  //   this.props.handleChangeTypeDeck();
  //   this.setState({
  //     deckContent: this.props.typeDeckList
  //   });
  // }

  calculateAge(dob: any) {
    let dobDate = new Date(dob);
    var ageDifMs = Date.now() - dobDate.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  getMbtiStyle(atr: string, key_atr: string) {
    if (atr === key_atr) {
      return {
        color: "red",
        fontWeight: "900",
        fontFamily: 'PatuaOne-Regular',
        fontSize: 20
      }
    } else {
      return {
        color: "black",
        fontFamily: 'PatuaOne-Regular',
        fontSize: 20
      }
    }
  }


  getFlipButtonStyle(flipStatus: string) {
    switch (flipStatus) {
      case null:
        return {
          width: width * 0.15,
          backgroundColor: "#04B4AE",
          marginTop: 15,
          marginLeft: width * 0.05,
          marginRight: width * 0.05,
          paddingVertical: 5,
          shadowColor: "black",
          shadowOffset: { width: 2, height: 2 },
          shadowOpacity: 0.4,
          shadowRadius: 2
        };
      case 'Requested':
        return {
          width: width * 0.15,
          backgroundColor: "#0489B1",
          marginTop: 15,
          marginLeft: width * 0.05,
          marginRight: width * 0.05,
          paddingVertical: 5,
          shadowColor: "black",
          shadowOffset: { width: 2, height: 2 },
          shadowOpacity: 0.4,
          shadowRadius: 2
        };
      case 'Flipped':
        return {
          width: width * 0.15,
          backgroundColor: "#0B615E",
          marginTop: 15,
          marginLeft: width * 0.05,
          marginRight: width * 0.05,
          paddingVertical: 5,
          shadowColor: "black",
          shadowOffset: { width: 2, height: 2 },
          shadowOpacity: 0.4,
          shadowRadius: 2
        }
    }
  }

  getFlipButtonText(flipStatus: string) {
    switch (flipStatus) {
      case null:
        return 'FLIP';
      case 'Requested':
        return '...';
      case 'Flipped':
        return 'FLIPPED'
    }
  }

  render() {
    let isEmpty =
      <ScrollView
        horizontal={true}
        // snapToInterval={width - 37} // card width offset margin
        // snapToAlignment={"center"}
        decelerationRate={"fast"} // stop scrolling momentum
      >
        <View style={styles.defaultMsgContainer}>
          <Text style={styles.defaultMsg}>
            {"\n"}
            {"\n"}
            {"\n"}
            {"\n"}
            Your deck is empty.
          {"\n"}
            {"\n"}
            Go to DISCOVER to connect with other users</Text>
        </View>
      </ScrollView>
    let component;
    if (this.state.deckContent.length < 1) {
      component = isEmpty
    } else {
      component =
        <ScrollView
          horizontal={true}
          // snapToInterval={width - 37} // card width offset margin
          // snapToAlignment={"center"}
          decelerationRate={"fast"} // stop scrolling momentum
        >
          {this.state.deckContent.map(
            ({
              id,
              display_name,
              dob,
              gender,
              location,
              key_atr,
              key_atr_desc,
              mbti,
              flip_status,
              flip_req_sender,
              conID
            }) => (
                <View style={styles.cardContainer}>
                  <View style={styles.card}>
                    <View style={styles.mbtiCol}>
                      <View style={styles.mbtiRow}>
                        <Text style={this.getMbtiStyle(mbti[0], key_atr)}>{mbti[0]}</Text>
                        <Text style={this.getMbtiStyle(mbti[1], key_atr)}>{mbti[1]}</Text>
                      </View>
                      <View style={styles.rowContainer}>
                        <AvatarImage style={styles.avatar} source={getAvatar(mbti)} />
                      </View>
                      <View style={styles.rowContainer}>
                        <Text style={styles.nameText}>{display_name}</Text>
                      </View>
                      <View style={styles.rowContainer}>
                        <Text style={styles.inputText}>{this.calculateAge(dob)}  {gender}  {location}</Text>
                      </View>
                      <View style={styles.rowContainer}>
                        <Text style={styles.longText}>{key_atr_desc}</Text>
                      </View>
                      <View style={styles.mbtiRow}>
                        <Text style={this.getMbtiStyle(mbti[2], key_atr)}>{mbti[2]}</Text>
                        <Text style={this.getMbtiStyle(mbti[3], key_atr)}>{mbti[3]}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                      style={styles.delBtnContainer}
                      onPress={() => {
                        axios
                          .delete(
                            `${Config.API_SERVER}/api/connection/deck/${id}`,
                            {
                              headers: {
                                Authorization: `Bearer ${this.props.token}`
                              }
                            }
                          )
                          .then(() => {
                            this.props.handleChangeTypeDeck();
                            this.setState({
                              deckContent: this.props.typeDeckList
                            });
                          })
                          .catch(err => console.log(err));
                      }}
                    >
                      <Text style={styles.btnText}>DEL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.btnContainer}
                      onPress={() => {
                        axios
                          .post(
                            `${Config.API_SERVER}/api/chat/conversation/${id}`,
                            {},
                            {
                              headers: {
                                Authorization: `Bearer ${this.props.token}`
                              }
                            }
                          )
                          .then(res => {
                            conID = res.data;
                            this.props.navigator.push({
                              screen: "ChatTabScreen",
                              passProps: {
                                token: this.props.token,
                                userID: this.props.userID,
                                targetID: id,
                                targetName: display_name,
                                conID: conID
                              }
                            });
                          })
                          .catch(err => console.log(err));
                      }}
                    >
                      <Text style={styles.btnText}>CHAT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={this.getFlipButtonStyle(flip_status)}
                      onPress={() => {
                        this.props.navigator.showModal({
                          screen: "FlipAlertTabScreen",
                          passProps: {
                            token: this.props.token,
                            userID: this.props.userID,
                            targetID: id,
                            targetName: display_name,
                            flipStatus: flip_status,
                            reqSender: flip_req_sender
                          }
                        });
                      }}
                    >
                      <Text style={styles.btnText}>{this.getFlipButtonText(flip_status)}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )
          )}
        </ScrollView>
    }

    return (
      <LinearGradient colors={["#9EF8E4", "#30519B"]} style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.topButtonContainer}>
            <LeftTopButton
              leftButtonName={"MY TYPES"}
              onPress={() => {
                this.props.handleChangeTypeDeck();
                this.setState({
                  deckContent: this.props.typeDeckList
                });
              }}
            />
            <RightTopButton
              rightButtonName={"MY PICKS"}
              onPress={() => {
                this.props.handleChangeTenDeck();
                this.setState({
                  deckContent: this.props.tenDeckList
                });
              }}
            />
          </View>
          {component}
          {/* <ScrollView
            horizontal={true}
            decelerationRate={"fast"} // stop scrolling momentum
          >
            {this.state.deckContent.map(
              ({
                id,
                display_name,
                dob,
                gender,
                location,
                key_atr,
                key_atr_desc,
                mbti,
                flip_status,
                flip_req_sender,
                conID
              }) => (
                  <View>
                    <View style={styles.card}>
                      <View style={styles.mbtiCol}>
                        <View style={styles.mbtiRow}>
                          <Text style={this.getMbtiStyle(mbti[0], key_atr)}>{mbti[0]}</Text>
                          <Text style={this.getMbtiStyle(mbti[1], key_atr)}>{mbti[1]}</Text>
                        </View>
                        <View style={styles.rowContainer}>
                          <AvatarImage style={styles.avatar} source={getAvatar(mbti)} />
                        </View>
                        <View style={styles.rowContainer}>
                          <Text style={styles.nameText}>{display_name}</Text>
                        </View>
                        <View style={styles.rowContainer}>
                          <Text style={styles.inputText}>{this.calculateAge(dob)}  {gender}  {location}</Text>
                        </View>
                        <View style={styles.rowContainer}>
                          <Text style={styles.longText}>{key_atr_desc}</Text>
                        </View>
                        <View style={styles.mbtiRow}>
                          <Text style={this.getMbtiStyle(mbti[2], key_atr)}>{mbti[2]}</Text>
                          <Text style={this.getMbtiStyle(mbti[3], key_atr)}>{mbti[3]}</Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.buttonsContainer}>
                      <TouchableOpacity
                        style={styles.btnContainer}
                        onPress={() => {
                          axios
                            .delete(
                              `${Config.API_SERVER}/api/connection/deck/${id}`,
                              {
                                headers: {
                                  Authorization: `Bearer ${this.props.token}`
                                }
                              }
                            )
                            .then(() => {
                              this.props.handleChangeTypeDeck();
                            })
                            .catch(err => console.log(err));
                        }}
                      >
                        <Text style={styles.btnText}>REMOVE</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.btnContainer}
                        onPress={() => {
                          axios
                            .post(
                              `${Config.API_SERVER}/api/chat/conversation/${id}`,
                              {},
                              {
                                headers: {
                                  Authorization: `Bearer ${this.props.token}`
                                }
                              }
                            )
                            .then(res => {
                              conID = res.data;
                              this.props.navigator.push({
                                screen: "ChatTabScreen",
                                passProps: {
                                  token: this.props.token,
                                  userID: this.props.userID,
                                  targetID: id,
                                  targetName: display_name,
                                  conID: conID
                                }
                              });
                            })
                            .catch(err => console.log(err));
                        }}
                      >
                        <Text style={styles.btnText}>CHAT</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={this.getFlipButtonStyle(flip_status)}
                      >
                        <Text style={styles.btnText}>{this.getFlipButtonText(flip_status)}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )
            )}
          </ScrollView> */}
        </View>
      </LinearGradient>
    );
  }
}

const MapStateToProps = (state: any) => {
  return {
    token: state.auth.token,
    userID: state.profile.id,
    typeDeckList: state.refresh.typeDeckList,
    tenDeckList: state.refresh.tenDeckList
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleChangeTypeDeck: () => dispatch(handleChangeTypeDeck()),
    handleChangeTenDeck: () => dispatch(handleChangeTenDeck())
  };
};

export default connect(
  MapStateToProps,
  mapDispatchToProps
)(Deck);

const styles = StyleSheet.create({
  mbtiCol: {
    //flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    height: height * 0.62,
    width: width * 0.73
  },
  mbtiRow: {
    //flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  topButtonContainer: {
    flexDirection: "row"
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    // paddingVertical: 3,
    // paddingHorizontal: 3,
    marginVertical: width * 0.05,
    marginHorizontal: width * 0.1,
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 2, height: -3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    width: width * 0.8, // percent or minus
    height: height * 0.65,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'center'
  },
  avatar: {
    resizeMode: "contain",
    width: width * 0.4,
    height: height * 0.25
  },
  nameText: {
    fontSize: 25,
    color: "#3B5998",
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: 2.5,
    fontFamily: "YatraOne-Regular",
    height: height * 0.05
  },
  inputText: {
    backgroundColor: "#E5F5FA",
    color: "#3B5998",
    marginTop: height * 0.02,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 25,
    width: width * 0.6,
    textAlign: "center",
    height: height * 0.05
  },
  longText: {
    backgroundColor: "#E5F5FA",
    color: "#3B5998",
    marginTop: height * 0.02,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 25,
    width: width * 0.6,
    textAlign: "center",
    height: height * 0.15
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width * 0.8,
    marginHorizontal: width * 0.1,
  },
  delBtnContainer: {
    // flexDirection: "row",
    width: width * 0.15,
    backgroundColor: "#BDBDBD",
    marginTop: 15,
    marginLeft: width * 0.05,
    marginRight: width * 0.05,
    //paddingHorizontal: 5,
    paddingVertical: 5,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2
  },
  btnContainer: {
    width: width * 0.25,
    backgroundColor: "#F0957F",
    paddingVertical: 5,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 1.5
  },
  flipBtnContainer: {
    // flexDirection: "row",
    width: width * 0.15,
    backgroundColor: "#F0957F",
    marginTop: 15,
    marginLeft: width * 0.05,
    marginRight: width * 0.05,
    //paddingHorizontal: 5,
    paddingVertical: 5,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2
  },
  flipBtnContainerActive: {
    // flexDirection: "row",
    width: width * 0.15,
    backgroundColor: "green",
    marginTop: 15,
    marginLeft: width * 0.05,
    marginRight: width * 0.05,
    //paddingHorizontal: 5,
    paddingVertical: 5,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2
  },
  flipBtnContainerUnflip: {
    // flexDirection: "row",
    width: width * 0.15,
    backgroundColor: "blue",
    marginTop: 15,
    marginLeft: width * 0.05,
    marginRight: width * 0.05,
    //paddingHorizontal: 5,
    paddingVertical: 5,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2
  },
  defaultMsgContainer: {
    flex: 1,
    justifyContent: "flex-start",
    width: width * 0.8
  },
  defaultMsg: {
    fontSize: 16,
    textAlign: "center"
  }
});
