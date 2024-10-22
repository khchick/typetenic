import * as React from "react";
import LinearGradient from "react-native-linear-gradient";
import { transparentNav, globalStyle } from "./styles/common";
import {
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import App from "../App";
import { connect } from "react-redux";
import { editKeyAtr, submitProfile } from "../redux/actions/profileAction";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface MbtiProfileProps {
  navigator: Navigator;
  profilePic: string;
  imageData: any;
  name: string;
  date: string;
  gender: string;
  orientation: string;
  location: string;
  mbti: string;
  keyAtr: string;
  keyDesc: string;
  energy: string;
  information: string;
  decision: string;
  lifestyle: string;
  onSubmitKey: (keyAtr: string, keyDesc: string) => any;
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

interface MbtiProfileStates {
  keyAtr: string;
  keyDesc: string;
  IE: boolean;
  SN: boolean;
  FT: boolean;
  PJ: boolean;
}

class PureMbtiProfile extends React.Component<
  MbtiProfileProps,
  MbtiProfileStates
  > {
  constructor(props: any) {
    super(props);
    this.state = {
      keyAtr: "",
      keyDesc: "",
      IE: false,
      SN: false,
      FT: false,
      PJ: false
    };
  }

  onSubmitPress() {
    console.log(this.state);
    this.props.onSubmitKey(this.state.keyAtr, this.state.keyDesc);
    this.props.onSubmitProfile(
      this.props.name,
      this.props.date,
      this.props.gender,
      this.props.orientation,
      this.props.location,
      this.props.mbti,
      this.state.keyAtr,
      this.state.keyDesc,
      this.props.imageData
    );
  }

  onSelectEnergy() {
    this.setState({
      keyAtr: this.props.energy,
      IE: true,
      SN: false,
      FT: false,
      PJ: false
    });
  }

  onSelectInformation() {
    this.setState({
      keyAtr: this.props.information,
      IE: false,
      SN: true,
      FT: false,
      PJ: false
    });
  }

  onSelectDecision() {
    this.setState({
      keyAtr: this.props.decision,
      IE: false,
      SN: false,
      FT: true,
      PJ: false
    });
  }

  onSelectLifestyle() {
    this.setState({
      keyAtr: this.props.lifestyle,
      IE: false,
      SN: false,
      FT: false,
      PJ: true
    });
  }

  render() {
    let energyStyle = this.state.IE
      ? styles.selectedKeySquare
      : styles.keySquare;
    let infoStyle = this.state.SN ? styles.selectedKeySquare : styles.keySquare;
    let decisionStyle = this.state.FT
      ? styles.selectedKeySquare
      : styles.keySquare;
    let lifeStyle = this.state.PJ ? styles.selectedKeySquare : styles.keySquare;

    return (
      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
        <LinearGradient colors={["#9EF8E4", "#30519B"]} style={[{ flex: 1 }]}>
          <KeyboardAvoidingView style={styles.container} behavior='padding'>

            <View style={styles.card} >

              <Text style={styles.title}>Choose a MBTI Key Attribute</Text>


              <View style={styles.attribute}>
                <TouchableOpacity
                  style={energyStyle}
                  onPress={() => this.onSelectEnergy()}
                >
                  <Text>{this.props.energy}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={infoStyle}
                  onPress={() => this.onSelectInformation()}
                >
                  <Text>{this.props.information}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={decisionStyle}
                  onPress={() => this.onSelectDecision()}
                >
                  <Text>{this.props.decision}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={lifeStyle}
                  onPress={() => this.onSelectLifestyle()}
                >
                  <Text>{this.props.lifestyle}</Text>
                </TouchableOpacity>
              </View>


              <Text style={styles.title}>About Me</Text>

              <TextInput
                placeholder="I am an outgoing person who enjoy meeting new people and learning new things during free time. Reading, diving and hiking are my hobbies."
                placeholderTextColor="#C7C7CD"
                style={styles.input}
                onChangeText={val => this.setState({ keyDesc: val })}
                multiline={true}
                maxLength={200}
                value={this.props.keyDesc}
              />

              <TouchableOpacity
                style={styles.btnContainer}
                onPress={() => this.onSubmitPress()}
              >
                <Text style={styles.btnText}>START DISCOVERING</Text>
              </TouchableOpacity>

            </View>
          </KeyboardAvoidingView>
        </LinearGradient>
      </TouchableWithoutFeedback >
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
    mbti: state.profile.mbti,
    key_atr: state.profile.key_atr,
    key_atr_desc: state.profile.key_atr_desc,
    energy: state.profile.energy,
    information: state.profile.information,
    decision: state.profile.decision,
    lifestyle: state.profile.lifestyle
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onSubmitKey: (keyAtr: string, keyDesc: string) => {
      dispatch(editKeyAtr(keyAtr, keyDesc));
    },
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
    ) => {
      dispatch(
        submitProfile(
          name,
          date,
          gender,
          orientation,
          location,
          mbti,
          keyAtr,
          keyDesc,
          imageData
        )
      );
    }
  };
};

const MbtiProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)(PureMbtiProfile);
export default MbtiProfile;

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: hp('3%'),
    marginBottom: hp('3%'),
    marginHorizontal: wp('10%'),
    paddingVertical: hp('3%'),
    paddingHorizontal: wp('3%'),
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 2, height: -3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    width: wp('85%'),
  },
  title: {
    marginTop: 9,
    color: "#2a70b2",
    fontSize: 16,
    marginBottom: hp('1%'),
  },
  btnContainer: {
    backgroundColor: '#F0957F',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 10,
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
  attribute: {
    flexDirection: "row",
    margin: 3,
    marginBottom: 15
  },
  keySquare: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#30519B",
    borderWidth: 1,
    height: 40,
    width: 40,
    margin: 5
  },
  selectedKeySquare: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#30519B',
    borderWidth: 1,
    height: 40,
    width: 40,
    margin: 5,
    backgroundColor: '#E5FDF9',
  },
  input: {
    borderColor: '#30519B',
    borderWidth: 1,
    height: height * 0.3,
    width: wp('74%'),
    fontSize: 16,
    color: '#30519B',
    marginBottom: hp('3%')
  },
});
