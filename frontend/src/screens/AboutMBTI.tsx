import * as React from "react";
import {
  StyleSheet,
  Text,
  View
} from "react-native";

class AboutMBTI extends React.Component {

  render() {
    return (
      <View style={styles.textContainer}>
        <Text style={styles.textContent}>
          Personality is just one of many factors that guide our behavior,
          however. Our actions are also influenced by our environment, our
          experiences, and our individual goals.
          {"\n"}
          {"\n"}
          On our website, we describe
          how people belonging to a specific personality type are likely to
          behave. We outline indicators and tendencies, however, not
          definitive guidelines or answers.
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
    marginTop: 40,
  },
  textContent: {
    fontSize: 16,
    color: "#30519B",
    marginBottom: 10,
    textAlign: "justify"
  }
});
