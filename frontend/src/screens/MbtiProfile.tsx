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
    Image,
    TextInput
} from 'react-native';
import App from '../App';

interface MbtiProfileProps {
    navigator: Navigator
}

export default class MbtiProfile extends React.Component<MbtiProfileProps> {
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
                    Please choose one attribute that you want to emphasize about yourself
                </Text>

                <View style={styles.attribute}>
                    <View style={styles.attrSquare}>
                        <Text>E</Text>
                    </View>
                    <View style={styles.attrSquare}>
                        <Text>S</Text>
                    </View>
                    <View style={styles.attrSquare}>
                        <Text>T</Text>
                    </View>
                    <View style={styles.attrSquare}>
                        <Text>P</Text>
                    </View>
                </View>

                <Text style={styles.title}>
                    What is your ideal first date?
                </Text>
                <TextInput style={styles.input}
                    multiline = {true}
                    maxLength = {200}
                />

            {/* signup route here ??  */}
                <TouchableOpacity style={styles.btnContainer}
                  onPress={() => App.loginApp()}> 
                  <Text style={styles.btnText}>DONE</Text>
                </TouchableOpacity>
            </View>

        </View>
        </LinearGradient>
    );
  }
}

const {height, width} = Dimensions.get('window');

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
  attribute:{
    flexDirection: 'row',
    marginBottom: 15,
  },
  attrSquare: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#30519B',
    borderWidth: 1,
    height: 40,
    width: 40,
    margin: 5,
  },
  input: {
    borderColor: '#30519B',
    borderWidth: 1,
    height: height * 0.3,
    width: width * 0.65,
    fontSize: 16,
    color: '#30519B',
  }
});
