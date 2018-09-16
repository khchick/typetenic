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

interface IFlipAlertProps {
  navigator: Navigator;
  token: string;
  userID: number;
  targetID: number;
  targetName: string;
  flipStatus: string;
  reqSender: number;
}

export default class FlipAlert extends React.Component<IFlipAlertProps, {}> {
  
  getModalContent(targetID: number, targetName: string, flipStatus: string, reqSender: number) {
    if (flipStatus == null) {
      return (
        <View style={styles.flipAlertContainer}>
          <Text style={styles.defaultMsg}>Confirm to request {targetName} to flip his/her card and yours?
          {"\n"}
            {"\n"}
            (Both of you will be able to view each other's private profile after flipping.)
            </Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.cancelBtnContainer}
              onPress={() => {
                this.props.navigator.dismissModal()
              }}
            >
              <Text style={styles.btnText}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnContainer}
              onPress={() => {
                axios
                  .post(
                    `${Config.API_SERVER}/api/connection/flip/request/${targetID}`,
                    {},
                    {
                      headers: {
                        Authorization: `Bearer ${this.props.token}`
                      }
                    }
                  )
                  .then(() => {
                    this.props.navigator.dismissModal()
                  })
                  .catch(err => console.log(err));
              }}
            >
              <Text style={styles.btnText}>CONFIRM</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
    if (flipStatus === 'Requested' && reqSender === targetID) {
      return (
        <View style={styles.flipAlertContainer}>
          <Text style={styles.defaultMsg}>{targetName} has sent you a flip request! Would like to accept?
          {"\n"}
            {"\n"}
            (Both of you will be able to view each other's private profile after flipping.)
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
                  .put(
                    `${Config.API_SERVER}/api/connection/flip/approve/${targetID}`,
                    {},
                    {
                      headers: {
                        Authorization: `Bearer ${this.props.token}`
                      }
                    }
                  )
                  .then(() => {
                    this.props.navigator.dismissModal()
                  })
                  .catch(err => console.log(err));
              }}
            >
              <Text style={styles.btnText}>SURE</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    };
    if (flipStatus === 'Requested' && reqSender === this.props.userID) {
      return (
        <View style={styles.flipAlertContainer}>
          <Text style={styles.defaultMsg}>{targetName} is still considering your flip request. Give him/her some time!
            </Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.cancelBtnContainer}
              onPress={() => { this.props.navigator.dismissModal() }}
            >
              <Text style={styles.btnText}>OK</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnContainer}
              onPress={() => {
                axios
                  .delete(
                    `${Config.API_SERVER}/api/connection/flip/request/${targetID}`,
                    {
                      headers: {
                        Authorization: `Bearer ${this.props.token}`
                      }
                    }
                  )
                  .then(() => {
                    this.props.navigator.dismissModal()
                  })
                  .catch(err => console.log(err));
              }}
            >
              <Text style={styles.btnText}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    };
    if (flipStatus === 'Flipped') {
      return (
        <View style={styles.flipAlertContainer}>
          <Text style={styles.defaultMsg}>Congratulation! You two are truly connected!
            </Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.centerBtnContainer}
              onPress={() => { this.props.navigator.dismissModal() }}
            >
              <Text style={styles.btnText}>CLOSE</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    };
    // if (flipStatus === 'Rejected' && reqSender === targetID) {

    // };
    // if (flipStatus === 'Rejected' && reqSender === this.props.userID) {

    // };
  }

  render() {
    return (
      <View>
        {this.getModalContent(this.props.targetID, this.props.targetName, this.props.flipStatus, this.props.reqSender)}
      </View>
    )
  }

}

const styles = StyleSheet.create({
  flipAlertContainer: {
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