import * as React from "react";
import LinearGradient from "react-native-linear-gradient";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import axios from "axios";
import Config from "react-native-config";

const { height, width } = Dimensions.get("window");

interface IPublicProfileProps {
  navigator: Navigator;
  targetID: number;
  token: string;
}

interface IPublicProfileStates {
  profileDetails: any;
}

export default class PublicProfile extends React.Component<IPublicProfileProps, IPublicProfileStates> {
  constructor(props: IPublicProfileProps) {
    super(props);
    this.state = {
      profileDetails: []
    };
  }

  async componentWillMount() {
    axios
      .get(`${Config.API_SERVER}/api/user/profile/public/${this.props.targetID}`, {
        headers: {
          Authorization: "Bearer " + this.props.token
        }
      })
      .then(res => {
        this.setState({
          profileDetails: res.data
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <LinearGradient colors={["#9EF8E4", "#30519B"]} style={[{ flex: 1 }]}>
        <View style={styles.container}>
          <ScrollView
            horizontal={false}
            snapToInterval={width - 40} // card width offset margin
            snapToAlignment={"center"}
            decelerationRate={0} // stop scrolling momentum
          >
            {this.state.profileDetails.map(
              ({
                id,
                display_name,
                dob,
                gender,
                location,
                mbti,
                key_atr,
                key_atr_desc
              }) => (
                  <View>
                    <View style={styles.card}>
                      <Image
                        style={styles.avatar}
                        source={require('../assets/16Types/adventurer.png')}
                      />
                      <View>
                        <Text style={styles.nameText}>{display_name}</Text>
                      </View>
                      <Text style={styles.inputText}>{dob}</Text>

                      <Text style={styles.inputText}>{location}</Text>
                      <Text style={styles.inputText}>{key_atr_desc}</Text>
                    </View>
                  </View>
                )
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
    alignItems: "center",
    textAlign: "center"
  },
  topButtonContainer: {
    flexDirection: "row",
    height: 45
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 5,
    marginTop: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    width: width * 0.8, // percent or minus
    height: height * 0.65,
  },
  avatar: {
    width: width * 0.4,
    height: height * 0.3
  },
  nameText: {
    fontSize: 20,
    color: "#3B5998",
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: 2.5,
    marginTop: 5
  },
  inputText: {
    backgroundColor: "#E5F5FA",
    color: "#3B5998",
    marginVertical: 7,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 25,
    width: 250,
    textAlign: "center"
  },
  chatButtonContainer: {
    flexDirection: "row",
    height: 33,
    width: width * 0.2,
    backgroundColor: '#F0957F',
    borderColor: 'white',
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 10,
    marginLeft: 110
  },
  chatButtonText: {
    color: 'white',
    textAlign: 'center',
    letterSpacing: 3,
    fontSize: 12,
    fontWeight: '600'
  }
});