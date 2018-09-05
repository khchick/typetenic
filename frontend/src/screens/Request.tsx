import * as React from "react";
import LinearGradient from "react-native-linear-gradient";
import { transparentNav, globalStyle } from "./styles/common";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Alert
} from "react-native";
import axios from "axios";
import Config from "react-native-config";
import { connect } from "react-redux";
import LeftTopButton from "./components/LeftTopButton";
import RightTopButton from "./components/RightTopButton";

const { height, width } = Dimensions.get("window");

// Each user item
interface RequestItemProps {
  item: any;
  index: any;
  onPressItem: (item: any) => any;
}
class RequestItem extends React.PureComponent<RequestItemProps> {
  onPress = () => {
    this.props.onPressItem(this.props.item.id);
  };

  render() {
    const item = this.props.item;
    return (
      <View style={styles.rowContainer}>
        <TouchableOpacity onPress={this.onPress}>
          <Image
            style={styles.thumb}
            source={{
              uri:
                "https://i.pinimg.com/236x/83/0f/71/830f71015b4a7383998416fe7f07c7eb--the-joker-jokers.jpg"
            }}
          />
        </TouchableOpacity>

        <Text style={styles.name}>{item.display_name}</Text>

        <View style={styles.textContainer}>
          <TouchableOpacity style={styles.likeBtn} onPress={() => {}}>
            <Text style={styles.btnText}>LIKE</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.passBtn} onPress={() => {}}>
            <Text style={styles.btnText}>PASS</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

// List all users, fetch data
interface RequestProps {
  navigator: Navigator;
  token: string;
}

interface RequestStates {
  listSentReq: any;
}

class PureRequest extends React.Component<RequestProps, RequestStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      listSentReq: null
    };
  }

  async componentWillMount() {
    console.log("request");
    axios
      .get(`${Config.API_SERVER}/api/connection/request/sent`, {
        // axios.get(`${Config.API_SERVER}}/api/connection/request/received`, {
        headers: {
          Authorization: "Bearer " + this.props.token
        }
      })
      .then(res => {
        this.setState({
          listSentReq: res.data
        });
      })
      .catch(err => console.log(err));
  }

  keyExtractor = (item: any, index: any) => {
    item.id.toString(); // The value of key must be a string
  };

  renderItem = ({ item, index }) => (
    <RequestItem item={item} index={index} onPressItem={this.onPressItem} />
  );

  onPressItem = (item: any) => {
    console.log("Pressed row: " + item);
    this.props.navigator.push({
      title: "New Page",
      screen: "LoginScreen", // to target user profile
      passProps: { userId: item.id }
    });
  };

  render() {
    return (
      <LinearGradient colors={["#9EF8E4", "#30519B"]} style={[{ flex: 1 }]}>
        <View style={styles.buttonContainer}>
          <LeftTopButton
            leftButtonName={"RECEIVED"}
            onPress={() => {
              console.log("received");
            }}
          />
          <RightTopButton
            rightButtonName={"SENT"}
            onPress={() => {
              console.log("sent");
            }}
          />
        </View>

        <ScrollView style={styles.listContainer}>
          <FlatList
            data={this.state.listSentReq}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
          />
        </ScrollView>
      </LinearGradient>
    );
  }
}

const MapStateToProps = (state: any) => {
  return {
    token: state.auth.token
  };
};

const Request = connect(MapStateToProps)(PureRequest);
export default Request;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    height: 45
  },

  listContainer: {
    paddingHorizontal: 8,
    paddingBottom: 10
  },
  rowContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "white",
    marginVertical: 5
  },
  thumb: {
    width: 50,
    height: 50,
    marginRight: 10
  },
  textContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#48BBEC"
  },
  likeBtn: {
    backgroundColor: "#ffa18e",
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    margin: 10
  },
  passBtn: {
    backgroundColor: "#3B5998",
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    margin: 10
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 1.5
  }
});
