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
import { three } from "../redux/actions/testAction";

const { height, width } = Dimensions.get("window");

interface MbtiTestProps {
  navigator: Navigator;
  onChoose: (choice: string) => any;
  test3: string;
}

class PureMbtiTest3 extends React.Component<MbtiTestProps> {
  pushNextTest() {
    this.props.navigator.push({
      screen: "MbtiTest4Screen",
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
    let imageA = "../assets/mbti/argue.jpg";
    let imageB = "../assets/mbti/hug.jpg";

    let styleA = this.props.test3 == "A" ? chosenAnswer : answer;
    let styleB = this.props.test3 == "B" ? chosenAnswer : answer;

    return (
      <LinearGradient colors={["#9EF8E4", "#30519B"]} style={[{ flex: 1 }]}>
        <View style={globalStyle.container}>
          <View style={globalStyle.cardContainer}>
            <Text style={styles.header}>Quiz 3</Text>
            <Text style={styles.question}>
              Imagine you are now having a fight with your lover, what will you
              do ?
            </Text>

            <TouchableOpacity onPress={() => this.onChoiceA()}>
              <Text style={styleA}>
                A Try to convince her/ him with logical arguments
              </Text>
              <View style={styles.pickCard}>
                <Image style={styles.img} source={require(imageA)} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.onChoiceB()}>
              <Text style={styleB}>
                B Give her/ him a hug no matter who is the wrong one
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
    test3: state.test.test3
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onChoose: (choice: string) => dispatch(three(choice))
  };
};

const MbtiTest3 = connect(
  mapStateToProps,
  mapDispatchToProps
)(PureMbtiTest3);
export default MbtiTest3;

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
