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
import {two} from '../redux/actions/testAction'


interface MbtiTestProps {
    navigator: Navigator
    onChoose: (choice: string) => any;
    test2: string
}

class PureMbtiTest2 extends React.Component<MbtiTestProps> {

  pushNextTest() {
    this.props.navigator.push({
      screen: 'MbtiTest3Screen',
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
    let imageA = '../assets/mbti/researching.jpeg';
    let imageB = '../assets/mbti/skydiving.jpg';
  
    let styleA = this.props.test2 == 'A'? chosenAnswer : answer;
    let styleB = this.props.test2 == 'B'? chosenAnswer : answer;

    return (
        <LinearGradient colors={['#9EF8E4', '#30519B']} style={[{flex: 1}]}>
        <View style={globalStyle.container}>

            <View style={globalStyle.cardContainer}>
                <Text style={globalStyle.title}>Question</Text>
                <Text style={globalStyle.question}>If your lover ask you to join a new activity you haven’t tried before, you will...</Text>

              <TouchableOpacity onPress={() => this.onChoiceA() }>
                <Text style={styleA}>
                  A  Collect as many information about the activity as you can before you go for it
                </Text>
                <Image style={globalStyle.img} source={ require(imageA) } />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.onChoiceB() }>
                <Text style={styleB}>
                  B  Just go and see what will happen. That’s why life is fun!
                </Text>
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
    test2: state.test.test2
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onChoose: (choice: string) => dispatch(two(choice)),
  }
}

const MbtiTest2 = connect(mapStateToProps, mapDispatchToProps)(PureMbtiTest2);
export default MbtiTest2;
