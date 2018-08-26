import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import {
  MainFeed,
  Login,
  Register,
  Camera,
  Profile,
  Deck
} from "./components/screens";
import {
  SwitchNavigator,
  TabNavigator,
  StackNavigator
} from "react-navigation";

const Tabs = TabNavigator({
  feed: MainFeed,
  camera: Camera,
  profile: Profile,
  deck: Deck
});

const IntroStack = StackNavigator({
  register: Register,
  login: Login
});

const MainStack = SwitchNavigator({
  intro: IntroStack,
  main: Tabs
});

class InstaClone extends Component {
  render() {
    return <MainStack />;
  }
}

export default InstaClone;
