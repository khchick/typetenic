// ADD NEXT BUTTON ON TOP RIGHT

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

interface MbtiTestProps {
    navigator: Navigator
}

export default class MbtiTest extends React.Component<MbtiTestProps> {
  constructor(props: any) {
    super(props);
  }

  render() {
    let imageUri = 'https://i.pinimg.com/564x/d8/4b/77/d84b77fd22fe250776ea3af0af227fcd.jpg';

    return (
        <LinearGradient colors={['#9EF8E4', '#30519B']} style={[{flex: 1}]}>
        <View style={globalStyle.container}>

            <View style={globalStyle.cardContainer}>
                <Text style={styles.title}>Question</Text>
                <Text style={styles.question}>How do you spend your weekends when you are single? </Text>

                <Text style={styles.answer}>A Join different parties/ coffee meet with friends</Text>
                <Image style={styles.img} source={ {uri: imageUri} } />

                <Text style={styles.answer}>B Read a book, play video games at home</Text>
                <Image style={styles.img} source={ {uri: imageUri} } />
            </View>

        </View>
        </LinearGradient>
    );
  }
}


const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: '#30519B',
    marginBottom: 10,
  },
  question: {
    fontSize: 16,
    color: '#30519B',
  },
  answer: {
    fontSize: 16,
    color: '#30519B',
  },
  img: {
    height: 200,
    width: 200,
  },
});
