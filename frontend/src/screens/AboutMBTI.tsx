import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

class AboutMBTI extends React.Component {
  render() {
    return (
      <View style={styles.textContainer}>
        <Text style={styles.textContent}>
          The purpose of the Myers-Briggs Type Indicator® (MBTI®) personality
          inventory is to make the theory of psychological types described by C.
          G. Jung understandable and useful in people's lives.
          {"\n"}
          {"\n"}
          The essence of the theory is that much seemingly random variation in
          the behavior is actually quite orderly and consistent, being due to
          basic differences in the ways individuals prefer to use their
          perception and judgment.
          {"\n"}
          {"\n"}
          Personality is just one of many factors that guide our behavior,
          however. Our actions are also influenced by our environment, our
          experiences, and our individual goals.
        </Text>
      </View>
    );
  }
}

export default AboutMBTI;

const styles = StyleSheet.create({
  textContainer: {
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 40
  },
  textContent: {
    fontSize: 16,
    color: "#30519B",
    marginBottom: 10,
    textAlign: "justify"
  }
});
