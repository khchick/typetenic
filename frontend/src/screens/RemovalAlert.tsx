import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions
} from "react-native";
import axios from "axios";
import Config from "react-native-config";
const { height, width } = Dimensions.get("window");

interface IRemovalAlertProps {
  navigator: Navigator;
  token: string;
  userID: number;
  targetID: number;
  targetName: string;
  handleChangeTypeDeck: () => any;
  handleChangeTenDeck: () => any;
  refreshTypeDeck: () => any;
}

export default class RemovalAlert extends React.Component<IRemovalAlertProps, {}> {

  render() {
    return (
      <View>
        <View style={styles.RemovalAlertContainer}>
          <Text style={styles.defaultMsg}>Are you sure you want to remove {this.props.targetName} from your deck?
            {"\n"}
            {"\n"}
            (By doing so your card will also be removed from {this.props.targetName}'s deck. You will need to request each other to flip your cards again after reconnecting.)
            </Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.cancelBtnContainer}
              onPress={() => { this.props.navigator.dismissModal() }}
            >
              <Text style={styles.btnText}>NOT NOW</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnContainer}
              onPress={() => {
                axios
                  .delete(
                    `${Config.API_SERVER}/api/connection/deck/${this.props.targetID}`,
                    {
                      headers: {
                        Authorization: `Bearer ${this.props.token}`
                      }
                    }
                  )
                  .then(() => {
                    this.props.handleChangeTypeDeck();
                    this.props.handleChangeTenDeck();
                    this.props.refreshTypeDeck();
                    this.props.navigator.dismissModal();
                  })
                  .catch(err => console.log(err));
              }}
            >
              <Text style={styles.btnText}>CONFIRM</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  RemovalAlertContainer: {
    padding: width * 0.1
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width * 0.6,
    marginLeft: width * 0.065,
    marginRight: width * 0.05
  },
  btnContainer: {
    textAlign: 'center',
    width: width * 0.25,
    backgroundColor: "#F0957F",
    marginTop: height * 0.5,
    marginLeft: width * 0.04,
    marginRight: width * 0.04,
    paddingVertical: 5,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2
  },
  centerBtnContainer: {
    textAlign: 'center',
    width: width * 0.23,
    backgroundColor: "#F0957F",
    marginTop: height * 0.5,
    marginLeft: width * 0.23,
    marginRight: width * 0.04,
    paddingVertical: 5,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2
  },
  cancelBtnContainer: {
    textAlign: 'center',
    width: width * 0.25,
    backgroundColor: "grey",
    marginTop: height * 0.5,
    marginLeft: width * 0.04,
    marginRight: width * 0.04,
    paddingVertical: 5,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 1.5
  },
  defaultMsg: {
    fontSize: 16,
    textAlign: "justify"
  }
})