import * as React from "react";
import RangeSlider from "react-native-range-slider";
import ToggleSwitch from "toggle-switch-react-native";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";

//container design -boxess
//notification: toggle button
//age preference: slider;

interface SettingsProps {
  navigator: Navigator;
}

interface SettingsState {
  isOnMenSwitch: boolean;
  isOnWomenSwitch: boolean;
  isOnMatchesSwitch: boolean;
  isOnMessageSwitch: boolean;
  isOnRequestSwitch: boolean;
  isOnMessagesSwitch: boolean;
}

export default class Settings extends React.Component<
  SettingsProps,
  SettingsState
> {
  state = {
    isOnMenSwitch: false,
    isOnWomenSwitch: false,
    isOnMatchesSwitch: false,
    isOnRequestSwitch: false,
    isOnMessagesSwitch: false
  };

  onToggle(isOn) {
    return isOn;
  }

  render() {
    return (
      <View style={styles.subContainer}>
        <View style={styles.agerow}>
          <Text style={styles.subHeader}>Age Range</Text>
          <RangeSlider
            style={styles.slider}
            minValue={20}
            maxValue={60}
            tintColor={"rgb(0,96,255)"}
            handleBorderWidth={1}
            handleBorderColor="rgb(0,96,255)"
            selectedMinimum={20}
            selectedMaximum={50}
            onChange={(data: any) => {
              console.log(data);
            }}
          />
        </View>
        <View style={styles.subContainer}>
          <View style={styles.showmerow}>
            <Text style={styles.subHeader}>Show Me</Text>
            <ToggleSwitch
              onColor="rgb(253,161,144)"
              offColor="rgb(83,165,196)"
              label="Men      "
              labelStyle={{
                color: "rgb(83,165,196)",
                fontSize: 20,
                padding: 10,
                marginLeft: 10,
                marginRight: 10
              }}
              size="large"
              isOn={this.state.isOnMenSwitch}
              onToggle={isOnMenSwitch => {
                this.setState({ isOnMenSwitch });
                this.onToggle(isOnMenSwitch);
              }}
            />
            <ToggleSwitch
              onColor="rgb(253,161,144)"
              offColor="rgb(83,165,196)"
              label="Women"
              labelStyle={{
                color: "rgb(83,165,196)",
                fontSize: 20,
                padding: 10,
                marginLeft: 10,
                marginRight: 10
              }}
              size="large"
              isOn={this.state.isOnWomenSwitch}
              onToggle={isOnWomenSwitch => {
                this.setState({ isOnWomenSwitch });
                this.onToggle(isOnWomenSwitch);
              }}
            />
          </View>

          <View style={styles.subContainer}>
            <View style={styles.messagerow}>
              <Text style={styles.subHeader}> Notification</Text>
              <ToggleSwitch
                //isOn={false}
                onColor="rgb(253,161,144)"
                offColor="rgb(83,165,196)"
                label="Matches   "
                labelStyle={{
                  color: "rgb(83,165,196)",
                  fontSize: 20,
                  padding: 10
                }}
                size="large"
                isOn={this.state.isOnMatchesSwitch}
                onToggle={isOnMatchesSwitch => {
                  this.setState({ isOnMatchesSwitch });
                  this.onToggle(isOnMatchesSwitch);
                }}
              />

              <ToggleSwitch
                onColor="rgb(253,161,144)"
                offColor="rgb(83,165,196)"
                label="Request    "
                labelStyle={{
                  color: "rgb(83,165,196)",
                  fontSize: 20,
                  padding: 10
                }}
                size="large"
                isOn={this.state.isOnRequestSwitch}
                onToggle={isOnRequestSwitch => {
                  this.setState({ isOnRequestSwitch });
                  this.onToggle(isOnRequestSwitch);
                }}
              />
              <ToggleSwitch
                onColor="rgb(253,161,144)"
                offColor="rgb(83,165,196)"
                label="Messages "
                labelStyle={{
                  color: "rgb(83,165,196)",
                  fontSize: 20,
                  padding: 10
                }}
                size="large"
                isOn={this.state.isOnMessagesSwitch}
                onToggle={isOnMessagesSwitch => {
                  this.setState({ isOnMessagesSwitch });
                  this.onToggle(isOnMessagesSwitch);
                }}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  subContainer: {
    backgroundColor: "rgb(232,238,241)",
    padding: 30,
    marginTop: 5,
    paddingTop: 8,
    paddingBottom: 8,
    marginLeft: 5,
    marginRight: 8,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 8,
    marginVertical: 8
  },
  slider: {
    height: 80,
    padding: 15,
    backgroundColor: "rgb(299,245,250)",
    marginLeft: 30,
    marginRight: 30
  },
  header: {
    color: "rgb(83,165,196)",
    fontWeight: "bold",
    fontSize: 20,
    padding: 10,
    // marginLeft: 10,
    // marginRight: 10,
    textAlign: "left"
  },
  subHeader: {
    color: "rgb(83,165,196)",
    fontWeight: "bold",
    fontSize: 20,
    padding: 10,
    // marginLeft: 30,
    // marginRight: 30,
    textAlign: "left"
  },
  showmerow: {
    backgroundColor: "rgb(232,238,241)",
    padding: 15,
    height: 160
    // marginLeft: 30,
    // marginRight: 30
  },

  messagerow: {
    // backgroundColor: "rgb(232,238,241)",
    padding: 15,
    height: 240
    // marginLeft: 30,
    // marginRight: 30
  }
});
