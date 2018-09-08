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
     
      <LinearGradient colors={['#9EF8E4', '#004988']} style={{flex: 1}}>
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
});
