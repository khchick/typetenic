import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  StyleSheet
} from "react-native";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      credentials: {
        login: "",
        password: ""
      }
    };
  }

  updateText(text, field) {
    let credentials = Object.assign(this.state.credentials);
    credentials[field] = text;
    this.setState({
      credentials: newCredentials
    });
  }

  register() {
    //send credentials to server - if signup success
    this.props.navigation.navigate("main");
    //else error message
  }
  render() {
    return (
      <View
        style={{
          height: 100 + "%",
          width: 100 + "%",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgb(193,230,231)"
        }}
      >
        <TextInput
          placeholder="Username"
          style={styles.input}
          onChangeText={text => this.updateText(text, "login")}
        />
        <TextInput
          onChangeText={text => this.updateText(text, "password")}
          SecureTextEntry
          placeholder="Password"
          style={styles.input}
        />
        <Button
          onPress={() => {
            this.register();
          }}
          title="Signup"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: 100 + "%",
    marginHorizontal: 50,
    backgroundColor: "rgb(255,255,255)",
    marginBottom: 10
  }
});
export default Register;
