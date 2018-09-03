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
import { two } from "../redux/actions/testAction";

const { height, width } = Dimensions.get("window");

interface MbtiTestProps {
  navigator: Navigator;
  onChoose: (choice: string) => any;
  test2: string;
}

class PureMbtiTest2 extends React.Component<MbtiTestProps> {
  pushNextTest() {
    this.props.navigator.push({
      screen: "MbtiTest3Screen",
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
    let imageA = "../assets/mbti/researching.jpeg";
    let imageB = "../assets/mbti/skydiving.jpg";

    let styleA = this.props.test2 == "A" ? chosenAnswer : answer;
    let styleB = this.props.test2 == "B" ? chosenAnswer : answer;

    return (
      <LinearGradient colors={["#9EF8E4", "#30519B"]} style={[{ flex: 1 }]}>
        <View style={globalStyle.container}>
          <View style={globalStyle.cardContainer}>
            <Text style={styles.header}>Quiz 2</Text>
            <Text style={styles.question}>
              If your lover ask you to join a new activity, you will...
            </Text>

            <TouchableOpacity onPress={() => this.onChoiceA()}>
              <Text style={styleA}>
                A Collect as many information about the activity as you can
                before you go for it
              </Text>
              <View style={styles.pickCard}>
                <Image style={styles.img} source={require(imageA)} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.onChoiceB()}>
              <Text style={styleB}>
                B Just go and see what will happen. That’s why life is fun!
              </Text>
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
    test2: state.test.test2
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onChoose: (choice: string) => dispatch(two(choice))
  };
};

const MbtiTest2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(PureMbtiTest2);
export default MbtiTest2;

const styles = StyleSheet.create({
  header: {
    color: "rgb(57,123,226)",
    fontSize: 20,
    fontWeight: "800"
  },
  question: {
    color: "rgb(57,123,226)",
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
