import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const { height, width } = Dimensions.get("window");

// Each request item
interface NoteItemProps {
  item: any;
  index: any;
  onPressItem: (item: any) => any;
}
export default class NoteItem extends React.PureComponent<NoteItemProps> {
  onPress = () => {
    this.props.onPressItem(this.props.item.id);
  };

  render() {
    const item = this.props.item;

    return (
      <View style={styles.rowContainer}>

        <Text style={styles.name}>{item.title}</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.likeBtn} onPress={() => {
            
          }}>
            <Text style={styles.btnText}>DELETE</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    paddingRight: 20,
    paddingLeft: 10,
    paddingVertical: 5,
    backgroundColor: "white",
    marginVertical: 4,
    width: width,
    alignItems: 'center'
  },
  thumb: {
    resizeMode: 'contain',
    width: 35,
    height: 50,
    marginRight: 10
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#48BBEC",
    letterSpacing: 1
  },
  likeBtn: {
    backgroundColor: "#F0957F",
    paddingHorizontal: 15,
    paddingVertical: 5,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    margin: 10
  },
  passBtn: {
    backgroundColor: "#30519B",
    paddingHorizontal: 15,
    paddingVertical: 5,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    margin: 10
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 1.5
  }
});
