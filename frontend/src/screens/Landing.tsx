import * as React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
    StyleSheet, 
    Text, 
    Dimensions,
    TouchableOpacity,
    StatusBar,
    View,
    Image
} from 'react-native';

const {height, width} = Dimensions.get('window');

interface LandingProps {
    navigator: Navigator
}

export default class Landing extends React.Component<LandingProps> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
        <LinearGradient colors={['#9EF8E4', '#30519B']} style={[{flex: 1}]}>
        <View style={styles.container}>

            <View style={styles.card}>
                <Text>Tutorial</Text>
            </View>

            <TouchableOpacity style={styles.btnContainer}
              // onPress={() => 
                // this.props.loginFacebook()}
            >
              <Text style={styles.btnText}>LOGIN WITH FACEBOOK</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnContainer}
             onPress={() => this.props.navigator.showModal({
                screen: 'LoginScreen',
                navigatorStyle: {
                  navBarHidden: true, 
                  tabBarHidden: true },
            })}>
              <Text style={styles.btnText}>LOGIN WITH EMAIL</Text>
            </TouchableOpacity>

          <Text style={styles.btnText}>
            We do not post anything on facebook. 
            By signing in, you agree with our Terms of Service and Privacy Policy
          </Text>
  
        </View>
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
});
