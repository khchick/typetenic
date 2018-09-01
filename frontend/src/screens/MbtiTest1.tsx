import * as React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {transparentNav, globalStyle, answer, chosenAnswer } from './styles/common';
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
import {one} from '../redux/actions/testAction'


interface MbtiTestProps {
    navigator: Navigator;
    onChoose: (choice: string) => any;
    test1: string
}

class PureMbtiTest1 extends React.Component<MbtiTestProps> {

  pushNextTest() {
    this.props.navigator.push({
      screen: 'MbtiTest2Screen',
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
    let imageA = '../assets/mbti/party-with-friends.jpg';
    let imageB = '../assets/mbti/reading.jpg';
  
    let styleA = this.props.test1 == 'A'? chosenAnswer : answer;
    let styleB = this.props.test1 == 'B'? chosenAnswer : answer;

    return (
        <LinearGradient colors={['#9EF8E4', '#30519B']} style={[{flex: 1}]}>
        <View style={globalStyle.container}>

            <View style={globalStyle.cardContainer}>
                <Text style={globalStyle.title}>Question</Text>
                <Text style={globalStyle.question}>How do you spend your weekends when you are single?</Text>

              <TouchableOpacity onPress={() => this.onChoiceA() }>
                <Text style={styleA}>A  Join different parties/ coffee meet with friends</Text>
                <Image style={globalStyle.img} source={ require(imageA) } />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.onChoiceB() }>
                <Text style={styleB}>B  Read a book, play video games at home</Text>
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
    test1: state.test.test1
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onChoose: (choice: string) => dispatch(one(choice)),
  }
}

const MbtiTest1 = connect(mapStateToProps, mapDispatchToProps)(PureMbtiTest1);
export default MbtiTest1;
