import * as React from "react";
import LinearGradient from "react-native-linear-gradient";
import {
  transparentNav,
  globalStyle,
  answer,
  chosenAnswer
} from "./styles/common";
import {
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  View,
  Image,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import { one } from "../redux/actions/testAction";
import { RootState } from "../redux/reducers/rootReducer";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { height, width } = Dimensions.get("window");

interface MbtiTestProps {
  navigator: Navigator;
  onChoose: (choice: string) => any;
  test1: string;
}

class PureMbtiTest1 extends React.Component<MbtiTestProps> {

  pushNextTest() {
    this.props.navigator.push({
      screen: "MbtiTest2Screen",
      navigatorStyle: { navBarNoBorder: true }
    });
  }

  onChoiceA() {
    this.props.onChoose("A");
    this.pushNextTest();
  }

  onChoiceB() {
    this.props.onChoose("B");
    this.pushNextTest();
  }

  render() {
    let imageA = "../assets/mbti/party-with-friends.jpg";
    let imageB = "../assets/mbti/reading.jpg";

    let styleA = this.props.test1 == "A" ? chosenAnswer : answer;
    let styleB = this.props.test1 == "B" ? chosenAnswer : answer;

    return (
      <LinearGradient colors={["#9EF8E4", "#30519B"]} style={[{ flex: 1 }]}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.card}>
              <View style={styles.textContainer}>
                <Text style={styles.header}>Quiz 1</Text>
                <Text style={styles.question}>
                  How do you spend your weekends when you are single?
               </Text>
              </View>

              <TouchableOpacity onPress={() => this.onChoiceA()}>
                <View style={styles.textContainer}>
                  <Text style={styles.option}>A  Join different parties</Text>
                </View>
                <View style={styles.imgContainer}>
                  <Image style={styles.img} source={require(imageA)} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.onChoiceB()}>
                <View style={styles.textContainer}>
                  <Text style={styles.option}>B  Read a book, play video games</Text>
                </View>
                <View style={styles.imgContainer}>
                  <Image style={styles.img} source={require(imageB)} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    test1: state.test.test1
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onChoose: (choice: string) => dispatch(one(choice))
  };
};

const MbtiTest1 = connect(
  mapStateToProps,
  mapDispatchToProps
)(PureMbtiTest1);
export default MbtiTest1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: hp('3%'),
    marginBottom: hp('3%'),
    marginHorizontal: wp('10%'),
    paddingVertical: hp('3%'),
    paddingHorizontal: wp('3%'),
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 2, height: -3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    width: wp('85%'),
  },
  textContainer: {
    justifyContent: 'center',
    // alignItems: 'center',
    width: wp('70%')
  },
  header: {
    color: "#30519B",
    fontSize: 20,
    fontFamily: 'NovaRound',
    marginVertical: hp('3%'),
    letterSpacing: 1.5,
    textAlign: 'center'
  },
  question: {
    color: "#30519B",
    fontSize: 18,
    textAlign: "center",
    marginBottom: hp('6%'),
    fontFamily: 'NovaRound',
  },
  option: {
    color: "#30519B",
    fontSize: 15,
    fontFamily: 'NovaRound',
    marginVertical: wp('2%'),
    textAlign: 'left'
  },
  img: {
    resizeMode: 'contain',
    width: wp('70%'),
    height: hp('25%'),
  },
  imgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('3%'),
    marginBottom: hp('7%'),
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    borderRadius: 4
  }
});
