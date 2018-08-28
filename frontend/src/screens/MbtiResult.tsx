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

interface MbtiResultProps {
    navigator: Navigator
}

export default class MbtiResult extends React.Component<MbtiResultProps> {
  constructor(props: any) {
    super(props);
  }

  render() {
    let imageUri = 'https://i.pinimg.com/564x/d8/4b/77/d84b77fd22fe250776ea3af0af227fcd.jpg';

    return (
        <LinearGradient colors={['#9EF8E4', '#30519B']} style={[{flex: 1}]}>
        <View style={globalStyle.container}>

            <View style={globalStyle.cardContainer}>
                <Text style={styles.title}>
                  Welcome onboard!{`\n`}
                  You are ENTREPRENEUR - ESTP
                </Text>

                <Image style={styles.img} source={ {uri: imageUri} } />

                <TouchableOpacity style={styles.btnContainer}
                  onPress={() => this.props.navigator.showLightBox({
                      screen: 'Info', // NOPE ******
                  })}>
                  <Text style={styles.btnText}>READ MORE</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnContainer}
                  onPress={() => this.props.navigator.push({
                      screen: 'MbtiProfileScreen',
                      navigatorStyle: transparentNav,
                  })}>
                  <Text style={styles.btnText}>BUILD YOUR PROFILE</Text>
                </TouchableOpacity>
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
});
