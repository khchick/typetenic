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
import Modal from "react-native-modal";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
      deckContent: [],
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
        fontFamily: 'YesevaOne-Regular',
        fontSize: 20
      }
    } else {
      return {
        color: "black",
        fontFamily: 'YesevaOne-Regular',
        fontSize: 20
      }
    }
  }

  getFlipButtonStyle(flipStatus: string) {
    switch (flipStatus) {
      case null:
        return {
          backgroundColor: "#04B4AE",
          width: wp('23%'),
          height: hp('4%'),
          shadowColor: "black",
          shadowOffset: { width: 2, height: 2 },
          shadowOpacity: 0.4,
          shadowRadius: 2,
          borderRadius: 4,
          justifyContent: 'center',
          alignItems: 'center'
        };
      case 'Requested':
        return {
          backgroundColor: "#0489B1",
          width: wp('23%'),
          height: hp('4%'),
          shadowColor: "black",
          shadowOffset: { width: 2, height: 2 },
          shadowOpacity: 0.4,
          shadowRadius: 2,
          borderRadius: 4,
          justifyContent: 'center',
          alignItems: 'center'
        };
      case 'Flipped':
        return {
          backgroundColor: "#0B615E",
          width: wp('23%'),
          height: hp('4%'),
          shadowColor: "black",
          shadowOffset: { width: 2, height: 2 },
          shadowOpacity: 0.4,
          shadowRadius: 2,
          borderRadius: 4,
          justifyContent: 'center',
          alignItems: 'center'
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
        snapToInterval={width} // card width offset margin
        snapToAlignment={"center"}
        decelerationRate={"fast"} // stop scrolling momentum
      >
        <View style={styles.defaultMsgContainer}>
          <Text style={styles.defaultMsg}>
            {"\n"}
            {"\n"}
            {"\n"}
            {"\n"}
            Your deck is empty
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
          snapToInterval={width} // card width offset margin
          snapToAlignment={"center"}
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
                        <View style={styles.inputContainer}>
                          <Text style={styles.inputText}>{this.calculateAge(dob)}  {gender}  {location}</Text>
                        </View>
                      </View>
                      <View style={styles.rowContainer}>
                        <View style={styles.longTextContainer}>
                          <Text style={styles.longText}>{key_atr_desc}</Text>
                        </View>
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
                        this.props.navigator.showModal({
                          screen: "RemovalAlertTabScreen",
                          passProps: {
                            token: this.props.token,
                            userID: this.props.userID,
                            targetID: id,
                            targetName: display_name
                          }
                        })
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
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    width: wp('74%')
  },
  mbtiRow: {
    flex: 1,
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
    marginTop: hp('3%'),
    marginBottom: hp('2.7%'),
    marginHorizontal: wp('10%'),
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('3%'),
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 2, height: -3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    // width: width * 0.8, // percent or minus
    // height: height * 0.65,
    width: wp('80%'),
    height: hp('63%')
  },
  rowContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: wp('60%'),
    height: hp('5%'),
    marginTop: hp('1%'),
    backgroundColor: "#E5F5FA",
    padding: hp('1%'),
  },
  longTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: wp('60%'),
    height: hp('15%'),
    marginTop: hp('1%'),
    backgroundColor: "#E5F5FA",
    padding: hp('2%'),
  },
  avatar: {
    resizeMode: "contain",
    width: wp("40%"),
    height: hp('25%')
  },
  nameText: {
    fontSize: 25,
    color: "#3B5998",
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: 2.5,
    marginTop: hp('0.5%'),
    fontFamily: "YatraOne-Regular",
    width: wp('60%'),
    height: hp('5%')
  },
  inputText: {
    color: "#3B5998",
    textAlign: "center",
    fontSize: 14,
  },
  longText: {
    color: "#3B5998",
    textAlign: "center",
    fontSize: 14,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    width: wp('80%'),
    marginHorizontal: wp('10%')
  },
  delBtnContainer: {
    backgroundColor: "#BDBDBD",
    width: wp('23%'),
    height: hp('4%'),
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnContainer: {
    backgroundColor: "#F0957F",
    width: wp('23%'),
    height: hp('4%'),
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 1.5
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