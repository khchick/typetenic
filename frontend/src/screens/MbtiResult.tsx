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
    Image
} from 'react-native';
import {connect} from 'react-redux';
import {createMbti} from '../redux/actions/profileAction';

interface MbtiResultProps {
    navigator: Navigator;
    test1: string;
    test2: string;
    test3: string;
    test4: string
}

interface MbtiState {
  energy: string
  information: string
  decision: string
  lifestyle: string
  mbti: string
}

let A = 'A'; let B = 'B';

class PureMbtiResult extends React.Component<MbtiResultProps, MbtiState> {
  constructor(props: any) {
    super(props);
    this.state = {
      energy: '',
      information: '',
      decision: '',
      lifestyle: '',
      mbti: ''
    }
  }
  
  // MBTI logic **** WORKING ******
  // if put in contructor --> Warning: Can't call setState on a component that is not yet mounted
  // but these are not working:   componentWillMount / componentDidMount

  componentDidMount() {this.decideMbti()}

  decideMbti() {
    this.setState({energy: 'E'}), () => {
      console.log('setting state !!!! ' + this.state.energy)
    }


    if (this.props.test1 == A) {
      console.log('setting energy')
      this.setState({energy: 'E'}), () => {
        console.log('inside ' + this.state.energy)
      }

    } else if(this.props.test1 == B) {
      this.setState({energy: 'I'})
    }

    if (this.props.test2 == A) {
      console.log('setting info')
      this.setState({information: 'S'})
    } else if(this.props.test2 == B) {
      this.setState({information: 'N'})
    }

    if (this.props.test3 == A) {
      console.log('setting decision')
      this.setState({decision: 'T'})
    } else if(this.props.test3 == B) {
      this.setState({decision: 'F'})
    }

    if (this.props.test4 == A) {
      console.log('setting life')
      this.setState({lifestyle: 'J'})
    } else if(this.props.test4 == B) {
      this.setState({lifestyle: 'P'})
    }
    this.setState({mbti : this.state.energy + this.state.information + this.state.decision + this.state.lifestyle})
    
    console.log(this.props.test1, this.props.test2, this.props.test3, this.props.test4 )
    console.log(this.state)

  }

  render() {
    let imageUri = 'https://i.pinimg.com/564x/d8/4b/77/d84b77fd22fe250776ea3af0af227fcd.jpg'; 
  
    return (
        <LinearGradient colors={['#9EF8E4', '#30519B']} style={[{flex: 1}]}>
        <View style={globalStyle.container}>

            <View style={globalStyle.cardContainer}>
                <Text style={styles.title}>
                  Welcome onboard!{`\n`}
                  You are - {this.state.mbti}
                </Text>

                <Image style={styles.img} source={ {uri: imageUri} } />

                <TouchableOpacity style={styles.btnContainer}
                  onPress={() => this.props.navigator.showLightBox({
                      screen: 'Info', // NOPE ******
                  })}>
                  <Text style={styles.btnText}>READ MORE</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnContainer}
                  onPress={() => this.props.navigator.push({
                      screen: 'MbtiProfileScreen',
                      navigatorStyle: transparentNav,
                  })}>
                  <Text style={styles.btnText}>BUILD YOUR PROFILE</Text>
                </TouchableOpacity>
            </View>

        </View>
        </LinearGradient>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    test1: state.test.test1,
    test2: state.test.test2,
    test3: state.test.test3,
    test4: state.test.test4,
    mbti: state.profile.mbti
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onSubmit: (mbti: string) => dispatch(createMbti(mbti)),
  }
}

const MbtiResult = connect(mapStateToProps, mapDispatchToProps)(PureMbtiResult);
export default MbtiResult;




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
});
