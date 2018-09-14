import * as React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {transparentNav, globalStyle} from './styles/common';
import {
    StyleSheet, 
    Text, 
    TextInput,
    TouchableOpacity,
    StatusBar,
    View,
    KeyboardAvoidingView,
    Alert
} from 'react-native';

import {connect} from 'react-redux';
import {signupUser} from '../redux/actions/profileAction';

interface SignupProps {
    navigator: Navigator;
    onSignUp: (email: string, password: string) => any;

}

interface SignupStates {
  errorMsg: boolean,
  email: string,
  password: string,
}

class PureSignup extends React.Component<SignupProps, SignupStates> {
  constructor(props: SignupProps) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.state = {
      errorMsg: false,
      email: '',
      password: '',
    };
  }

  onNavigatorEvent(event: any) { // this is the onPress handler for the two buttons together
    if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
      if (event.id == 'cancel') { // this is the same id field from the static navigatorButtons definition
        Alert.alert(
          'Confirm to cancel signup?',
          'All input data will be lost.',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
            },
            {
              text: 'Confirm',
              onPress: () => this.props.navigator.popToRoot({
                animated: true, // does the popToRoot have transition animation or does it happen immediately (optional)
                animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the popToRoot have different transition animation (optional)
              })              
            },
          ]
        );
      }
    }
  }

  validateEmail(email: string) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(String(email))
  }

  onSignupPress() {
    if(this.state.email.trim() == '' || this.state.password.trim() == '' || this.validateEmail(this.state.email)) {
      this.setState({
        errorMsg: true
      })
      } else {
        this.props.onSignUp(this.state.email, this.state.password);  
        
        this.props.navigator.push({
          screen: 'SignupContScreen',
          title: 'Profile',
          navigatorStyle: transparentNav,
          backButtonHidden: true,
        })
      }
  }

  render() {
    return (
      <LinearGradient colors={['#9EF8E4', '#30519B']} style={[{flex: 1}]}>
      <KeyboardAvoidingView behavior='padding' style={styles.container}>

          <Text style={styles.welcome}>
           Create Account
          </Text>

          <TextInput placeholder='Email' 
            onChangeText={ (val) => this.setState({email: val}) } 
            placeholderTextColor='#fff'
            returnKeyType='next'
            keyboardType='email-address'
            autoCapitalize='none'
            style={styles.input}
          />
          <TextInput placeholder='Password' secureTextEntry
            onChangeText={ (val) => this.setState({password: val})
           }  
            placeholderTextColor='#fff'
            returnKeyType='next'
            style={styles.input}
          />            

          {this.state.errorMsg ? (
            <Text style={styles.error}>Please provide valid email and password</Text>
          ) : <Text></Text>}

            <TouchableOpacity style={styles.btnContainer} 
              onPress={() => this.onSignupPress()
               }>
              <Text style={styles.btnText}>Continue</Text>
            </TouchableOpacity>

            <TouchableOpacity 
            
              onPress={() => this.props.navigator.pop({
                  animated: true, // does the pop have transition animation or does it happen immediately (optional)
                  animationType: 'slide-horizontal', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
                })
              }>
              <Text style={styles.btnText}>Got an account? Login here</Text>
            </TouchableOpacity>    

      </KeyboardAvoidingView>
      </LinearGradient>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    email: state.profile.email,
    password: state.profile.password,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onSignUp: (email: string, password: string) => dispatch(signupUser(email, password)),
  }
}

const Signup = connect(mapStateToProps, mapDispatchToProps)(PureSignup);
export default Signup;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  welcome: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 60,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    color: '#fff',
    marginBottom: 30,
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: '85%'
  },
  btnContainer: {
    backgroundColor: '#F0957F',
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginVertical: 15,
    width: '40%',
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 1.5
  },
  error: {
    color: 'red'
  }
});
