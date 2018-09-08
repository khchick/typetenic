import * as React from "react";
import { AsyncStorage } from "react-native";
import { Navigation } from "react-native-navigation";
import { navigatorStyle } from "./screens/styles/common";

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
import PublicProfile from "./screens/PublicProfile";
import PrivateProfile from "./screens/PrivateProfile";
import ResetProfile from "./screens/ResetProfile";
import Suggested from "./screens/Suggestions";

import { store } from "./redux/store";
import { Provider } from "react-redux";
import { loginSuccess } from "./redux/actions/authAction";
import { getUserProfile } from "./redux/actions/profileAction";

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
Navigation.registerComponent("PublicProfileTabScreen", () => PublicProfile, store, Provider);
Navigation.registerComponent("PrivateProfileTabScreen", () => PrivateProfile, store, Provider);
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
        // [CODE REVIEW] check profile, if ok, store profile to redux. if not ok (401), pop to login page 
        store.dispatch(getUserProfile(token))
        // refresh token ?        
        store.dispatch(loginSuccess(token));
        App.loginApp(token); // redirect to home page
      } else {
        App.initialApp();  // if no prev token -> need to login
      }
    });
  }

  static fbAppendProfile() {
    Navigation.startSingleScreenApp({
      screen: {
        screen: "SignupContScreen",
        navigatorStyle: {
          navBarBackgroundColor: '#9EF8E4',
        },
        appStyle: {
          //backButtonImage: require('./')
          hideBackButtonTitle: true,
        }
      }
    });
  }

  static initialApp() {
    Navigation.startSingleScreenApp({
      screen: {
        screen: "LandingScreen",
        navigatorStyle: {
          navBarBackgroundColor: '#9EF8E4',
        },
        appStyle: {
          //backButtonImage: require('./')
          hideBackButtonTitle: true,
        }
      }
    });
  }

  static loginApp(token: string) {
    Navigation.startTabBasedApp({
      tabs: [
        {
          //label: "DISCOVER",
          screen: "SuggestedScreen",
          icon: require("./assets/discover.png"),
          title: "DISCOVER",
          navigatorStyle: {
            navBarTextColor: 'black',
            navBarBackgroundColor: '#9EF8E4',
            navBarTextFontSize: 20
          }
        },
        {
          //label: "REQUESTS",
          screen: "RequestTabScreen",
          icon: require("./assets/requests.png"),
          title: "REQUESTS",
          navigatorStyle: {
            navBarTextColor: 'black',
            navBarBackgroundColor: '#9EF8E4',
            navBarTextFontSize: 20
          }
        },
        {
          //label: "THE DECKS",
          screen: "HomeTabScreen",
          icon: require("./assets/decks.png"),
          title: "THE DECKS",
          navigatorStyle: {
            navBarTextColor: 'black',
            navBarBackgroundColor: '#9EF8E4',
            navBarTextFontSize: 20
          },
          passProps: {
            token: token
          }
        },
        /*
        {
           label: "Notifications",
           screen: "ChatTabScreen",
           icon: require("./assets/chat.png"),
           title: "Chat",
           navigatorStyle: { navigatorStyle }
        },
        */
        {
          //label: "CONTROL ROOM",
          screen: "UserTabScreen",
          icon: require("./assets/controlroom.png"),
          title: "CONTROL ROOM",
          navigatorStyle: {
            navBarTextColor: 'black',
            navBarBackgroundColor: '#9EF8E4',
            navBarTextFontSize: 20
          }
        }
      ],
      tabsStyle: {
        initialTabIndex: 2, // optional, the default selected bottom tab. Default: 0. On Android, add this to appStyle
        // tabBarButtonColor: '#ffff00', // optional, change the color of the tab icons and text (also unselected). On Android, add this to appStyle
        tabBarSelectedButtonColor: "#30519B", // optional, change the color of the selected tab icon and text (only selected). On Android, add this to appStyle
        tabBarBackgroundColor: "white", // optional, change the background color of the tab bar
      },
      appStyle: {
        //backButtonImage: require('./')
        hideBackButtonTitle: true,
      },
    });
  }
}

export default App;
new App();
