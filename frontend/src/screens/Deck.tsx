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
  connectedSuggestions: any
  connectedUsers: any
}

export default class Deck extends React.Component<{}, DeckStates> {
  constructor(props:any ) {
    super(props);
    this.state = {
      connectedSuggestions: [],
      connectedUsers: []
    };
  }

  async componentWillMount() {
    let token = await AsyncStorage.getItem('token')
    axios.get(`${Config.API_SERVER}/api/connection/deck/suggested`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then((res)=> {
        console.log(res);
        this.setState({
          connectedSuggestions: res.data
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
            {this.state.connectedSuggestions.map(({ id, display_name, dob, gender, location, key_atr, key_atr_desc, mbti }) =>
            <View style={styles.card}>
                <Image style={styles.avatar} source={{ uri: 'https://via.placeholder.com/200x200' }} />
                <Text style={styles.text}>
                    {display_name}
                </Text>
                <Text style={styles.text}>
                    {dob}
                </Text>
                <Text style={styles.text}>
                    {gender}
                </Text>
                <Text style={styles.text}>
                    {location}
                </Text>
                <Text style={styles.text}>
                    {key_atr}
                </Text>
                <Text style={styles.text}>
                    {key_atr_desc}
                </Text>
                <Text style={styles.text}>
                    {mbti}
                </Text>
            </View>
        )}
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
