import * as React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {transparentNav, globalStyle, answer, chosenAnswer} from './styles/common';
import {
    StyleSheet, 
    Text, 
    Dimensions,
    TouchableOpacity,
    StatusBar,
    View,
    Image
} from 'react-native';
import {connect} from 'react-redux';
import {three} from '../redux/actions/testAction'

interface MbtiTestProps {
    navigator: Navigator
    onChoose: (choice: string) => any;
    test3: string
}

class PureMbtiTest3 extends React.Component<MbtiTestProps> {

  pushNextTest() {
    this.props.navigator.push({
      screen: 'MbtiTest4Screen',
      navigatorStyle: transparentNav,
    })
  }

  onChoiceA() {
    this.props.onChoose('A')
    this.pushNextTest();
  }

  onChoiceB() {
    this.props.onChoose('B')
    this.pushNextTest();
  }

  render() {
    let imageA = '../assets/mbti/argue.jpg';
    let imageB = '../assets/mbti/hug.jpg';
  
    let styleA = this.props.test3 == 'A'? chosenAnswer : answer;
    let styleB = this.props.test3 == 'B'? chosenAnswer : answer;

    return (
        <LinearGradient colors={['#9EF8E4', '#30519B']} style={[{flex: 1}]}>
        <View style={globalStyle.container}>

            <View style={globalStyle.cardContainer}>
                <Text style={globalStyle.title}>Question</Text>
                <Text style={globalStyle.question}>Imagine you are now having a fight with your lover, what will you do ?</Text>

              <TouchableOpacity onPress={() => this.onChoiceA() }>
                <Text style={styleA}>A  Try to convince her/ him with logical arguments</Text>
                <Image style={globalStyle.img} source={ require(imageA) } />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.onChoiceB() }>
                <Text style={styleB}>B  Give her/ him a hug no matter who is the wrong one</Text>
                <Image style={globalStyle.img} source={ require(imageB) } />
              </TouchableOpacity>
            </View>

        </View>
        </LinearGradient>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    test3: state.test.test3
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onChoose: (choice: string) => dispatch(three(choice)),
  }
}

const MbtiTest3 = connect(mapStateToProps, mapDispatchToProps)(PureMbtiTest3);
export default MbtiTest3;
