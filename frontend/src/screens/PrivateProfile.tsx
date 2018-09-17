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

interface IPrivateProfileProps {
  navigator: Navigator;
  targetID: number;
  token: string;
}

interface IPrivateProfileStates {
  profileDetails: any;
}

export default class PrivateProfile extends React.Component<IPrivateProfileProps, IPrivateProfileStates> {
  constructor(props: IPrivateProfileProps) {
    super(props);
    this.state = {
      profileDetails: []
    };
  }

  async componentWillMount() {
    axios
      .get(`${Config.API_SERVER}/api/user/profile/full/${this.props.targetID}`, {
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
                key_atr_desc,
                profile_pic
              }) => (
                  <View>
                    <View style={styles.card}>
                      <View style={styles.mbtiCol}>
                        <View style={styles.mbtiRow}>
                          <Text style={this.getMbtiStyle(mbti[0], key_atr)}>{mbti[0]}</Text>
                          <Text style={this.getMbtiStyle(mbti[1], key_atr)}>{mbti[1]}</Text>
                        </View>
                        <View style={styles.rowContainer}>
                          <AvatarImage style={styles.avatar} source={{ uri: `${Config.API_SERVER}${profile_pic}` }} />
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

// import * as React from "react";
// import LinearGradient from "react-native-linear-gradient";
// import { globalStyle } from "./styles/common";
// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   Image
// } from "react-native";
// import RNPickerSelect from "react-native-picker-select";
// import DatePicker from "react-native-datepicker";
// import ImagePicker from "react-native-image-picker";

// // const defaultPic = '../assets/profile-pic.png';

// var imageOptions = {
//   title: "Select profile picture",
//   maxWidth: 200,
//   maxHeight: 200
// };

// interface PrivateProfileProps {
//   navigator: Navigator;
// }

// interface PrivateProfileStates {
//   profilePic: any;
//   name: string;
//   date: string;
//   gender: string;
//   orientation: string;
//   location: string;
//   items: { label: string; value: string }[]; // picker options
//   items2: { label: string; value: string }[];
//   items3: { label: string; value: string }[];
// }

// export default class PrivateProfileCont extends React.Component<
//   PrivateProfileProps,
//   PrivateProfileStates
// > {
//   constructor(props: PrivateProfileProps) {
//     super(props);

//     this.state = {
//       profilePic: require("../assets/profile-pic.png"), // default
//       name: "",
//       date: "21-09-2018",
//       gender: "",
//       items: [
//         {
//           label: "Male",
//           value: "M"
//         },
//         {
//           label: "Female",
//           value: "F"
//         }
//       ],
//       orientation: "",
//       items2: [
//         {
//           label: "Male",
//           value: "Male"
//         },
//         {
//           label: "Female",
//           value: "Female"
//         },
//         {
//           label: "Both",
//           value: "Both"
//         }
//       ],
//       location: "",
//       items3: [
//         // import country list
//         {
//           label: "Hong Kong",
//           value: "Hong Kong"
//         },
//         {
//           label: "Singapore",
//           value: "Singapore"
//         },
//         {
//           label: "Taiwan",
//           value: "Taiwan"
//         }
//       ]
//     };
//   }

//   // wrap 2 functions
//   onPrivateProfilePress() {
//     console.log(
//       this.state.profilePic.uri,
//       this.state.name,
//       this.state.date,
//       this.state.gender,
//       this.state.orientation,
//       this.state.location
//     );
//     // this.props.navigator.push({
//     //   screen: "ResetProfile",
//     //   navigatorStyle: transparentNav
//     // });
//   }

//   // ImagePicker returns an object which includes response.uri: "file://User/../something.jpg"
//   handleImagePicker() {
//     ImagePicker.showImagePicker(imageOptions, res => {
//       console.log("Response = ", res);

//       if (res.didCancel) {
//         console.log("User cancelled image picker");
//       } else if (res.error) {
//         console.log("ImagePicker Error: ", res.error);
//       } else {
//         this.setState({ profilePic: { uri: res.uri } });
//       }
//     });
//   }

//   render() {
//     return (
//       <LinearGradient colors={["#9EF8E4", "#30519B"]} style={[{ flex: 1 }]}>
//         <View style={globalStyle.container}>
//           <View style={globalStyle.cardContainer}>
//             {/* upload photo */}
//             {/* <Image style={styles.propic} source={ require('../assets/profile-pic.png') } /> */}
//             <Image style={styles.propic} source={this.state.profilePic} />
//             <Text
//               style={styles.inputHeader}
//               onPress={() => this.handleImagePicker()}
//             >
//               Add Profile Picture
//             </Text>

//             <View style={styles.profileInput}>
//               <Text style={styles.inputHeader}>Display Name</Text>
//               <TextInput
//                 placeholder="Display Name"
//                 onChangeText={val => this.setState({ name: val })}
//                 placeholderTextColor="#C7C7CD"
//                 returnKeyType="next"
//                 style={styles.input}
//               />

//               <Text style={styles.inputHeader}>Date of Birth</Text>
//               <DatePicker
//                 style={styles.date}
//                 date={this.state.date}
//                 mode="date"
//                 placeholder="Select date"
//                 format="DD-MM-YYYY"
//                 minDate="01-01-1918"
//                 maxDate="31-12-2020"
//                 confirmBtnText="Confirm"
//                 cancelBtnText="Cancel"
//                 showIcon={false}
//                 customStyles={{
//                   dateInput: {
//                     borderWidth: 0,
//                     dateInput: {
//                       paddingVertical: 0
//                     }
//                   }
//                 }}
//                 onDateChange={(date: any) => {
//                   this.setState({ date: date });
//                 }}
//               />

//               <Text style={styles.inputHeader}>Gender</Text>
//               <RNPickerSelect
//                 placeholder={{
//                   label: "Select Gender"
//                 }}
//                 items={this.state.items}
//                 onValueChange={(val: string) => {
//                   this.setState({ gender: val });
//                 }}
//                 value={this.state.gender}
//                 hideIcon={true}
//                 style={{ ...pickerSelectStyles }}
//               />

//               <Text style={styles.inputHeader}>Location</Text>
//               <RNPickerSelect
//                 placeholder={{
//                   label: "Select location"
//                 }}
//                 items={this.state.items3}
//                 onValueChange={(val: string) => {
//                   this.setState({ location: val });
//                 }}
//                 value={this.state.location}
//                 hideIcon={true}
//                 style={{ ...pickerSelectStyles }}
//               />

//               <Text style={styles.inputHeader}>Interested In</Text>
//               <RNPickerSelect
//                 placeholder={{
//                   label: "Select interest"
//                 }}
//                 items={this.state.items2}
//                 onValueChange={(val: string) => {
//                   this.setState({ orientation: val });
//                 }}
//                 value={this.state.orientation}
//                 hideIcon={true}
//                 getPlaceholderStyle
//                 style={{ ...pickerSelectStyles }}
//               />
//             </View>

//             <TouchableOpacity
//               style={styles.btnContainer}
//               onPress={() => this.onPrivateProfilePress()}
//             >
//               <Text style={styles.btnText}>Done</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </LinearGradient>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   profileInput: {
//     flexDirection: "column",
//     alignItems: "flex-start",
//     padding: 10
//   },
//   welcome: {
//     color: "#fff",
//     fontSize: 32,
//     fontWeight: "800",
//     marginBottom: 50
//   },
//   btnContainer: {
//     backgroundColor: "#ffa18e",
//     borderColor: "#fff",
//     paddingHorizontal: 15,
//     paddingVertical: 15,
//     marginVertical: 15,
//     width: "60%"
//   },
//   btnText: {
//     color: "#fff",
//     fontWeight: "700",
//     textAlign: "center"
//   },
//   inputHeader: {
//     marginTop: 9,
//     color: "#2a70b2",
//     fontSize: 14
//   },
//   input: {
//     backgroundColor: "#E5F5FA",
//     color: "#30519B",
//     marginBottom: 10,
//     paddingVertical: 8,
//     paddingHorizontal: 10,
//     borderRadius: 25,
//     width: 250,
//     textAlign: "center"
//   },
//   date: {
//     width: 250,
//     height: 37,
//     backgroundColor: "#E5F5FA",
//     borderRadius: 25,
//     borderColor: "transparent"
//   },
//   propic: {
//     height: 150,
//     width: 150
//   }
// });

// const pickerSelectStyles = StyleSheet.create({
//   inputIOS: {
//     fontSize: 16,
//     paddingVertical: 8,
//     paddingHorizontal: 10,
//     borderRadius: 25,
//     color: "#30519B",
//     // placeholderColor: '#30519B', //not a valid style property > change module index.js line 165
//     backgroundColor: "#E5F5FA",
//     width: 250,
//     textAlign: "center"
//   }
// });
