import * as React from "react";
import LinearGradient from "react-native-linear-gradient";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import axios from "axios";
import Config from "react-native-config";
import { AsyncStorage } from "react-native";
import {transparentNav} from './styles/common';

const { height, width } = Dimensions.get("window");

interface DeckStates {
  connectedSuggestions: any;
  connectedUsers: any;
}

export default class Deck extends React.Component<{}, DeckStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      connectedSuggestions: [],
      connectedUsers: []
    };
  }

  async componentWillMount() {
    let token = await AsyncStorage.getItem("token");
    axios
      .get(`${Config.API_SERVER}/api/connection/deck/suggested`, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(res => {
        this.setState({
          connectedSuggestions: res.data
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <LinearGradient colors={["#9EF8E4", "#30519B"]} style={[{ flex: 1 }]}>
        <View style={styles.container}>
          <ScrollView
            horizontal={true}
            snapToInterval={width - 40} // card width offset margin
            snapToAlignment={"center"}
            decelerationRate={0} // stop scrolling momentum
          >
            {this.state.connectedSuggestions.map(
              ({
                id,
                display_name,
                dob,
                gender,
                location,
                key_atr,
                key_atr_desc,
                mbti,
                conID
              }) => (
<<<<<<< HEAD
                  <View style={styles.card} key={id}>
                    <Image
                      style={styles.avatar}
                      source={{
                        uri:
                          "https://i.pinimg.com/236x/83/0f/71/830f71015b4a7383998416fe7f07c7eb--the-joker-jokers.jpg"
                      }}
                    />
                    <View style={styles.NameButtonContainer}>
                      <Text style={styles.NameButtontext}>{display_name}</Text>
                    </View>
                    {/* <Text style={styles.inputHeader}>{mbti}</Text>
                  <Text style={styles.inputHeader}>{key_atr}</Text> */}
                    <Text style={styles.inputHeader}>{dob}</Text>
                    {/* <Text style={styles.inputHeader}>{gender}</Text> */}
                    <Text style={styles.inputHeader}>{location}</Text>
                    <Text style={styles.inputHeader}>{key_atr_desc}</Text>
                    <TouchableOpacity style={styles.btnContainer}
                        onPress={() => this.props.navigator.push({
                        screen: 'ChatTabScreen',
                        passProps: {targetID: id, conID: conID },
                        navigatorStyle: transparentNav,
                      })}>
                      <Text style={styles.btnText}>Chat</Text>
                    </TouchableOpacity>
                  </View>
                )
=======
                <View style={styles.card}>
                  <Image
                    style={styles.avatar}
                    source={{
                      uri:
                        "https://i.pinimg.com/236x/83/0f/71/830f71015b4a7383998416fe7f07c7eb--the-joker-jokers.jpg"
                    }}
                  />
                  <View style={styles.NameButtonContainer}>
                    <Text style={styles.NameButtontext}>{display_name}</Text>
                  </View>
                  <Text style={styles.inputHeader}>{mbti}</Text>
                  <Text style={styles.inputHeader}>{key_atr}</Text>
                  <Text style={styles.inputHeader}>{dob}</Text>
                  {/* <Text style={styles.inputHeader}>{gender}</Text> */}
                  <Text style={styles.inputHeader}>{location}</Text>
                  <Text style={styles.inputHeader}>{key_atr_desc}</Text>
                </View>
              )
>>>>>>> 54067fea7de68a1facdd874050fac8843bb0f625
            )}
          </ScrollView>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 30,

    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    width: width * 0.8, // percent or minus
    height: height * 0.7,
    margin: 20
  },
  avatar: {
    width: width * 0.5,
    height: height * 0.3
  },
  NameButtonContainer: {
    backgroundColor: "#B6AFA9",
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginVertical: 5,
    width: "50%",
    marginTop: 5,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5
  },
  NameButtontext: {
    fontSize: 25,
    color: "white",
    fontWeight: "700",
    textAlign: "center"
  },
  text: {
    fontSize: 13,
    color: "#333333",
    paddingTop: 10
  },
  inputHeader: {
    backgroundColor: "#E5F5FA",
    color: "#30519B",
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 25,
    width: 250,
    textAlign: "center"
  }
});
