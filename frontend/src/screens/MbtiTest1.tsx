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
  Image
} from "react-native";
import { connect } from "react-redux";
import { one } from "../redux/actions/testAction";

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
      navigatorStyle: transparentNav
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
        <View style={globalStyle.container}>
          <View style={globalStyle.cardContainer}>
            <Text style={styles.header}>Quiz 1</Text>
            <Text style={styles.question}>
              How do you spend your weekends when you are single?
            </Text>

            <TouchableOpacity onPress={() => this.onChoiceA()}>
              <Text style={styleA}>A Join different parties</Text>
              <View style={styles.pickCard}>
                <Image style={styles.img} source={require(imageA)} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.onChoiceB()}>
              <Text style={styleB}>B Read a book, play video games</Text>
              <View style={styles.pickCard}>
                <Image style={styles.img} source={require(imageB)} />
              </View>
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
  header: {
    color: "#30519B",
    fontSize: 20,
    fontWeight: "800"
  },
  question: {
    color: "#30519B",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "left",
    padding: 12
  },
  img: {
    width: width * 0.55, // percent or minus
    height: height * 0.2,
    margin: 2
  },
  pickCard: {
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    width: width * 0.6,
    height: height * 0.25,
    margin: 10
  }
});
