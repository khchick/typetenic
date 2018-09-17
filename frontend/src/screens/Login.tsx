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
    ActivityIndicator
} from 'react-native';
import {connect} from 'react-redux';
import {loginUser} from '../redux/actions/authAction';
import { RootState } from '../redux/reducers/rootReducer';


interface LoginProps {
    navigator: Navigator,
    onLoginPress: (email: string, password: string) => any
}

interface LoginStates {
  errorMsg: boolean,
  email: string,
  password: string,
  // isLoading: boolean
}

class PureLogin extends React.Component<LoginProps, LoginStates> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      errorMsg: false,
      email: '',
      password: '',
      // isLoading: false,
    };
  }

  validateEmail(email: string) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(String(email))
  }
  
  onLoginPress() {
    if(this.state.email.trim() == '' || this.state.password.trim() == '' || this.validateEmail(this.state.email)) {
      this.setState({
        errorMsg: true
      })
      } else {
        this.props.onLoginPress(this.state.email, this.state.password)        
      }
  }

  render() {
    // const spinner = this.state.isLoading ?
    //   <ActivityIndicator size='large' /> : null;

    return (
     
      <LinearGradient colors={["#9EF8E4", "#30519B"]} style={[{ flex: 1 }]}>
      <KeyboardAvoidingView behavior='padding' style={globalStyle.container}>
      
          <Text style={styles.welcome}>
            Welcome{`\n`}On Board
          </Text>

            <TextInput placeholder='Email' 
              onChangeText={ (val) => this.setState({email: val}) } 
              placeholderTextColor='#fff'
              returnKeyType='next'
              keyboardType='email-address'
              autoCapitalize='none'
              style={styles.input}
            />
            <TextInput placeholder='Password'
              onChangeText={ (val) => this.setState({password: val}) }  
              secureTextEntry 
              placeholderTextColor='#fff'
              returnKeyType='go'
              // ref={}
              style={styles.input} 
            />

             {this.state.errorMsg ? (
              <Text style={styles.error}>Please provide valid email and password</Text>
            ) : <Text></Text>}
          
            <TouchableOpacity style={styles.btnContainer}
              onPress={() => 
                this.onLoginPress()
              }
                >
              <Text style={styles.btnText}>LOGIN</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnContainer}
              onPress={() => this.props.navigator.push({
                screen: 'SignupScreen',
                navigatorStyle: transparentNav,
                navigatorButtons: {
                  leftButtons: [{
                    title: 'Cancel',
                    id: 'cancel',
                  }]                  
                },
            })}>
              <Text style={styles.btnText}>SIGN UP</Text>
            </TouchableOpacity>           
      </KeyboardAvoidingView>
      </LinearGradient>
    );
  }
}

const MapStateToProps = (state: RootState) => {
  return { }
}

const mapDispatchToProps = (dispatch: any) => ({
  onLoginPress: (email: string, password: string) => dispatch(loginUser(email, password))
})


// MapStateToProps - pull data from the store when it changes, and pass those values as props to component.
// mapDispatchToProps - dispatch the store's action creators when called
const Login = connect(MapStateToProps, mapDispatchToProps)(PureLogin);
export default Login;


const styles = StyleSheet.create({
  welcome: {
    color: '#fff',
    fontSize: 32,
    // fontWeight: '800',
    marginBottom: 60,
    fontFamily: 'NovaRound'
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
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 15,
    width: '35%',
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
  error: {
    color: 'red'
  }
});
