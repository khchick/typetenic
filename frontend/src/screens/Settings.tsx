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
      <LinearGradient colors={["#9EF8E4", "#30519B"]} style={[{ flex: 1 }]}>
        <View style={styles.container}>
          <View style={styles.agerow}>
            <Text style={styles.header}>Age Range</Text>
            <RangeSlider
              minValue={20}
              maxValue={60}
              tintColor={"rgb(0,96,255)"}
              handleBorderWidth={1}
              handleBorderColor="rgb(0,96,255)"
              selectedMinimum={20}
              selectedMaximum={50}
              style={{
                flex: 1,
                height: 70,
                padding: 30,
                backgroundColor: "rgb(232,238,241)"
              }}
              onChange={(data: any) => {
                console.log(data);
              }}
            />
          </View>

          <View style={styles.showmerow}>
            <Text style={styles.header}>Show Me</Text>
            <ToggleSwitch
              onColor="rgb(253,161,144)"
              offColor="rgb(83,165,196)"
              label="Men"
              labelStyle={{
                color: "rgb(83,165,196)",
                fontWeight: "500",
                fontSize: 20
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
                fontWeight: "500",
                fontSize: 20
              }}
              size="large"
              isOn={this.state.isOnWomenSwitch}
              onToggle={isOnWomenSwitch => {
                this.setState({ isOnWomenSwitch });
                this.onToggle(isOnWomenSwitch);
              }}
            />

            <View style={styles.messagerow}>
              <Text style={styles.header}>Notification</Text>
              <ToggleSwitch
                //isOn={false}
                onColor="rgb(253,161,144)"
                offColor="rgb(83,165,196)"
                label="Matches"
                labelStyle={{
                  color: "rgb(83,165,196)",
                  fontWeight: "500",
                  fontSize: 20
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
                label="Request"
                labelStyle={{
                  color: "rgb(83,165,196)",
                  fontWeight: "500",
                  fontSize: 20
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
                label="Messages"
                labelStyle={{
                  color: "rgb(83,165,196)",
                  fontWeight: "500",
                  fontSize: 20
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
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(232,238,241)",
    padding: 10
  },

  header: {
    color: "rgb(83,165,196)",
    fontSize: 24,
    fontWeight: "bold",
    padding: 10
  },

  agerow: {
    backgroundColor: "rgb(232,238,241)",
    padding: 10
  },

  showmerow: {
    flex: 1,
    backgroundColor: "rgb(232,238,241)",
    padding: 10
  },

  messagerow: {
    flex: 1,
    backgroundColor: "rgb(232,238,241)",
    padding: 10
  }
});
