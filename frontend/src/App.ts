import * as React from "react";
import { Navigation } from "react-native-navigation";
import { transparentNav } from "./screens/styles/common";

import Landing from "./screens/Landing";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import SignupCont from "./screens/SignupCont";
import MbtiTest from "./screens/MbtiTest";
import MbtiResult from "./screens/MbtiResult";
import MbtiProfile from "./screens/MbtiProfile";
import Deck from "./screens/Deck"; // home root
import Chat from "./screens/Chat";
import Request from "./screens/Request";
import User from "./screens/User";
import Settings from "./screens/Settings";
import Profile from "./screens/Profile";
import ResetProfile from "./screens/ResetProfile";

import { store } from "./store/store";
import { Provider } from "react-redux";
// import {connect} from 'react-redux';
import { checkToken } from "./actions/authAction";
import { AsyncStorage } from "react-native";

Navigation.registerComponent("LandingScreen", () => Landing, store, Provider);
Navigation.registerComponent("LoginScreen", () => Login, store, Provider);
Navigation.registerComponent("SignupScreen", () => Signup, store, Provider);
Navigation.registerComponent(
  "SignupContScreen",
  () => SignupCont,
  store,
  Provider
);
Navigation.registerComponent("MbtiTestScreen", () => MbtiTest, store, Provider);
Navigation.registerComponent(
  "MbtiResultScreen",
  () => MbtiResult,
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
Navigation.registerComponent("ReqestTabScreen", () => Request, store, Provider);
Navigation.registerComponent("UserTabScreen", () => User, store, Provider);
Navigation.registerComponent("Settings", () => Settings, store, Provider);
Navigation.registerComponent("ProfileScreen", () => Profile, store, Provider);
Navigation.registerComponent(
  "ResetProfile",
  () => ResetProfile,
  store,
  Provider
);

Navigation.startSingleScreenApp({
  screen: {
    screen: "LoginScreen",
    navigatorStyle: {
      navBarHidden: true
    }
  }
});

interface AppProps {
  navigator: Navigator;
  initialApp: () => void;
  loginApp: () => void;
}

class App extends React.Component<AppProps> {
  constructor(props: AppProps) {
    super(props);

    // check login status when re-opening the app
    //     store.dispatch(checkToken()).then(loggedIn => {
    // 		if (loggedIn) {
    // 			App.loginApp();
    // 		} else {
    // 			App.initialApp();
    // 		}
    // 	});
  }

  static initialApp() {
    Navigation.startSingleScreenApp({
      screen: {
        screen: "SignupContScreen",
        navigatorStyle: {
          navBarHidden: true
        }
      }
    });
  }

  static loginApp() {
    Navigation.startTabBasedApp({
      tabs: [
        {
          label: "Request",
          screen: "ReqestTabScreen",
          icon: require("./assets/deck.png"),
          title: "Request",
          navigatorStyle: { transparentNav }
        },
        {
          label: "Lucky Draw",
          screen: "ReqestTabScreen",
          icon: require("./assets/deck.png"),
          title: "Lucky Draw",
          navigatorStyle: { transparentNav }
        },
        {
          label: "Home Deck",
          screen: "HomeTabScreen",
          icon: require("./assets/home.png"),
          title: "My Deck",
          navigatorStyle: { transparentNav }
        },
        {
          label: "Notifications",
          screen: "ChatTabScreen",
          icon: require("./assets/chat.png"),
          title: "Chat",
          navigatorStyle: { transparentNav }
        },
        {
          label: "Control Room",
          screen: "UserTabScreen",
          icon: require("./assets/user.png"),
          title: "Profile",
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

// const MapStateToProps = (state: any) => {
//     return {
//       isLoggedIn: state.authReducer
//     }
//   }

//   const mapDispatchToProps = (dispatch: any) => ({
//     checkAuth: () => dispatch(checkAuth())
//   })

//   const App = connect( mapDispatchToProps)(PureApp);
//   export default App;
