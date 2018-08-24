import * as React from 'react';
import { Navigation } from 'react-native-navigation';
import {
    StyleSheet, 
    Text, 
    TextInput,
    TouchableOpacity,
    StatusBar,
    View,
    KeyboardAvoidingView
} from 'react-native';


interface LoginProps {
    navigator: Navigator,
}

interface LoginStates {
  email: string,
  password: string,
}

export default class Login extends React.Component<LoginProps, LoginStates> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }
  
  startApp() {
    Navigation.startTabBasedApp({
    tabs: [    
    {
        // label: 'My Deck',
        screen: 'HomeTabScreen',
        icon: require('../assets/home.png'),
        title: 'My Deck'
    },
    {
        // label: 'Match',
        screen: 'ReqestTabScreen', // new
        icon: require('../assets/deck.png'),
        title: 'Match'
    },
    {
        // label: 'Request',
        screen: 'ReqestTabScreen',
        icon: require('../assets/heart.png'),
        title: 'Request'
    },
    {
        // label: 'Chat',
        screen: 'ChatTabScreen',
        icon: require('../assets/chat.png'),
        title: 'Chat'
    },
    {
        // label: 'Profile',
        screen: 'UserTabScreen',
        icon: require('../assets/user.png'),
        title: 'Profile'
    }
    ],
    tabsStyle: { 
    // tabBarButtonColor: '#ffff00', // optional, change the color of the tab icons and text (also unselected). On Android, add this to appStyle
    tabBarSelectedButtonColor: '#F0957F', // optional, change the color of the selected tab icon and text (only selected). On Android, add this to appStyle
    // tabBarBackgroundColor: '#551A8B', // optional, change the background color of the tab bar
    },
});
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
          <Text style={styles.welcome}>
            Welcome Back{`\n`}
            to the Deck
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
              onPress={() => this.startApp()
            }>
              <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnContainer}
              onPress={() => this.props.navigator.showModal({
                screen: 'SignupScreen',
                navigatorStyle: {
                  navBarHidden: true, 
                  tabBarHidden: true },
                // title: 'Sign Up'
            })}>
              <Text style={styles.btnText}>Sign Up</Text>
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
    backgroundColor: '#4fa5c6',
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
