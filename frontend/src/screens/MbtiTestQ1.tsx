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
    let imageUriA = "http://www.abc.net.au/news/image/8534540-3x2-940x627.jpg";
    let imageUriB =
      "https://c1.staticflickr.com/8/7331/12107440775_3b11a02af0_b.jpg";
    let chosenChoice = this.state.choice1 ? "rgb(255,235,59)" : null;

    return (
      <LinearGradient colors={["#9EF8E4", "#30519B"]} style={[{ flex: 1 }]}>
        <View style={globalStyle.container}>
          <View style={globalStyle.cardContainer}>
            <Text style={styles.title}>Question</Text>
            <Text style={styles.question}>
              How do you spend your weekends when you are single?
            </Text>

            <TouchableOpacity onPress={() => this.setState({ choice1: "A" })}>
              <Text style={styles.answer}>
                A Join different parties/ coffee meet with friends
              </Text>
              <Image style={styles.img} source={{ uri: imageUriA }} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.setState({ choice1: "B" })}>
              <Text style={styles.answer}>
                B Read a book, play video games at home
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
