import * as React from 'react';
import { View } from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import {connect} from 'react-redux';
import {loginFacebook} from '../../redux/actions/authAction';

// onFBLoginPress: (accessToken: string) => any

class PureFBLoginButton extends React.Component {
  render() {
    return (
      <View>
        <LoginButton
          readPermissions={["public_profile", "email"]} // does not require App Review.
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log("FB login has error: " + result.error);
              } else if (result.isCancelled) {
                console.log("FB login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken()
                .then(
                  (data) => {
                    console.log(data)
                    let accessToken = data.accessToken;
                    this.props.onFBLoginPress(accessToken);
                  }
                )
              }
            }
          }
          onLogoutFinished={() => 
          console.log("logout.")
          }/>
      </View>
    );
  }
};

const MapStateToProps = (state: any) => {
  return {
    isLoggedIn: state.authReducer
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  onFBLoginPress: (accessToken: string) => dispatch(loginFacebook(accessToken))
})

const FBLoginButton = connect(MapStateToProps, mapDispatchToProps)(PureFBLoginButton);
export default FBLoginButton;



// "public_profile" default permissions:
// id
// first_name
// last_name
// middle_name
// name
// name_format
// picture
// short_name