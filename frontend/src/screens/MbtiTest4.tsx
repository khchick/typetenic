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
import {four} from '../redux/actions/testAction'


interface MbtiTestProps {
    navigator: Navigator
    onChoose: (choice: string) => any;
    test4: string
}

class PureMbtiTest4 extends React.Component<MbtiTestProps> {

  pushNextTest() {
    this.props.navigator.push({
      screen: 'MbtiResultScreen',
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
    let imageA = '../assets/mbti/dinner-date.jpg';
    let imageB = '../assets/mbti/bike.jpg';

    let styleA = this.props.test4 == 'A'? chosenAnswer : answer;
    let styleB = this.props.test4 == 'B'? chosenAnswer : answer;

    return (
        <LinearGradient colors={['#9EF8E4', '#30519B']} style={[{flex: 1}]}>
        <View style={globalStyle.container}>

            <View style={globalStyle.cardContainer}>
                <Text style={globalStyle.title}>Question</Text>
                <Text style={globalStyle.question}>Which of the following picture is closer to your perfect date?</Text>

              <TouchableOpacity onPress={() => this.onChoiceA() }>
                <Text style={styleA}>A  A planned date</Text>
                <Image style={globalStyle.img} source={ require(imageA) } />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.onChoiceB() }>
                <Text style={styleB}>B  Freestyle, casual date</Text>
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
    test4: state.test.test4
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onChoose: (choice: string) => dispatch(four(choice)),
  }
}

const MbtiTest4 = connect(mapStateToProps, mapDispatchToProps)(PureMbtiTest4);
export default MbtiTest4;
