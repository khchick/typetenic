import * as React from "react";
import LinearGradient from "react-native-linear-gradient";
import { globalStyle } from "./styles/common";
import RangeSlider from "react-native-range-slider";
import ToggleSwitch from "toggle-switch-react-native";
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import axios from 'axios';
import Config from 'react-native-config';
import {editSettings} from '../redux/actions/profileAction';
import {
  createSentReq,
  createConnection
} from "./../redux/actions/refreshAction";


interface SettingsProps {
  navigator: Navigator;
  token: string;
  max_age: number;
  min_age: number;
  orientation: string;
  editSettings: (
    max_age: number,
    min_age: number,
    orientation: string) => any;
  createSentReq: () => any;
  createConnection: () => any;
}

interface SettingsState {
  isEdited: boolean,  
  min: number, // confirmed val
  max: number, // confirmed val
  minAge: number, 
  maxAge: number, 
  orientation: string,
  showMe: Array<string>;
  isOnMenSwitch: boolean;
  isOnWomenSwitch: boolean;
  isOnMatchesSwitch: boolean;
  isOnRequestSwitch: boolean;
  isOnMessagesSwitch: boolean;
}

class PureSettings extends React.Component<SettingsProps, SettingsState> {
  constructor(props: SettingsProps) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.state = {
      isEdited: false,
      min: 0,
      max: 0,
      minAge: 0,
      maxAge: 0,
      orientation: '',
      showMe: [],
      isOnMenSwitch: false,
      isOnWomenSwitch: false,
      isOnMatchesSwitch: false,
      isOnRequestSwitch: false,
      isOnMessagesSwitch: false
    };
  }

  componentDidMount() {  
    axios.get(`${Config.API_SERVER}/api/user/myprofile`, {
      headers: {
        Authorization: 'Bearer ' + this.props.token
      }
    })
      .then((res)=> {
         this.setState({
          minAge: res.data[0].min_age,
          maxAge: res.data[0].max_age,
          orientation: res.data[0].orientation
        });
      })
      .then(()=> {
        if (this.state.orientation == 'F') {
          this.setState({
            isOnMenSwitch: false,
            isOnWomenSwitch: true
          });
        } else if (this.state.orientation == 'M') {
          this.setState({
            isOnMenSwitch: true,
            isOnWomenSwitch: false
          });
        } else {
          this.setState({
            isOnMenSwitch: true,
            isOnWomenSwitch: true
          });
        }
        
      })
      .then(()=> {
        this.setState({isEdited: false}) // reset after initial get api
      })
      .catch(err => console.log(err))      
  }

  onNavigatorEvent(event: any) { 
    if (event.type == 'NavBarButtonPress') { 
      if (event.id == 'settings') { 

        if(this.state.isOnMenSwitch && this.state.isOnWomenSwitch == false) {
          this.setState({orientation: 'M'})
        } else if (this.state.isOnMenSwitch == false && this.state.isOnWomenSwitch) {
          this.setState({orientation: 'F'})
        } else {
          this.setState({orientation: 'Both'})
        }

        console.log(this.state)
        if(this.state.isEdited) {         
          return axios.put<{ token: string }>(
            `${Config.API_SERVER}/api/user/settings`, 
              {
                min_age: this.state.min,
                max_age: this.state.max,
                orientation: this.state.orientation
              }
              ,{
                headers: {
                  Authorization: 'Bearer ' + this.props.token,
                }
              }
            )
            .then(() => {
              this.props.editSettings(this.state.max, this.state.min, this.state.orientation)  
              this.props.createSentReq();
              this.props.createConnection();

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
            animated: true, 
            animationType: 'slide-horizontal', 
          })   
        }
        
      }
    }
  }

  onToggle(isOn) {
    return isOn;
  }

  render() {
    return (
      <LinearGradient colors={["#9EF8E4", "#30519B"]} style={[{ flex: 1 }]}>
      <View style={styles.container}>

          <View style={styles.subContainer}>            
              <Text style={styles.subHeader}>Age Range</Text>
              <RangeSlider
                style={styles.slider}
                minValue={18}
                maxValue={60}
                lineHeight={2.5}
                tintColorBetweenHandles={"#fda190"}
                tintColor={"#53a5c4"}
                handleColor={"#30519B"}
                handleDiameter={22}
                selectedMinimum={this.state.minAge}
                selectedMaximum={this.state.maxAge}
                onChange={(data: any) => {
                  this.setState({ 
                    min: data.selectedMinimum, 
                    max: data.selectedMaximum,
                    isEdited: true 
                  })
                }}
              />
          </View>

          <View style={styles.subContainer}>
              <Text style={styles.subHeader}>Interested In</Text>

              <View style={styles.showMeRow}>
                <Text style={styles.showMeText}>Men</Text>
                <ToggleSwitch
                  onColor="#fda190"
                  offColor="#53a5c4"
                  size="medium"
                  isOn={this.state.isOnMenSwitch}
                  onToggle={isOnMenSwitch => {
                    this.setState({ isOnMenSwitch });
                    this.onToggle(isOnMenSwitch);
                    this.setState({
                      isEdited: true})
                  }}
                />
              </View>
              <View style={styles.showMeRow}>
                <Text style={styles.showMeText}>Women</Text>
                <ToggleSwitch
                  onColor="#fda190"
                  offColor="#53a5c4"
                  size="medium"
                  isOn={this.state.isOnWomenSwitch}
                  onToggle={isOnWomenSwitch => {
                    this.setState({ isOnWomenSwitch });
                    this.onToggle(isOnWomenSwitch);
                    this.setState({
                      isEdited: true})
                  }}
                />
              </View>
          </View>

              {/* <View style={styles.subContainer}>
                <View style={styles.messagerow}>
                  <Text style={styles.subHeader}> Notification</Text>
                  <ToggleSwitch
                    //isOn={false}
                    onColor="#fda190)"
                    offColor="#53a5c4"
                    label="Matches   "
                    labelStyle={{
                      color: "#53a5c4",
                      fontSize: 20,
                      padding: 10
                    }}
                    size="large"
                    isOn={this.state.isOnMatchesSwitch}
                    onToggle={isOnMatchesSwitch => {
                      this.setState({ isOnMatchesSwitch });
                      this.onToggle(isOnMatchesSwitch);
                    }}
                  />

                  <ToggleSwitch
                    onColor="#fda190)"
                    offColor="#53a5c4"
                    label="Request    "
                    labelStyle={{
                      color: "#53a5c4",
                      fontSize: 20,
                      padding: 10
                    }}
                    size="large"
                    isOn={this.state.isOnRequestSwitch}
                    onToggle={isOnRequestSwitch => {
                      this.setState({ isOnRequestSwitch });
                      this.onToggle(isOnRequestSwitch);
                    }}
                  />
                  <ToggleSwitch
                    onColor="#fda190)"
                    offColor="#53a5c4"
                    label="Messages "
                    labelStyle={{
                      color: "#53a5c4",
                      fontSize: 20,
                      padding: 10
                    }}
                    size="large"
                    isOn={this.state.isOnMessagesSwitch}
                    onToggle={isOnMessagesSwitch => {
                      this.setState({ isOnMessagesSwitch });
                      this.onToggle(isOnMessagesSwitch);
                    }}
                  />
                </View>
              </View> */}
              
      </View>
      </LinearGradient>
    );
  }
}

const MapStateToProps = (state: any) => {
  return {
    token: state.auth.token,
    max_age: state.profile.max_age,
    min_age: state.profile.min_age,
    orientation: state.profile.orientation,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  editSettings: (
    max_age: number,
    min_age: number,
    orientation: string) => dispatch(editSettings(max_age, min_age, orientation)),
    createSentReq: () => dispatch(createSentReq()),
    createConnection: () => dispatch(createConnection())
})

const Settings = connect(MapStateToProps, mapDispatchToProps)(PureSettings);
export default Settings;


const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: "center",
    padding: 10,
  },
  subContainer: {
    width: width * 0.9,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    backgroundColor: "#F5F7F9",
    paddingHorizontal: 5,
    paddingVertical: 8,
    marginVertical: 8
  },
  slider: {
    height: 80,
    padding: 15,
    marginLeft: 20,
    marginRight: 20
  },
  subHeader: {
    color: "#30519B",
    fontWeight: "bold",
    fontSize: 16,
    padding: 15,
    textAlign: "left"
  },
  showMeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 18,
    marginVertical: 5
  },
  showMeText: {
    color: '#30519B',
    fontSize: 15,
    paddingLeft: 15,
  }
  // messagerow: {
  //   // backgroundColor: "rgb(232,238,241)",
  //   padding: 15,
  //   height: 240
  //   // marginLeft: 30,
  //   // marginRight: 30
  // }
});
