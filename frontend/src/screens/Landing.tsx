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
import FBLoginButton from './components/FBLoginButton';


const {height, width} = Dimensions.get('window');

interface LandingProps {
    navigator: Navigator,
}

export default class Landing extends React.Component<LandingProps> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
        <LinearGradient colors={['#9EF8E4', '#004988']} style={[{flex: 1}]}>
        <View style={globalStyle.container}>

            <View style={styles.card}>
                <Text>Tutorial</Text>
            </View>
            
            <FBLoginButton />

            <TouchableOpacity style={styles.btnContainer}
             onPress={() => this.props.navigator.push({
                screen: 'LoginScreen',
                navigatorStyle: transparentNav,
            })}>
              <Text style={styles.btnText}>LOGIN WITH EMAIL</Text>
            </TouchableOpacity>

          <Text style={styles.extraText}>
            We do not post anything on facebook. 
            By signing in, you agree with our Terms of Service and Privacy Policy
          </Text>
  
        </View>
        </LinearGradient>
    )  
  }
}


const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: '#ffa18e',
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginVertical: 20,
    width: '50%',
    height: 45,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    letterSpacing: 1.5,
  },
  extraText: {
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 10,
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 30,

    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    width: width * 0.8, // percent or minus
    height: height * 0.6,
    margin: 20,
  },
})
