import * as React from "react";
import LinearGradient from "react-native-linear-gradient";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import axios from "axios";
import Config from "react-native-config";
import AvatarImage, { getAvatar } from "./components/AvatarImage";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { height, width } = Dimensions.get("window");

interface IPublicProfileProps {
  navigator: Navigator;
  targetID: number;
  token: string;
}

interface IPublicProfileStates {
  profileDetails: any;
}

export default class PublicProfile extends React.Component<IPublicProfileProps, IPublicProfileStates> {
  constructor(props: IPublicProfileProps) {
    super(props);
    this.state = {
      profileDetails: []
    };
  }

  async componentWillMount() {
    axios
      .get(`${Config.API_SERVER}/api/user/profile/public/${this.props.targetID}`, {
        headers: {
          Authorization: "Bearer " + this.props.token
        }
      })
      .then(res => {
        this.setState({
          profileDetails: res.data
        });
      })
      .catch(err => console.log(err));
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

  render() {
    return (
      <LinearGradient colors={["#9EF8E4", "#30519B"]} style={[{ flex: 1 }]}>
        <View style={styles.container}>
          <ScrollView
            horizontal={false}
            snapToInterval={width - 40} // card width offset margin
            snapToAlignment={"center"}
            decelerationRate={0} // stop scrolling momentum
          >
            {this.state.profileDetails.map(
              ({
                id,
                display_name,
                dob,
                gender,
                location,
                mbti,
                key_atr,
                key_atr_desc
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
                  </View>
                  // <View>
                  //   <View style={styles.card}>
                  //     <Image
                  //       style={styles.avatar}
                  //       source={require('../assets/16Types/adventurer.png')}
                  //     />
                  //     <View>
                  //       <Text style={styles.nameText}>{display_name}</Text>
                  //     </View>
                  //     <Text style={styles.inputText}>{dob}</Text>

                  //     <Text style={styles.inputText}>{location}</Text>
                  //     <Text style={styles.inputText}>{key_atr_desc}</Text> 
                  //   </View>
                  // </View>
                )
            )}
          </ScrollView>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
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
  card: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: hp('7.5%'),
    // marginBottom: hp('18.5%'),
    marginHorizontal: wp('10%'),
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('3%'),
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 2, height: -3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
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
});