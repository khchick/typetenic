import * as React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { LoginManager, LoginButton, AccessToken } from "react-native-fbsdk";
import { connect } from "react-redux";
import { loginFacebook } from "../../redux/actions/authAction";

class PureFBLoginButton extends React.Component {
  handleFacebookLogin() {
    LoginManager.logInWithReadPermissions(["public_profile", "email"]).then(
      result => {
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          console.log(
            "Login success with permissions: " +
              result.grantedPermissions.toString()
          );
          AccessToken.getCurrentAccessToken().then(data => {
            console.log(data);
            let accessToken = data.accessToken;
            this.props.onFBLoginPress(accessToken);
          });
        }
      },
      error => {
        console.log("Login fail with error: " + error);
      }
    );
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.btnContainer}
        onPress={() => this.handleFacebookLogin()}
      >
        <Text style={styles.btnText}>LOGIN WITH FACEBOOK</Text>
      </TouchableOpacity>

      // vv built-in button cannot customize style
      // <View>
      //   <LoginButton
      //     readPermissions={["public_profile", "email"]} // does not require App Review.
      //     onLoginFinished={
      //       (error, result) => {
      //         if (error) {
      //           console.log("FB login has error: " + result.error);
      //         } else if (result.isCancelled) {
      //           console.log("FB login is cancelled.");
      //         } else {
      //           AccessToken.getCurrentAccessToken()
      //           .then(
      //             (data) => {
      //               console.log(data)
      //               let accessToken = data.accessToken;
      //               this.props.onFBLoginPress(accessToken);
      //             }
      //           )
      //         }
      //       }
      //     }
      //     onLogoutFinished={() =>
      //     console.log("logout.")
      //     }/>
      // </View>
    );
  }
}

const MapStateToProps = (state: any) => {
  return {
    isLoggedIn: state.authReducer
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  onFBLoginPress: (accessToken: string) => dispatch(loginFacebook(accessToken))
});

const FBLoginButton = connect(
  MapStateToProps,
  mapDispatchToProps
)(PureFBLoginButton);
export default FBLoginButton;

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: "#3B5998",
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
  btnText: {
    color: "white",
    textAlign: "center",
    fontSize: 14,
    letterSpacing: 1.4,
    fontWeight: "bold"
  }
});

// "public_profile" default permissions:
// id
// first_name
// last_name
// middle_name
// name
// name_format
// picture
// short_name
