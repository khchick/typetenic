import * as React from "react";
import LinearGradient from "react-native-linear-gradient";
import { transparentNav, globalStyle } from "./styles/common";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View,
  KeyboardAvoidingView,
  Alert,
  Image,
  Dimensions
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import DatePicker from "react-native-datepicker";
import ImagePicker from "react-native-image-picker";
import axios from 'axios';
import Config from 'react-native-config';
import {connect} from 'react-redux';
import {submitProfile, editProfile} from '../redux/actions/profileAction';


var imageOptions = {
  title: "Select profile picture",
  maxWidth: 200,
  maxHeight: 200
};

interface ResetProfileProps {
  navigator: Navigator;
  token: string;
  onSubmitProfile: (       
    name: string,
    date: string,
    gender: string,
    orientation: string,
    location: string,
    mbti: string,
    keyAtr: string, 
    keyDesc: string,
    imageData: any
  ) => any;
}

interface ResetProfileStates {
  isEdited: boolean,
  imageData: {
    uri: string;
    type: string;
    name: string | undefined;
  },
  profilePic: any;
  name: string;
  email: string;
  password: string,
  hidePassword: boolean,
  date: string;
  gender: string;
  orientation: string,
  location: string;
  mbti: string,
  keyAtr: string, 
  keyDesc: string,
  energy: string,
  information: string,
  decision: string,
  lifestyle: string,
  IE: boolean,
  SN: boolean,
  FT: boolean,
  PJ: boolean,
  items: { label: string; value: string }[]; // picker options
  items2: { label: string; value: string }[];
  items3: { label: string; value: string }[];
}

class PureResetProfile extends React.Component<ResetProfileProps,ResetProfileStates> {
  constructor(props: ResetProfileProps) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.state = {
      isEdited: false,
      imageData: {
        uri: '',
        type: '',
        name:''
      },
      profilePic: require('../assets/profile-pic.png'), // default
      name: '',
      email: '',
      password: '',
      hidePassword: true,
      date: "2018-09-21",
      gender: '',
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
      location: '',
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
      orientation: '',
      mbti: '',
      keyAtr: '', 
      keyDesc: '',
      energy: '',
      information: '',
      decision: '',
      lifestyle: '',
      IE: false,
      SN: false,
      FT: false,
      PJ: false,
    };
  }

  onNavigatorEvent(event: any) { 
    if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
      if (event.id == 'edit profile') { // this is the same id field from the static navigatorButtons definition
       console.log('edited profile')       
        let profileData = new FormData();
        profileData.append('display_name', this.state.name); // key/value pairs 
        profileData.append('email', this.state.email); 
        profileData.append('password', this.state.password); 
        profileData.append('dob', this.state.date); 
        profileData.append('gender', this.state.gender); 
        profileData.append('location', this.state.location); 
        profileData.append('key_atr', this.state.keyAtr); 
        profileData.append('key_atr_desc', this.state.keyDesc); 
        profileData.append('profile_pic', this.state.imageData);

        if(this.state.isEdited) {
          return axios.put<{ token: string }>(
            `${Config.API_SERVER}/api/user/myprofile`, 
                profileData
                ,{
                headers: {
                  Authorization: 'Bearer ' + this.props.token,
                  'Content-Type': 'multipart/form-data'
                }
                }
            )        
            .then(() => {
              this.props.onSubmitProfile(this.state.name, this.state.date, this.state.gender, this.state.orientation, this.state.location, this.state.mbti , this.state.keyAtr, this.state.keyDesc, this.state.imageData)
              this.props.navigator.popToRoot({
                animated: true, // does the popToRoot have transition animation or does it happen immediately (optional)
                animationType: 'slide-horizontal', // 'fade' (for both) / 'slide-horizontal' (for android) does the popToRoot have different transition animation (optional)
              })   
            })
            .catch(err => {
              console.log(err);
            })
        } else {
          this.props.navigator.popToRoot({
            animated: true, // does the popToRoot have transition animation or does it happen immediately (optional)
            animationType: 'slide-horizontal', // 'fade' (for both) / 'slide-horizontal' (for android) does the popToRoot have different transition animation (optional)
          })   
        }
      
      }
    }
  }

  async componentDidMount() {  
    axios.get(`${Config.API_SERVER}/api/user/myprofile`, {
      headers: {
        Authorization: 'Bearer ' + this.props.token
      }
    })
      .then((res)=> {
         this.setState({
          profilePic: {uri: `${Config.API_SERVER}` + res.data[0].profile_pic},
          imageData: {
            uri : `${Config.API_SERVER}` + res.data[0].profile_pic,
            type: 'image/jpeg', // res.type,
            name: res.data[0].profile_pic
          },
          name: res.data[0].display_name,
          email: res.data[0].email,
          password: res.data[0].password, // *** need to decode ***
          date: res.data[0].dob,
          gender: res.data[0].gender,
          location: res.data[0].location,
          keyAtr: res.data[0].key_atr,
          keyDesc: res.data[0].key_atr_desc,
          energy: res.data[0].mbti.split('')[0],
          information: res.data[0].mbti.split('')[1],
          decision: res.data[0].mbti.split('')[2],
          lifestyle: res.data[0].mbti.split('')[3],
        })  
      })
      .then(()=> {
        this.setState({isEdited: false}) // reset after initial get api
      })
      .catch(err => console.log(err))      
  }

  // ImagePicker returns an object which includes response.uri: "file://User/../something.jpg"
  handleImagePicker() {
    ImagePicker.showImagePicker(imageOptions, res => {
      console.log("Response = ", res);

      if (res.didCancel) {
        console.log("User cancelled image picker");
      } else if (res.error) {
        console.log("ImagePicker Error: ", res.error);
      } else {
        let imageObj = {
          uri : res.uri,
          type: 'image/jpeg', // res.type,
          name: res.fileName
        }
        
        this.setState({profilePic: { uri: res.uri }}); // for immediate display
        this.setState({imageData: imageObj}); // for file upload
        this.setState({isEdited: true}); 
      }
    });
  }

  managePasswordVisibility = () => {
    this.setState({ hidePassword: !this.state.hidePassword });
  }

  onSelectEnergy() {
    this.setState({
      keyAtr: this.state.energy, 
      IE: true,
      SN: false,
      FT: false,
      PJ: false,
      isEdited: true
    })
  }

  onSelectInformation() {
    this.setState({
      keyAtr: this.state.information,
      IE: false, 
      SN: true,
      FT: false,
      PJ: false,
      isEdited: true
    })
  }

  onSelectDecision() {
    this.setState({
      keyAtr: this.state.decision, 
      IE: false, 
      SN: false,
      FT: true,
      PJ: false,
      isEdited: true
    })
  }

  onSelectLifestyle() {
    this.setState({
      keyAtr: this.state.lifestyle, 
      IE: false,
      SN: false,
      FT: false,
      PJ: true,
      isEdited: true
    })
  }

  render() {
    let energyStyle = this.state.IE ? styles.selectedKeySquare : styles.keySquare;
    let infoStyle = this.state.SN ? styles.selectedKeySquare : styles.keySquare;
    let decisionStyle = this.state.FT ? styles.selectedKeySquare : styles.keySquare;
    let lifeStyle = this.state.PJ ? styles.selectedKeySquare : styles.keySquare;

    return (
      <LinearGradient colors={["#9EF8E4", "#30519B"]} style={[{ flex: 1 }]}>
      <View style={globalStyle.container}>

        <ScrollView>
          <View style={globalStyle.cardContainer}>
           
            <Image style={styles.propic} source={ this.state.profilePic }/>
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
                onChangeText={val => this.setState({ name: val, isEdited: true })}
                placeholderTextColor="#C7C7CD"
                returnKeyType="next"
                style={styles.input}
                value={this.state.name}
              />

              <Text style={styles.inputHeader}>Email</Text>
              <TextInput placeholder='Email' 
                onChangeText={ (val) => this.setState({email: val, isEdited: true}) } 
                placeholderTextColor='#fff'
                keyboardType='email-address'
                autoCapitalize='none'
                style={styles.input}
                value={this.state.email}
              />

              {/* <Text style={styles.inputHeader}>Password</Text>
              <View style={styles.passwordRow}>
                <TextInput placeholder='Password' 
                  secureTextEntry={ this.state.hidePassword } 
                  onChangeText={ (val) => this.setState({password: val, isEdited: true})}  
                  placeholderTextColor='#C7C7CD'
                  style={styles.passwordInput}
                  value={this.state.password}
                />
                <TouchableOpacity activeOpacity = { 0.8 } style = { styles.passwordBtn } onPress = { this.managePasswordVisibility }>
                  <Image source = { ( this.state.hidePassword ) ? require('../assets/hide.png') : require('../assets/show.png') } 
                    style = { styles.passwordImage } />
                </TouchableOpacity>
              </View> */}

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
                  this.setState({ date: date, isEdited: true });
                }}
              />

              <Text style={styles.inputHeader}>Gender</Text>
              <RNPickerSelect
                placeholder={{
                  label: "Select Gender"
                }}
                items={this.state.items}
                onValueChange={(val: string) => {
                  this.setState({ gender: val, isEdited: true });
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
                  this.setState({ location: val, isEdited: true });
                }}
                value={this.state.location}
                hideIcon={true}
                style={{ ...pickerSelectStyles }}
              />

              <Text style={styles.inputHeader}>MBTI Key Attribute</Text>
              <View style={styles.attribute}>
                <TouchableOpacity style={energyStyle} onPress={() => this.onSelectEnergy()}>
                  <Text>{this.state.energy}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={infoStyle} onPress={() => this.onSelectInformation()} >
                  <Text>{this.state.information}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={decisionStyle} onPress={() => this.onSelectDecision()} >
                  <Text>{this.state.decision}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={lifeStyle} onPress={() => this.onSelectLifestyle()}>
                  <Text>{this.state.lifestyle}</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.inputHeader}>About Me</Text>
              <TextInput style={styles.descInput}
                onChangeText={ (val) => this.setState({keyDesc: val, isEdited: true }) } 
                multiline = {true}
                maxLength = {200}
                value={this.state.keyDesc} 
              />

            </View>
           
          </View>
        </ScrollView>
      </View>
      </LinearGradient>
    );
  }
}

const MapStateToProps = (state: any) => {
  return {
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onSubmitProfile: (       
      name: string,
      date: string,
      gender: string,
      orientation: string,
      location: string,
      mbti: string, 
      keyAtr: string, 
      keyDesc: string,
      imageData: any) => {
      dispatch(submitProfile(name, date, gender, orientation, location, mbti, keyAtr, keyDesc, imageData))
    }
  }
}

const ResetProfile = connect(MapStateToProps, mapDispatchToProps)(PureResetProfile);
export default ResetProfile;


const {height, width} = Dimensions.get('window');

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
    width: 250,
    textAlign: "center"
  },
  date: {
    width: 250,
    height: 37,
    backgroundColor: "#E5F5FA",
    borderColor: "transparent"
  },
  propic: {
    height: 150,
    width: 150,
    borderRadius: 150/2,
    resizeMode: 'contain'
  },
  passwordRow:{
    flexDirection: 'row',
  },
  passwordInput: {
    backgroundColor: "#E5F5FA",
    color: "#30519B",
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    width: 250,
    textAlign: "center"
  },
  passwordBtn: {
    height: 40,
    width: 35,
    padding: 5
  },
  passwordImage: {
    resizeMode: 'contain',
    height: '100%',
    width: '100%'
  },
  attribute:{
    flexDirection: 'row',
    marginBottom: 15,
  },
  keySquare:{
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#30519B',
    borderWidth: 1,
    height: 40,
    width: 40,
    margin: 5,
  },  
  selectedKeySquare: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#30519B',
    borderWidth: 1,
    height: 40,
    width: 40,
    margin: 5,
    backgroundColor: '#e0fbff',
  },
  descInput: {
    borderColor: '#30519B',
    borderWidth: 1,
    height: height * 0.3,
    width: width * 0.65,
    fontSize: 16,
    color: '#30519B',
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    color: "#30519B",
    backgroundColor: "#E5F5FA",
    width: 250,
    textAlign: "center"
  },
});
