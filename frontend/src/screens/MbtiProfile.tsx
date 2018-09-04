import * as React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {transparentNav, globalStyle} from './styles/common';
import {
    StyleSheet, 
    Text, 
    Dimensions,
    TouchableOpacity,
    StatusBar,
    View,
    Image,
    TextInput
} from 'react-native';
import App from '../App';
import {connect} from 'react-redux';
import {editKeyAtr, submitProfile} from '../redux/actions/profileAction';


interface MbtiProfileProps {
    navigator: Navigator;
    profilePic: string,
    name: string,
    date: string,
    gender: string,
    orientation: string,
    location: string,
    mbti: string,
    keyAtr: string, 
    keyDesc: string,
    energy: string,
    information: string,
    decision: string,
    lifestyle: string,
    onSubmitKey: ( 
      keyAtr: string, 
      keyDesc: string) => any,
      onSubmitProfile: (       
      name: string,
      date: string,
      gender: string,
      orientation: string,
      location: string,
      mbti: string,
      keyAtr: string, 
      keyDesc: string,
      profilePic: string,) => any;
}

interface MbtiProfileStates {
  keyAtr: string;
  keyDesc: string;
  IE: boolean,
  SN: boolean,
  FT: boolean,
  PJ: boolean,
}

class PureMbtiProfile extends React.Component<MbtiProfileProps, MbtiProfileStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      keyAtr: '',
      keyDesc: '',
      IE: false,
      SN: false,
      FT: false,
      PJ: false,
    }    
  }

  onSubmitPress() {
    console.log(this.state)
    this.props.onSubmitKey(this.state.keyAtr, this.state.keyDesc);  
    this.props.onSubmitProfile(this.props.name, this.props.date, this.props.gender, this.props.orientation, this.props.location, this.props.mbti , this.state.keyAtr, this.state.keyDesc, this.props.profilePic);  
  }

  onSelectEnergy() {
    this.setState({
      keyAtr: this.props.energy, 
      IE: true,
      SN: false,
      FT: false,
      PJ: false,
    })
  }

  onSelectInformation() {
    this.setState({
      keyAtr: this.props.information,
      IE: false, 
      SN: true,
      FT: false,
      PJ: false,
    })
  }

  onSelectDecision() {
    this.setState({
      keyAtr: this.props.decision, 
      IE: false, 
      SN: false,
      FT: true,
      PJ: false,
    })
  }

  onSelectLifestyle() {
    this.setState({
      keyAtr: this.props.lifestyle, 
      IE: false,
      SN: false,
      FT: false,
      PJ: true
    })
  }

  render() {
    let energyStyle = this.state.IE ? styles.selectedKeySquare : styles.keySquare;
    let infoStyle = this.state.SN ? styles.selectedKeySquare : styles.keySquare;
    let decisionStyle = this.state.FT ? styles.selectedKeySquare : styles.keySquare;
    let lifeStyle = this.state.PJ ? styles.selectedKeySquare : styles.keySquare;

    return (
        <LinearGradient colors={['#9EF8E4', '#30519B']} style={[{flex: 1}]}>
        <View style={globalStyle.container}>

            <View style={globalStyle.cardContainer}>
                <Text style={styles.title}>
                    Please choose one attribute that you want to emphasize about yourself
                </Text>

                <View style={styles.attribute}>

                  <TouchableOpacity style={energyStyle} onPress={() => this.onSelectEnergy()}>
                    <Text>{this.props.energy}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={infoStyle} onPress={() => this.onSelectInformation()} >
                        <Text>{this.props.information}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={decisionStyle} onPress={() => this.onSelectDecision()} >
                        <Text>{this.props.decision}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={lifeStyle} onPress={() => this.onSelectLifestyle()}>
                        <Text>{this.props.lifestyle}</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.title}>
                    What is your ideal first date?
                </Text>
                <TextInput style={styles.input}
                    onChangeText={ (val) => this.setState({keyDesc: val}) } 
                    multiline = {true}
                    maxLength = {200}
                    value={this.props.keyDesc} 
                />

            
                <TouchableOpacity style={styles.btnContainer}
                  onPress={() => this.onSubmitPress() }> 
                  <Text style={styles.btnText}>DONE</Text>
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
    display_name: state.profile.name,
    dob: state.profile.date,
    gender: state.profile.gender,
    orientation: state.profile.orientation,
    location: state.profile.location,
    mbti: state.profile.mbti,
    key_atr: state.profile.key_atr,
    key_atr_desc: state.profile.key_atr_desc,
    energy: state.profile.energy,
    information: state.profile.information,
    decision: state.profile.decision,
    lifestyle: state.profile.lifestyle,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onSubmitKey: (     
      keyAtr: string, 
      keyDesc: string) => {
      dispatch(editKeyAtr(keyAtr, keyDesc))
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
      profilePic: string) => {
      dispatch(submitProfile(name, date, gender, orientation, location, mbti, keyAtr, keyDesc, profilePic))
    }
  }
}

const MbtiProfile = connect(mapStateToProps, mapDispatchToProps)(PureMbtiProfile);
export default MbtiProfile;



const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: '#30519B',
    marginBottom: 10,
  },
  question: {
    fontSize: 16,
    color: '#30519B',
  },
  answer: {
    fontSize: 16,
    color: '#30519B',
  },
  img: {
    height: 200,
    width: 200,
  },
  btnContainer: {
    backgroundColor: '#ffa18e',
    borderColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginVertical: 15,
    width: '60%',
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
  },
  attribute:{
    flexDirection: 'row',
    marginBottom: 15,
  },
  input: {
    borderColor: '#30519B',
    borderWidth: 1,
    height: height * 0.3,
    width: width * 0.65,
    fontSize: 16,
    color: '#30519B',
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
  }
});
