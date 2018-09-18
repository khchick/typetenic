import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image
} from "react-native";
import axios from 'axios';
import Config from "react-native-config";
import { connect } from "react-redux";
import { handleChangeNotification } from '../../redux/actions/refreshAction';

const { height, width } = Dimensions.get("window");

// Each note item
interface NoteItemProps {
  token: string;
  item: any;
  index: any;
  onPressItem: (item: any) => any;
  handleChangeNotification: () => any;
}

class NoteItem extends React.PureComponent<NoteItemProps> {
  onPress = () => {
    this.props.onPressItem(this.props.item.id);
  };

  getReadStatus(readStatus: string) {
    if (readStatus === 'Unread') {
      return {
        fontSize: 14,
        fontWeight: "bold",
        color: "#48BBEC",
        letterSpacing: 1
      };
    };

    if (readStatus === 'Read') {
      return {
        fontSize: 14,
        fontWeight: "bold",
        color: "grey",
        letterSpacing: 1
      }
    };
  }

  render() {
    const item = this.props.item;

    return (
      <View style={
        styles.rowContainer
      }>
        <Text style={this.getReadStatus(item.read_status)} onPress={this.onPress}>{item.title}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.likeBtn} onPress={() => {
            axios
              .delete(`${Config.API_SERVER}/api/notification/${item.id}`,
                {
                  headers: {
                    Authorization: "Bearer " + this.props.token
                  }
                })
              .then(() => {
                this.props.handleChangeNotification()
              })
              .catch(err => console.log(err));
          }}>
            <Image style={styles.icon} source={require('../../assets/close.png')} />
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
    handleChangeNotification: () => dispatch(handleChangeNotification())
  };
};

export default connect(MapStateToProps, mapDispatchToProps)(NoteItem);

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
    fontSize: 14,
    fontWeight: "bold",
    color: "#48BBEC",
    letterSpacing: 1
  },
  likeBtn: {
    backgroundColor: "#F0957F",
    paddingHorizontal: 5,
    paddingVertical: 7,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 10
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 1.5
  },
  icon: {
    resizeMode: 'contain',
    height: 15
  }
});
