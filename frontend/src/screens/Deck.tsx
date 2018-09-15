import * as React from "react";
import LinearGradient from "react-native-linear-gradient";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
import axios from "axios";
import Config from "react-native-config";
import { AsyncStorage } from "react-native";
import { connect } from "react-redux";
import LeftTopButton from "./components/LeftTopButton";
import RightTopButton from "./components/RightTopButton";
import AvatarImage, { getAvatar } from "./components/AvatarImage";
import {
  handleChangeTypeDeck,
  handleChangeTenDeck
} from "./../redux/actions/refreshAction";
import Modal from "react-native-modal";

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
  isModalVisible: boolean;
}

class Deck extends React.Component<IDeckProps, IDeckStates> {
  constructor(props: IDeckProps) {
    super(props);

    this.state = {
      deckContent: [],
      isModalVisible: false
    };
  }

  componentDidMount() {
    this.props.handleChangeTypeDeck();
    this.setState({
      deckContent: this.props.typeDeckList
    });
    this.props.handleChangeTenDeck();
  }

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
          backgroundColor: "red",
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
          backgroundColor: "blue",
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
          backgroundColor: "grey",
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

  getModalContent(targetID: number, targetName: string, flipStatus: string, reqSender: number) {
    console.log(flipStatus);
    if (flipStatus == 'Requested') {
      return (
        <View style={styles.modalContent}>
          <Text>You have already flipped the card of {targetName}. Check out his/her private profile to find out more!</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.modalContent}>
          <Text>testing</Text>
        </View>
      )
    }
    // if (flipStatus === 'Requested' && reqSender === targetID) {

    // };
    // if (flipStatus === 'Requested' && reqSender === this.props.userID) {

    // };
    // if (flipStatus === 'Rejected' && reqSender === targetID) {

    // };
    // if (flipStatus === 'Rejected' && reqSender === this.props.userID) {

    // };
    // if (flipStatus === null) {
    //   return (
    //     <View style={styles.modalContent}>
    //       <Text>Confirm to request {targetName} to flip his/her card and yours?{"\n"}
    //         (You will be able to view each other's private profile after flipping.)</Text>
    //       <TouchableOpacity
    //         style={styles.btnContainer}
    //         onPress={() => {
    //           axios
    //             .post(
    //               `${Config.API_SERVER}/api/connection/flip/request/${targetID}`,
    //               {},
    //               {
    //                 headers: {
    //                   Authorization: `Bearer ${this.props.token}`
    //                 }
    //               }
    //             )
    //             .then(() => {
    //               this._toggleModal();
    //             })
    //             .catch(err => console.log(err));
    //         }}
    //       >
    //         <Text style={styles.btnText}>SEND</Text>
    //       </TouchableOpacity>
    //     </View>
    //   )
    // }
  }

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  render() {
    let isEmpty =
      <ScrollView
        horizontal={true}
        snapToInterval={width - 37} // card width offset margin
        snapToAlignment={"center"}
        decelerationRate={0} // stop scrolling momentum
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
          Go to the Discover page to connect with other users!</Text>
        </View>
      </ScrollView>
    let component;
    if (this.state.deckContent.length < 1) {
      component = isEmpty
    } else {
      component =
        <ScrollView
          horizontal={true}
          snapToInterval={width - 37} // card width offset margin
          snapToAlignment={"center"}
          decelerationRate={0} // stop scrolling momentum
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
                        <Text style={styles.inputText}>{this.calculateAge(dob)} y/o {gender} {location}</Text>
                      </View>
                      <View style={styles.rowContainer}>
                        <Text style={styles.inputText}>{key_atr_desc}</Text>
                      </View>
                      <View style={styles.mbtiRow}>
                        <Text style={this.getMbtiStyle(mbti[2], key_atr)}>{mbti[2]}</Text>
                        <Text style={this.getMbtiStyle(mbti[3], key_atr)}>{mbti[3]}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.buttonsContainer}>
                    <TouchableHighlight
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
                      <Text style={styles.btnText}>DEL</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
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
                    </TouchableHighlight>
                    <TouchableHighlight
                      style={this.getFlipButtonStyle(flip_status)}
                      onPress={
                        this._toggleModal}
                    >
                      <Text style={styles.btnText}>{this.getFlipButtonText(flip_status)}</Text>
                    </TouchableHighlight>
                  </View>
                  <View>
                    <Modal

                      isVisible={this.state.isModalVisible}
                      style={styles.modal}
                    >
                      <View style={{ flex: 1 }}>
                        <View style={styles.closeBtnRow}>
                          <TouchableOpacity onPress={this._toggleModal}>
                            <Text style={{ fontSize: 20 }}>X</Text>
                          </TouchableOpacity>
                        </View>
                        <View>
                          {this.getModalContent(id, display_name, flip_status, flip_req_sender)}
                        </View>
                      </View>
                    </Modal>
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
          <ScrollView
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
                      <TouchableHighlight
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
                      </TouchableHighlight>
                      <TouchableHighlight
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
                      </TouchableHighlight>
                      <TouchableHighlight
                        style={this.getFlipButtonStyle(flip_status)}
                        onPress={this._toggleModal}
                      >
                        <Text style={styles.btnText}>{this.getFlipButtonText(flip_status)}</Text>
                      </TouchableHighlight>
                    </View>
                    <View>
                      <Modal

                        isVisible={this.state.isModalVisible}
                        style={styles.modal}
                      >
                        <View style={{ flex: 1 }}>
                          <View style={styles.closeBtnRow}>
                            <TouchableOpacity onPress={this._toggleModal}>
                              <Text style={{ fontSize: 20 }}>X</Text>
                            </TouchableOpacity>
                          </View>
                          <View>
                            {this.getModalContent(id, display_name, flip_status, flip_req_sender)}
                          </View>
                        </View>
                      </Modal>
                    </View>
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
  modal: {
    backgroundColor: "white",
  },
  modalContent: {
    padding: 20,
    textAlign: 'justify',
    fontSize: 16
  },
  closeBtnRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10
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
