import * as React from "react";
import { AsyncStorage } from "react-native";
import { Navigation } from "react-native-navigation";
import { transparentNav } from "./screens/styles/common";

import Landing from "./screens/Landing";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import SignupCont from "./screens/SignupCont";
// with redux
import MbtiTest1 from "./screens/MbtiTest1";
import MbtiTest2 from "./screens/MbtiTest2";
import MbtiTest3 from "./screens/MbtiTest3";
import MbtiTest4 from "./screens/MbtiTest4";
// previous
import MbtiTestQ1 from "./screens/MbtiTestQ1";
import MbtiTestQ2 from "./screens/MbtiTestQ2";
import MbtiTestQ3 from "./screens/MbtiTestQ3";
import MbtiTestQ4 from "./screens/MbtiTestQ4";

import MbtiResult from "./screens/MbtiResult";
import MbtiInfoLightBox from "./screens/MbtiInfoLightBox";
import MbtiProfile from "./screens/MbtiProfile";
import Deck from "./screens/Deck"; // home root
import Chat from "./screens/Chat";
import Request from "./screens/Request";
import User from "./screens/User";
import Settings from "./screens/Settings";
import Profile from "./screens/Profile";
import ResetProfile from "./screens/ResetProfile";
import Suggested from "./screens/Suggested";

import { store } from "./redux/store";
import { Provider } from "react-redux";
import { loginSuccess } from "./redux/actions/authAction";

Navigation.registerComponent("LandingScreen", () => Landing, store, Provider);
Navigation.registerComponent("LoginScreen", () => Login, store, Provider);
Navigation.registerComponent("SignupScreen", () => Signup, store, Provider);
Navigation.registerComponent(
  "SignupContScreen",
  () => SignupCont,
  store,
  Provider
);
Navigation.registerComponent(
  "MbtiTest1Screen",
  () => MbtiTest1,
  store,
  Provider
);
Navigation.registerComponent(
  "MbtiTest2Screen",
  () => MbtiTest2,
  store,
  Provider
);
Navigation.registerComponent(
  "MbtiTest3Screen",
  () => MbtiTest3,
  store,
  Provider
);
Navigation.registerComponent(
  "MbtiTest4Screen",
  () => MbtiTest4,
  store,
  Provider
);
Navigation.registerComponent(
  "MbtiResultScreen",
  () => MbtiResult,
  store,
  Provider
);
Navigation.registerComponent(
  "MbtiInfoLightBox",
  () => MbtiInfoLightBox,
  store,
  Provider
);
Navigation.registerComponent(
  "MbtiProfileScreen",
  () => MbtiProfile,
  store,
  Provider
);
Navigation.registerComponent("HomeTabScreen", () => Deck, store, Provider);
Navigation.registerComponent("ChatTabScreen", () => Chat, store, Provider);
Navigation.registerComponent(
  "RequestTabScreen",
  () => Request,
  store,
  Provider
);
Navigation.registerComponent("UserTabScreen", () => User, store, Provider);
Navigation.registerComponent("Settings", () => Settings, store, Provider);
Navigation.registerComponent(
  "SuggestedScreen",
  () => Suggested,
  store,
  Provider
);
Navigation.registerComponent("ProfileScreen", () => Profile, store, Provider);
Navigation.registerComponent(
  "ResetProfile",
  () => ResetProfile,
  store,
  Provider
);
Navigation.registerComponent(
  "MbtiTestQ1Screen",
  () => MbtiTestQ1,
  store,
  Provider
);
Navigation.registerComponent(
  "MbtiTestQ2Screen",
  () => MbtiTestQ2,
  store,
  Provider
);
Navigation.registerComponent(
  "MbtiTestQ3Screen",
  () => MbtiTestQ3,
  store,
  Provider
);
Navigation.registerComponent(
  "MbtiTestQ4Screen",
  () => MbtiTestQ4,
  store,
  Provider
);

class App {
  constructor() {
    // check login status when re-opening the app
    AsyncStorage.getItem("token").then((token: string | null) => {
      if (token) {
        App.loginApp(token);
        store.dispatch(loginSuccess(token));
      } else {
        App.initialApp();
      }
    });
  }

  static fbAppendProfile() {
    Navigation.startSingleScreenApp({
      screen: {
        screen: "SignupContScreen",
        navigatorStyle: {
          navBarHidden: true
        }
      }
    });
  }

  static initialApp() {
    Navigation.startSingleScreenApp({
      screen: {
        screen: "LandingScreen",
        navigatorStyle: {
          navBarHidden: true
        }
      }
    });
  }

  static loginApp(token: string) {
    Navigation.startTabBasedApp({
      tabs: [
        {
          label: "DISCOVER",
          screen: "SuggestedScreen",
          icon: require("./assets/deck.png"),
          title: "DISCOVER",
          navigatorStyle: { transparentNav }
        },
        {
          label: "REQUESTS",
          screen: "RequestTabScreen",
          icon: require("./assets/deck.png"),
          title: "REQUESTS",
          navigatorStyle: { transparentNav }
        },
        {
          label: "THE DECKS",
          screen: "HomeTabScreen",
          icon: require("./assets/home.png"),
          title: "THE DECKS",
          navigatorStyle: { transparentNav },
          passProps: {
            token: token
          }
        /*
        {
           label: "Notifications",
           screen: "ChatTabScreen",
           icon: require("./assets/chat.png"),
           title: "Chat",
           navigatorStyle: { transparentNav }
        },*/
        {
          label: "CONTROL ROOM,
          screen: "UserTabScreen",
          icon: require("./assets/user.png"),
          title: "CONTROL ROOM",
          navigatorStyle: { transparentNav }
        }
      ],
      tabsStyle: {
        initialTabIndex: 2, // optional, the default selected bottom tab. Default: 0. On Android, add this to appStyle
        // tabBarButtonColor: '#ffff00', // optional, change the color of the tab icons and text (also unselected). On Android, add this to appStyle
        tabBarSelectedButtonColor: "#F0957F" // optional, change the color of the selected tab icon and text (only selected). On Android, add this to appStyle
        // tabBarBackgroundColor: '#551A8B', // optional, change the background color of the tab bar
      }
    });
  }
}

export default App;
new App();
