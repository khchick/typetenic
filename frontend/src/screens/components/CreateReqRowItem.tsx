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
import AvatarImage, {getAvatar} from './AvatarImage';
import axios from 'axios';
import Config from "react-native-config";
import { connect } from "react-redux";
import { createSentReq, handleSentReq } from '../../redux/actions/refreshAction';

const { height, width } = Dimensions.get("window");

// Each request item
interface CreateReqRowItemProps {
  token: string;
  item: any;
  index: any;
  onPressItem: (item: any) => any;
  createSentReq: () => any;
  handleSentReq: () => any;
}

class CreateReqRowItem extends React.PureComponent<CreateReqRowItemProps> {
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
          <TouchableOpacity style={styles.likeBtn} onPress={() => {
            axios
              .post(`${Config.API_SERVER}/api/connection/request/sent`, 
              {
                'targetID': item.id
              },
              {
                headers: {
                  Authorization: "Bearer " + this.props.token
                }
              })
              .then(() => {
                this.props.createSentReq()
                this.props.handleSentReq()
              })
              .catch(err => console.log(err));
          }} >
            <Text style={styles.btnText}>SEND</Text>
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

const mapDispatchToProps = (dispatch: any) => {
  return {
    createSentReq: () => dispatch(createSentReq()),
    handleSentReq: () => dispatch(handleSentReq())
  };
};

export default connect(MapStateToProps, mapDispatchToProps)(CreateReqRowItem);



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
    letterSpacing: 1,
  },
  likeBtn: {
    backgroundColor: "#F0957F",
    paddingHorizontal: 15,
    paddingVertical: 5,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 4
  },
  passBtn: {
    backgroundColor: "#30519B",
    paddingHorizontal: 15,
    paddingVertical: 5,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 4
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 1.5,
  }
});
