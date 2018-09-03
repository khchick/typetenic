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
    keyDesc: string
    onSubmit: ( profilePic: string,
      name: string,
      date: string,
      gender: string,
      orientation: string,
      location: string,
      mbti: string,
      keyAtr: string, 
      keyDesc: string) => any;
}

interface MbtiProfileStates {
  keyAtr: string;
  keyDesc: string;
}

class PureMbtiProfile extends React.Component<MbtiProfileProps, MbtiProfileStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      keyAtr: '',
      keyDesc: ''
    }    
  }
  
  onSubmitPress() {
    console.log(this.state)
    this.props.onSubmit(this.props.profilePic, this.props.name, this.props.date, this.props.gender, this.props.orientation, this.props.location, this.props.mbti , this.state.keyAtr, this.state.keyDesc);  
  }

  render() {
    return (
        <LinearGradient colors={['#9EF8E4', '#30519B']} style={[{flex: 1}]}>
        <View style={globalStyle.container}>

            <View style={globalStyle.cardContainer}>
                <Text style={styles.title}>
                    Please choose one attribute that you want to emphasize about yourself
                </Text>

                <View style={styles.attribute}>
                    <View style={styles.attrSquare}>
                        <Text>E</Text>
                    </View>
                    <View style={styles.attrSquare}>
                        <Text>S</Text>
                    </View>
                    <View style={styles.attrSquare}>
                        <Text>T</Text>
                    </View>
                    <View style={styles.attrSquare}>
                        <Text>P</Text>
                    </View>
                </View>

                <Text style={styles.title}>
                    What is your ideal first date?
                </Text>
                <TextInput style={styles.input}
                    onChangeText={ (val) => this.setState({keyDesc: val}) } 
                    multiline = {true}
                    maxLength = {200}
                />

            {/* signup route here ??  */}
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
    key_atr_desc: state.profile.key_atr_desc
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onSubmit: ( 
      profilePic: string,
      name: string,
      date: string,
      gender: string,
      orientation: string,
      location: string,
      mbti: string,
      keyAtr: string, 
      keyDesc: string) => {
      dispatch(editKeyAtr(keyAtr, keyDesc))
      // .then(() => 
        dispatch(submitProfile(profilePic, name, date, gender, orientation, location, mbti, keyAtr, keyDesc))
      // )
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
  attrSquare: {
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
  input: {
    borderColor: '#30519B',
    borderWidth: 1,
    height: height * 0.3,
    width: width * 0.65,
    fontSize: 16,
    color: '#30519B',
  }
});
