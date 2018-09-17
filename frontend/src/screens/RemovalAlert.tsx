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
}

export default class RemovalAlert extends React.Component<IRemovalAlertProps, {}> {

  render() {
    return (
      <View>
        <View style={styles.RemovalAlertContainer}>
          <Text style={styles.defaultMsg}>Are you sure you want to remove {this.props.targetName} from your deck?
            {"\n"}
            {"\n"}
            By doing so your card will also be removed from {this.props.targetName}'s deck
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
    width: width * 0.8,
    marginHorizontal: width * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: width * 0.2
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: 'center',
    width: width * 0.8,
    marginHorizontal: width * 0.1,
    marginTop: height * 0.05
  },
  btnContainer: {
    backgroundColor: "#F0957F",
    width: width * 0.25,
    height: height * 0.04,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  centerBtnContainer: {
    textAlign: 'center',
    width: width * 0.25,
    backgroundColor: "#F0957F",
    marginTop: height * 0.5,
    marginLeft: width * 0.23,
    marginRight: width * 0.04,
    paddingVertical: 10,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    borderRadius: 4
  },
  cancelBtnContainer: {
    backgroundColor: "grey",
    width: width * 0.23,
    height: height * 0.04,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
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
    textAlign: "center"
  }
})