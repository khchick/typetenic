import * as React from "react";
import LinearGradient from "react-native-linear-gradient";
import { transparentNav, globalStyle } from "./styles/common";
import {
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  View,
  Image
} from "react-native";
import FBLoginButton from "./components/FBLoginButton";

const { height, width } = Dimensions.get("window");

interface LandingProps {
  navigator: Navigator;
}

export default class Landing extends React.Component<LandingProps> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <LinearGradient colors={["#9EF8E4", "#30519B"]} style={[{ flex: 1 }]}>
        <View style={globalStyle.container}>
          <View style={styles.card}>
            <Image
              style={styles.logo}
              source={require("../assets/logos/logocircle.png")}
            />

            <Text style={styles.appText}>TYPETENIC</Text>
            <Text style={styles.sloganText}>Where the Right Types Connect</Text>
          </View>

          <FBLoginButton/>

          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() =>
              this.props.navigator.push({
                screen: "LoginScreen",
                navigatorStyle: transparentNav
              })
            }
          >
            <Text style={styles.btnText}>LOGIN WITH EMAIL</Text>
          </TouchableOpacity>

          <Text style={styles.extraText}>
            We do not post anything on facebook. By signing in, you agree with
            our Terms of Service and Privacy Policy
          </Text>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: "#ffa18e",
    paddingHorizontal: 15,
    paddingVertical: 15,
    //marginVertical: 30,
    marginTop: 20,
    width: "65%",
    height: 45,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    borderRadius: 4
  },
  logo: {
    width: 130,
    height: 130,
    resizeMode: 'contain'
  },
  appText: {
    color: "#30519B",
    textAlign: "center",
    fontSize: 40,
    letterSpacing: 3,
    // width: 300,
    marginTop: 20,
    fontFamily: 'NovaRound'
  },
  sloganText: {
    color: "#30519B",
    textAlign: "center",
    fontSize: 18,
    // letterSpacing: 3,
    marginTop: 20,
    fontFamily: 'NovaRound'
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontSize: 14,
    letterSpacing: 1.4,
    fontWeight: "bold"
  },
  extraText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 8,
    marginTop: 80
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "white",
    padding: 20,
    //borderRadius: 15,
    // shadowColor: "#C0C0C0",
    // shadowOffset: { width: 2, height: 2 },
    // shadowOpacity: 0.4,
    // shadowRadius: 6,
    width: width * 0.8, // percent or minus
    height: height * 0.3,
    marginBottom: 80,
    marginTop: 50
  }
});
