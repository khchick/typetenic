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

interface SignupProps {
    navigator: Navigator
}

interface SignupStates {
  email: string,
  password: string,
}

export default class Signup extends React.Component<SignupProps, SignupStates> {
  constructor(props: SignupProps) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
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
            onChangeText={ (val) => this.setState({password: val}) }  
            placeholderTextColor='#fff'
            returnKeyType='next'
            style={styles.input}
          />
            
            <TouchableOpacity style={styles.btnContainer} 
              onPress={() => this.props.navigator.push({
                screen: 'SignupContScreen',
                navigatorStyle: {
                  navBarTransparent: true, 
                  tabBarHidden: true },
            })}>
              <Text style={styles.btnText}>Continue</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => this.props.navigator.showModal({
                screen: 'LoginScreen',
                navigatorStyle: transparentNav,
            })}>
              <Text style={styles.btnText}>Got an account? Login here</Text>
            </TouchableOpacity>    

      </KeyboardAvoidingView>
      </LinearGradient>
    );
  }
}


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
    borderColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginVertical: 15,
    width: '40%',
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
  },
});
