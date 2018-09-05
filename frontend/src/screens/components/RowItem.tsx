import * as React from "react";
import LinearGradient from "react-native-linear-gradient";
import { transparentNav, globalStyle } from "../styles/common";
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
import LeftTopButton from "./LeftTopButton";
import RightTopButton from "./RightTopButton";

const { height, width } = Dimensions.get("window");

// Each request item
interface rowItemProps {
  item: any;
  index: any;
  onPressItem: (item: any) => any;
}
export default class rowItem extends React.PureComponent<rowItemProps> {
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
          <TouchableOpacity style={styles.likeBtn} onPress={() => {
            
          }}>
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