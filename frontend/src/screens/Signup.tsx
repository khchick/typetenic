import * as React from 'react';
import {
    StyleSheet, 
    Text, 
    TextInput,
    DatePickerIOS,
    Picker,
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
  name: string,
  email: string,
  password: string,
  chosenDate: Date,
  gender: string,
  orientation: string,
  location: string,
}

export default class Signup extends React.Component<SignupProps, SignupStates> {
  constructor(props: SignupProps) {
    super(props);
    this.state = {
      name: '', 
      email: '',
      password: '',
      chosenDate: new Date(),
      gender: '',
      orientation: '',
      location: '',
    };

    // this.setDate = this.setDate.bind(this);
  }

  setDate(newDate: Date) {
    this.setState({chosenDate: newDate})
  }

  // sign up flow WIP 
  onSignupPress() {
    // console.log(this.state)
    Alert.alert(
      'Sign Up Successful', // Alert Title
      'Start typetenic', // Alert Msg
      // [
      //   {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
      //   {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      //   {text: 'OK', onPress: () => console.log('OK Pressed')},
      // ],
      // { cancelable: false }
    )
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
          <Text style={styles.welcome}>
           Sign Up
          </Text>

          <TextInput placeholder='Display Name'
            onChangeText={ (val) => this.setState({name: val}) } 
            placeholderTextColor='#fff'
            returnKeyType='next'
            keyboardType='email-address'
            style={styles.input}
          />
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

            {/* <Text>Date of Birth</Text>
            <DatePickerIOS
              mode='date'
              date={this.state.chosenDate}
              onDateChange={(newDate) => this.setDate(newDate)}
              // style={[{ height: 100 }]}
            />
            <Text style={styles.btnText}>{this.state.chosenDate}}</Text> */}

            {/* <Text>Gender</Text>
            <Picker
              // style={{ height: 50, width: 100 }}
              onValueChange={(itemValue, itemIndex) => this.setState({gender: itemValue})}>
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
            </Picker> */}


            <TouchableOpacity style={styles.btnContainer} 
              onPress={() => this.onSignupPress()
              }>
              <Text style={styles.btnText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnContainer}
              onPress={() => this.props.navigator.showModal({
                screen: 'LoginScreen',
                navigatorStyle: {
                  navBarHidden: true, 
                  tabBarHidden: true },
            })}>
              <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>    

      </KeyboardAvoidingView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff927c',
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
    // backgroundColor: 'rgba(255,255,255,0.3)',
    borderWidth: 0.5,
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
