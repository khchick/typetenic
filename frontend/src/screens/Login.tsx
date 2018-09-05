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


interface LoginProps {
    navigator: Navigator,
    onLoginPress: (email: string, password: string) => any
}

interface LoginStates {
  email: string,
  password: string,
  // isLoading: boolean
}

class PureLogin extends React.Component<LoginProps, LoginStates> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      email: '',
      password: '',
      // isLoading: false,
    };
  }

  render() {
    // const spinner = this.state.isLoading ?
    //   <ActivityIndicator size='large' /> : null;

    return (
     
      <LinearGradient colors={['#9EF8E4', '#004988']} style={[{flex: 1}]}>
      <KeyboardAvoidingView behavior='padding' style={globalStyle.container}>
      
          <Text style={styles.welcome}>
            WELCOME{`\n`}ON BOARD
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
            <TouchableOpacity style={styles.btnContainer}
              onPress={() => 
                this.props.onLoginPress(this.state.email, this.state.password)}
                >
              <Text style={styles.btnText}>LOGIN</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnContainer}
              onPress={() => this.props.navigator.push({
                screen: 'SignupScreen',
                navigatorStyle: transparentNav,
                // backButtonTitle: 'Cancel',
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

const MapStateToProps = (state: any) => {
  return {
    isLoggedIn: state.authReducer
  }
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
    fontWeight: '800',
    marginBottom: 50,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    color: '#fff',
    marginBottom: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 25,
    width: '85%'
  },
  btnContainer: {
    backgroundColor: '#ffa18e',
    paddingHorizontal: 15,
    paddingVertical: 15,
    // marginHorizontal: 0,
    marginVertical: 15,
    width: '40%',
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
  },
});
