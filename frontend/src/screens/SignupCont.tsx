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
  Image
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import DatePicker from "react-native-datepicker";
import ImagePicker from "react-native-image-picker";

import {connect} from 'react-redux';
import {editProfile} from '../redux/actions/profileAction';


var imageOptions = {
  title: "Select profile picture",
  maxWidth: 160,
  maxHeight: 160
};

interface SignupProps {
    navigator: Navigator,
    onEditProfile: (  
      profilePic: any,
      imageData: any,
      name: string,
      date: string,
      gender: string,
      orientation: string,
      location: string,) => any
}

interface SignupStates {
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
}

class PureSignupCont extends React.Component<SignupProps, SignupStates> {
  constructor(props: SignupProps) {
    super(props);

    this.state = {
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
      ]
    };
  }

// wrap multiple functions 
  onSignupPress() {
    this.props.onEditProfile(this.state.profilePic.uri, this.state.imageData, this.state.name, this.state.date, this.state.gender, this.state.orientation, this.state.location)    
    this.props.navigator.push({
      screen: 'MbtiTest1Screen',
      navigatorStyle: transparentNav,
    })
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
          path : res.uri,
          type: 'image/jpeg', // res.type,
          name: res.fileName
        }
        
        this.setState({profilePic: { uri: res.uri }}); // for immediate display
        this.setState({imageData: imageObj}); // for file upload
        
      }
    });
  }

  render() {
    return (
      <LinearGradient colors={["#9EF8E4", "#30519B"]} style={[{ flex: 1 }]}>
        <View style={globalStyle.container}>
          <View style={globalStyle.cardContainer}>
            {/* upload photo */}
            <Image style={styles.propic} source={this.state.profilePic} />
            <Text
              style={styles.inputHeader}
              onPress={() => this.handleImagePicker()}
            >
              Add Profile Picture
            </Text>

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

            <TouchableOpacity
              style={styles.btnContainer}
              onPress={() => this.onSignupPress()}
            >
              <Text style={styles.btnText}>Start MBTI Test</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
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
    profilePic: string,
    imageData: any,
    name: string,
    date: string,
    gender: string,
    orientation: string,
    location: string,) => dispatch(editProfile(profilePic, imageData, name, date, gender, orientation, location))
})

const SignupCont = connect(mapStateToProps, mapDispatchToProps)(PureSignupCont);
export default SignupCont;


const styles = StyleSheet.create({
  profileInput: {
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 10
  },
  welcome: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 50
  },
  btnContainer: {
    backgroundColor: "#ffa18e",
    borderColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginVertical: 15,
    width: "60%"
  },
  btnText: {
    color: "#fff",
    fontWeight: "700",
    textAlign: "center"
  },
  inputHeader: {
    marginTop: 9,
    color: "#2a70b2",
    fontSize: 14
  },
  input: {
    backgroundColor: "#E5F5FA",
    color: "#30519B",
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 25,
    width: 250,
    textAlign: "center"
  },
  date: {
    width: 250,
    height: 37,
    backgroundColor: "#E5F5FA",
    borderRadius: 25,
    borderColor: "transparent"
  },
  propic: {
    height: 130,
    width: 130,
    borderRadius: 60,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 25,
    color: "#30519B",
    // placeholderColor: '#30519B', //not a valid style property > change module index.js line 165
    backgroundColor: "#E5F5FA",
    width: 250,
    textAlign: "center"
  }
});
