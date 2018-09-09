import * as React from "react";
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
import AvatarImage, {getAvatar} from '../components/AvatarImage';
import axios from 'axios';
import Config from "react-native-config";
import { connect } from "react-redux";

const { height, width } = Dimensions.get("window");

// Each request item
interface SentRowItemProps {
  token: string;
  item: any;
  index: any;
  onPressItem: (item: any) => any;
}

class SentRowItem extends React.PureComponent<SentRowItemProps> {
  onPress = () => {
    this.props.onPressItem(this.props.item.id);
  };

  render() {
    const item = this.props.item; 
    let mbtiImg = getAvatar(this.props.item.mbti)

    return (
      <View style={styles.rowContainer}>
        <TouchableOpacity onPress={this.onPress}>
          <AvatarImage style={styles.thumb} source={  mbtiImg } />        
        </TouchableOpacity>        

        <Text style={styles.name}>{item.display_name}</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.passBtn} onPress={() => {
            console.log("cancelled sent request");
            // axios.delete only accepts 2 param url and config -> wrap data inside config
            axios
              .delete(`${Config.API_SERVER}/api/connection/deck/mypicks`,              
              {
                headers: {
                  Authorization: "Bearer " + this.props.token
                },
                data: { 
                  'targetID': item.id
                }
              })
              .catch(err => console.log(err));
          }} >
            <Text style={styles.btnText}>CANCEL</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const MapStateToProps = (state: any) => {
  return {
    token: state.auth.token
  };
};

export default connect(MapStateToProps)(SentRowItem);


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
