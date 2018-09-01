// Change chosen color
// push to next question

import * as React from "react";
import LinearGradient from "react-native-linear-gradient";
import { transparentNav, globalStyle } from "./styles/common";
import {
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  View,
  Image
} from "react-native";

interface MbtiTestProps {
  navigator: Navigator;
}

interface MbtiTestStates {
  choice1: string | null;
}

export default class MbtiTest extends React.Component<
  MbtiTestProps,
  MbtiTestStates
> {
  constructor(props: any) {
    super(props);
    this.state = {
      choice1: null
    };
  }

  render() {
    let imageUriA =
      "http://www.ginamussio.com/wp-content/uploads/2016/09/desk.jpg";
    let imageUriB =
      "https://cdn1.experienceoz.com.au/wp-content/uploads/2016/04/rottnest-island-skydive.jpg";
    let chosenChoice = this.state.choice1 ? "rgb(255,235,59)" : null;

    return (
      <LinearGradient colors={["#9EF8E4", "#30519B"]} style={[{ flex: 1 }]}>
        <View style={globalStyle.container}>
          <View style={globalStyle.cardContainer}>
            <Text style={styles.title}>Question</Text>
            <Text style={styles.question}>
              If your lover ask you to join an extreme activity, you will...?
            </Text>

            <TouchableOpacity onPress={() => this.setState({ choice1: "A" })}>
              <Text style={styles.answer}>
                Collect as many information as you can before you have decided
                to go for it
              </Text>
              <Image style={styles.img} source={{ uri: imageUriA }} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.setState({ choice1: "B" })}>
              <Text style={styles.answer}>
                Just go and see what will happen. That’s why life is fun!
              </Text>
              <Image style={styles.img} source={{ uri: imageUriB }} />
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
    color: "#30519B"
  },
  question: {
    fontSize: 16,
    color: "#30519B",
    marginBottom: 10
  },
  answer: {
    fontSize: 16,
    color: "#30519B",
    marginTop: 15,
    marginBottom: 5
  },
  img: {
    height: 170,
    width: 170
  }
});
