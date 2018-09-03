import * as React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
    StyleSheet, 
    Text, 
    View,
    ScrollView,
    Image,
    Dimensions
} from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';
import { AsyncStorage } from 'react-native';

const {height, width} = Dimensions.get('window');

interface DeckStates {
  email: string;
  password: string;
}

export default class Deck extends React.Component<{}, DeckStates> {
  constructor(props:any ) {
    super(props);
    this.state = {
      email: 'Testing email',
      password: 'some password',
    };
  }

  async componentWillMount() {
    
    let token = await AsyncStorage.getItem('token')
    console.log(token)
    axios.get(`${Config.API_SERVER}/api/user/myprofile`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then((res)=> {
        console.log(res)
        this.setState({
          email: res.data[0].email,
          password: res.data[0].password          
        })
      })
      .catch(err => console.log(err))
      
  }

  render() {
    return (
      <LinearGradient colors={['#9EF8E4', '#30519B']} style={[{flex: 1}]}>
      <View style={styles.container}>

        <ScrollView 
          horizontal={true}
          snapToInterval={width - 40} // card width offset margin
          snapToAlignment={'center'}
          decelerationRate={0} // stop scrolling momentum
          >
            {/* dummy cards */}
            <View style={styles.card}>
                <Image style={styles.avatar} source={ {uri: 'https://i.scdn.co/image/3d7ad07f25e3d56c09eefc01a330e346bcd4f793'} } />
                <Text style={styles.text}>
                  {this.state.email} 
                  {this.state.password}
                </Text>
            </View>

            <View style={styles.card}>
                <Image style={styles.avatar} source={ {uri: 'https://i.scdn.co/image/3d7ad07f25e3d56c09eefc01a330e346bcd4f793'} } />
                <Text style={styles.text}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                </Text>
            </View>

            <View style={styles.card}>
                <Image style={styles.avatar} source={ {uri: 'https://i.scdn.co/image/3d7ad07f25e3d56c09eefc01a330e346bcd4f793'} } />
                <Text style={styles.text}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                </Text>
            </View>

            <View style={styles.card}>
                <Image style={styles.avatar} source={ {uri: 'https://i.scdn.co/image/3d7ad07f25e3d56c09eefc01a330e346bcd4f793'} } />
                <Text style={styles.text}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                </Text>
            </View>
        </ScrollView>

      </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF4ED',
    padding: 30,

    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    width: width * 0.8, // percent or minus
    height: height * 0.7,
    margin: 20,
  },
  avatar: {
    width: 300,
    height: 300
  },
  text: {
    fontSize: 20,
    color: '#333333',
    paddingTop: 20,
  },
  
});
