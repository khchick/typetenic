import * as React from "react";
import LinearGradient from "react-native-linear-gradient";
import { transparentNav, globalStyle } from "./styles/common";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  View,
  KeyboardAvoidingView,
  Alert,
  Image,
  TouchableHighlight,
  ScrollView
} from "react-native";
import Modal from "react-native-modal";
import RNPickerSelect from "react-native-picker-select";
import DatePicker from "react-native-datepicker";
import ImagePicker from "react-native-image-picker";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { connect } from 'react-redux';
import { editProfile } from '../redux/actions/profileAction';


var imageOptions = {
  title: "Select profile picture",
  maxWidth: 160,
  maxHeight: 160
};

interface SignupProps {
  navigator: Navigator,
  id: number,
  max_age: number,
  min_age: number,
  token: number,
  onEditProfile: (
    id: number,
    max_age: number,
    min_age: number,
    token: number,
    profilePic: any,
    imageData: {
      uri: string;
      type: string;
      name: string | null;
    },
    name: string,
    date: string,
    gender: string,
    orientation: string,
    location: string, ) => any
}

interface SignupStates {
  errorMsg: boolean,
  imageData: any,
  profilePic: any;
  name: string;
  date: string;
  gender: string;
  orientation: string;
  location: string;
  items: { label: string; value: string }[]; // picker options
  items2: { label: string; value: string }[];
  items3: { label: string; value: string }[];
  isModalVisible: boolean
}

class PureSignupCont extends React.Component<SignupProps, SignupStates> {
  constructor(props: SignupProps) {
    super(props);
    this.props.navigator.setStyle({
      navBarNoBorder: true
    });

    this.state = {
      errorMsg: false,
      imageData: null, // for upload
      profilePic: require("../assets/profile-pic.png"), // default
      name: "",
      date: "2018-09-21",
      gender: "",
      items: [
        {
          label: "Male",
          value: "M"
        },
        {
          label: "Female",
          value: "F"
        }
      ],
      orientation: "",
      items2: [
        {
          label: "Male",
          value: "M"
        },
        {
          label: "Female",
          value: "F"
        },
        {
          label: "Both",
          value: "both"
        }
      ],
      location: "",
      items3: [
        // import country list
        {
          label: "Hong Kong",
          value: "Hong Kong"
        },
        {
          label: "Singapore",
          value: "Singapore"
        },
        {
          label: "Taiwan",
          value: "Taiwan"
        }
      ],
      isModalVisible: false
    };
  }

  // wrap multiple functions 
  onSignupPress() {
    // check input
    if (this.state.name == '' || this.state.date == '' || this.state.gender == '' || this.state.imageData == null || this.state.orientation == '' || this.state.location == '') {
      this.setState({
        errorMsg: true,
        isModalVisible: true
      })
    } else {
      this.props.onEditProfile(this.props.id, this.props.max_age, this.props.min_age, this.props.token, this.state.profilePic.uri, this.state.imageData, this.state.name, this.state.date, this.state.gender, this.state.orientation, this.state.location)
      this.props.navigator.push({
        screen: 'MbtiTest1Screen',
        navigatorStyle: { navBarNoBorder: true },
        appStyle: {
          //backButtonImage: require('./')
          hideBackButtonTitle: true,
        }
      })
    }
  }

  // ImagePicker returns an object which includes response.uri: "file://User/../something.jpg"
  handleImagePicker() {
    ImagePicker.showImagePicker(imageOptions, res => {
      console.log(res);

      if (res.didCancel) {
        console.log("User cancelled image picker");
      } else if (res.error) {
        console.log("ImagePicker Error: ", res.error);
      } else {
        let imageObj = {
          uri: res.uri,
          type: 'image/jpeg', // res.type,
          name: res.fileName
        }

        this.setState({ profilePic: { uri: res.uri } }); // for immediate display
        this.setState({ imageData: imageObj }); // for file upload

      }
    });
  }

  render() {
    return (
      <LinearGradient colors={["#9EF8E4", "#30519B"]} style={[{ flex: 1 }]}>

        <ScrollView>
          <View style={styles.container}>
            <View style={styles.card}>
              <View style={styles.propicContainer}>
                <Image style={styles.propic} source={this.state.profilePic} />
                <Text
                  style={styles.inputHeader}
                  onPress={() => this.handleImagePicker()}
                >
                  Change Profile Picture
               </Text>
              </View>

              <View style={styles.profileInput}>
                <Text style={styles.inputHeader}>Display Name</Text>
                <TextInput
                  placeholder="Display Name"
                  onChangeText={val => this.setState({ name: val })}
                  placeholderTextColor="#C7C7CD"
                  returnKeyType="next"
                  style={styles.input}
                />

                <Text style={styles.inputHeader}>Date of Birth</Text>
                <DatePicker
                  style={styles.date}
                  date={this.state.date}
                  mode="date"
                  placeholder="Select date"
                  format="YYYY-MM-DD"
                  minDate="1918-01-01"
                  maxDate="2020-12-31"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  showIcon={false}
                  customStyles={{
                    dateInput: {
                      borderWidth: 0,
                      dateInput: {
                        paddingVertical: 0
                      }
                    }
                  }}
                  onDateChange={(date: any) => {
                    this.setState({ date: date });
                  }}
                />

                <Text style={styles.inputHeader}>Gender</Text>
                <RNPickerSelect
                  placeholder={{
                    label: "Select Gender"
                  }}
                  items={this.state.items}
                  onValueChange={(val: string) => {
                    this.setState({ gender: val });
                  }}
                  value={this.state.gender}
                  hideIcon={true}
                  style={{ ...pickerSelectStyles }}
                />

                <Text style={styles.inputHeader}>Location</Text>
                <RNPickerSelect
                  placeholder={{
                    label: "Select location"
                  }}
                  items={this.state.items3}
                  onValueChange={(val: string) => {
                    this.setState({ location: val });
                  }}
                  value={this.state.location}
                  hideIcon={true}
                  style={{ ...pickerSelectStyles }}
                />

                <Text style={styles.inputHeader}>I'm interested in</Text>
                <RNPickerSelect
                  placeholder={{
                    label: "Select interest"
                  }}
                  items={this.state.items2}
                  onValueChange={(val: string) => {
                    this.setState({ orientation: val });
                  }}
                  value={this.state.orientation}
                  hideIcon={true}
                  getPlaceholderStyle
                  style={{ ...pickerSelectStyles }}
                />
              </View>

              {this.state.errorMsg ? (
                <Modal
                  isVisible={this.state.isModalVisible}
                  onBackdropPress={() => this.setState({ isModalVisible: false })}
                  backdropOpacity={0}
                  style={styles.bottomModal}
                >
                  <View style={styles.modalContent}>
                    <Text style={styles.modalText}>Please input all fields</Text>
                  </View>

                </Modal>
              ) : <Text></Text>}


              <TouchableOpacity
                style={styles.btnContainer}
                onPress={() => this.onSignupPress()}
              >
                <Text style={styles.btnText}>Start MBTI Test</Text>
              </TouchableOpacity>

            </View>
          </View>
        </ScrollView>

      </LinearGradient>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    id: state.profile.id,
    max_age: state.profile.max_age,
    min_age: state.profile.min_age,
    token: state.profile.token,
    profilePic: state.profile.profilePic,
    imageData: state.profile.imageData,
    name: state.profile.name,
    date: state.profile.date,
    gender: state.profile.gender,
    orientation: state.profile.orientation,
    location: state.profile.location,
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  onEditProfile: (
    id: number,
    max_age: number,
    min_age: number,
    token: number,
    profilePic: string,
    imageData: any,
    name: string,
    date: string,
    gender: string,
    orientation: string,
    location: string, ) => dispatch(editProfile(id, max_age, min_age, token, profilePic, imageData, name, date, gender, orientation, location))
})

const SignupCont = connect(mapStateToProps, mapDispatchToProps)(PureSignupCont);
export default SignupCont;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  propicContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp('4%'),
    marginBottom: hp('2%')
  },
  propic: {
    height: 150,
    width: 150,
    borderRadius: 150 / 2,
    resizeMode: 'contain',
    marginBottom: hp('2%')
  },
  profileInput: {
    marginTop: hp('2%'),
    paddingHorizontal: hp('1.5%')
  },
  inputHeader: {
    marginTop: 9,
    color: "#2a70b2",
    fontSize: 16,
    marginBottom: hp('1%')
  },
  input: {
    backgroundColor: "#E5FDF9",
    color: "#30519B",
    marginBottom: 10,
    height: hp('6%'),
    width: wp('74%'),
    textAlign: "center",
    fontSize: 14
  },
  date: {
    backgroundColor: "#E5FDF9",
    color: "#30519B",
    marginBottom: 10,
    height: hp('6%'),
    width: wp('74%'),
    textAlign: "center"
  },
  bottomModal: {
    justifyContent: "flex-end", // 
    margin: 0
  },
  modalContent: {
    backgroundColor: "white",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    color: "#E0674B"
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: hp('3%'),
    marginBottom: hp('3.5%'),
    marginHorizontal: wp('10%'),
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('3%'),
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 2, height: -3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    width: wp('85%'),
  },
  btnContainer: {
    backgroundColor: '#F0957F',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: hp('3%'),
    marginBottom: hp('5%'),
    width: wp('50%'),
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    borderRadius: 4
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 1.5
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: "#E5FDF9",
    color: "#30519B",
    marginBottom: 10,
    height: hp('6%'),
    width: wp('74%'),
    textAlign: "center",
    fontSize: 14
  },
});
