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
      deckContent: []
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
        fontWeight: "900"
      }
    }
  }

  render() {
    return (
      <LinearGradient colors={["#9EF8E4", "#30519B"]} style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.topButtonContainer}>
            <LeftTopButton
              leftButtonName={"RECOMMEND"}
              onPress={() => {
                this.props.handleChangeTypeDeck();
                console.log(this.props.typeDeckList);
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
            snapToInterval={width - 53} // card width offset margin
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

                  <TouchableOpacity
                    style={styles.chatButtonContainer}
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
  contentContainer: {
    position: "absolute",
    left: 50,
    top: 30
  },
  mbtiCol: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  mbtiRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
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
    padding: 5,
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 2, height: -3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    width: width * 0.8, // percent or minus
    height: height * 0.65,
    zIndex: 0
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "center"
  },
  avatar: {
    resizeMode: "contain",
    width: width * 0.4,
    height: height * 0.23
  },
  nameText: {
    fontSize: 25,
    color: "#3B5998",
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: 2.5,
    marginTop: 10,
    fontFamily: "YatraOne-Regular"
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
    // flexDirection: "row",
    width: width * 0.2,
    backgroundColor: "#F0957F",
    marginTop: 15,
    marginLeft: 110,
    //paddingHorizontal: 5,
    paddingVertical: 5,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2
  },
  chatButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 1.5
  }
});
