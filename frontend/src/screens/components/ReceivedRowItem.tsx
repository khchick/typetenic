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
import Modal from "react-native-modal";
import AvatarImage, {getAvatar} from './AvatarImage';
import axios from 'axios';
import Config from "react-native-config";
import { connect } from "react-redux";
import { handleReceivedReq, handleChangeNotification } from '../../redux/actions/refreshAction';

const { height, width } = Dimensions.get("window");

// Each request item
interface ReceivedRowItemProps {
  token: string;
  item: any;
  index: any;
  onPressItem: (item: any) => any;
  handleReceivedReq: () => any;
  tenDeckList: Array<any>;
  handleChangeNotification: () => any;
}

interface ReceivedRowItemState {
  isModalVisible: boolean
}

class ReceivedRowItem extends React.PureComponent<ReceivedRowItemProps, ReceivedRowItemState> {
  state = {
    isModalVisible: false
  };

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
            if (this.props.tenDeckList.length == 10) {
              // pop up msg
              console.log('my picks reach 10')
              this.setState({
                isModalVisible: true
              })

            } else {
              console.log("approved request");
              axios
                .put(`${Config.API_SERVER}/api/connection/request/received/approve`, 
                {
                  'targetID': item.id
                },
                {
                  headers: {
                    Authorization: "Bearer " + this.props.token
                  }
                })
                .then(() => {
                  this.props.handleReceivedReq()
                  this.props.handleChangeNotification();
                })
                .catch(err => console.log(err));
            }          
          }} >
            <Text style={styles.btnText}>LIKE</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.passBtn} onPress={() => {
            console.log("rejected request");
            axios
              .put(`${Config.API_SERVER}/api/connection/request/received/reject`, 
              {
                'targetID': item.id
              },
              {
                headers: {
                  Authorization: "Bearer " + this.props.token
                }
              })
              .then(() => {
                this.props.handleReceivedReq()
                this.props.handleChangeNotification();
              })
              .catch(err => console.log(err));
          }}>
            <Text style={styles.btnText}>PASS</Text>
          </TouchableOpacity>
        </View>

          <Modal
              isVisible={this.state.isModalVisible}
              onBackdropPress={() => this.setState({ isModalVisible: false })}
              backdropOpacity={0.2}
            >
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>
                  Your picks reached 10
                </Text>
              </View>

          </Modal>

      </View>
    );
  }
}

const MapStateToProps = (state: any) => {
  return {
    token: state.auth.token,
    tenDeckList: state.refresh.tenDeckList
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleReceivedReq: () => dispatch(handleReceivedReq()),
    handleChangeNotification: () => dispatch( handleChangeNotification())
  };
};

export default connect(MapStateToProps, mapDispatchToProps)(ReceivedRowItem);


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
  },
  modalContent: {
    backgroundColor: "white",
    paddingVertical: 30,
    // paddingHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    color: "#E0674B"
  },
});
