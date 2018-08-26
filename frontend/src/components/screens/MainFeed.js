import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";
import config from "../../config";
import { PostFeed } from "../container";

class instaClone extends Component {
  render() {
    return (
      <View style={{ flex: 1, width: 100 + "%", height: 100 + "%" }}>
        <View style={styles.tempNav}>
          <Text>Typetenic </Text>
        </View>
        <PostFeed />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tempNav: {
    width: 100 + "%",
    height: 56,
    marginTop: 20,
    backgroundColor: "rgb(250,250,250)",
    borderBottomColor: "rgb(233,233,233)",
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: "center",
    alignItems: "center"
  }
});

// class Post extends Component {
//   constructor() {
//     super();
//     this.state = {
//       liked: false,
//       screenWidth: Dimensions.get("window").width
//     };
//   }

//   likeToggled() {
//     this.setState({
//       liked: !this.state.liked
//     });
//   }

//   render() {
//     const imageSelection =
//       this.props.item % 2 == 0
//         ? "https://lh3.googleusercontent.com/7woRqPah5LWPc53s6TLPrxI7YKeLZLQR1L2Q0Dv4CUpXUppV0jI-UfxqKvc8gtXRN7T_XZYbUJ_kPPxTjOlaXe_6tFs=s1024"
//         : "https://lh3.googleusercontent.com/_jYZs7Ubugz6c2V9vI7tj3h4bbdYWgSuCyc_CklYRrNKF8Cn5CfE9Jgu0NUXJbi2UvDkCvpvuBFX3cR79jTXp3_Fzg=s1024";
//     let imageUri = imageSelection;

//     const heartIconColor = this.state.liked ? "rgb(255,235,59)" : null;

//     return (
//       <View style={{ flex: 1, width: 100 + "%" }}>
//         <View style={styles.userBar} />
//         <View style={{ flexDirection: "row", alignItems: "center" }}>
//           <Image
//             style={styles.userPic}
//             source={{
//               uri:
//                 "https://lh3.googleusercontent.com/ECEgpwgWtZ0lIgYI2EGtFlXAkYWyP0CzF_4WE1MFTzW-Fw22SJfILe7OkjD8sgaw6gTe9hhON6Ncdw05jYR2Y0ZjRA=s1024"
//             }}
//           />
//           <Text style={{ marginLeft: 10 }}> Sonya</Text>
//           <View style={{ alignItems: "center" }} />
//         </View>
//         <TouchableOpacity
//           activeOpacity={0.7}
//           onPress={() => {
//             this.likeToggled();
//           }}
//         >
//           <Image
//             style={{ width: this.state.screenWidth, height: 400 }}
//             source={{
//               uri: imageUri
//             }}
//           />
//         </TouchableOpacity>
//         <View style={styles.iconBar}>
//           <Image
//             style={[
//               styles.icon,
//               { height: 40, width: 45, tintColor: heartIconColor }
//             ]}
//             source={config.images.heartIcon}
//           />
//           <Text>2000 hearts</Text>
//         </View>
//       </View>
//     );
//   }
// }

export default instaClone;
