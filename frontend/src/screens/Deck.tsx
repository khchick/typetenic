import * as React from 'react';
import {
    StyleSheet, 
    Text, 
    View,
    ScrollView,
    Image,
    Dimensions
} from 'react-native';

const {height, width} = Dimensions.get('window');

type Props = {};
export default class Deck extends React.Component<Props> {
  render() {
    return (
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

            <View style={styles.card}>
                <Image style={styles.avatar} source={ {uri: 'https://i.scdn.co/image/3d7ad07f25e3d56c09eefc01a330e346bcd4f793'} } />
                <Text style={styles.text}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                </Text>
            </View>
        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
