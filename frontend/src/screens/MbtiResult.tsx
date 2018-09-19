import * as React from "react";
import LinearGradient from "react-native-linear-gradient";
import { transparentNav, globalStyle } from "./styles/common";
import AvatarImage, { getAvatar } from "./components/AvatarImage";
import {
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  View,
  Image,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import { createMbti } from "../redux/actions/profileAction";
import { RootState } from "../redux/reducers/rootReducer";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface MbtiResultProps {
  navigator: Navigator;
  test1: string;
  test2: string;
  test3: string;
  test4: string;
  onContinue: (
    mbti: string,
    energy: string,
    information: string,
    decision: string,
    lifestyle: string
  ) => any;
}

interface MbtiState {
  energy: string;
  information: string;
  decision: string;
  lifestyle: string;
  mbti: string;
}

let A = "A";
let B = "B";

class PureMbtiResult extends React.Component<MbtiResultProps, MbtiState> {
  constructor(props: any) {
    super(props);
    this.state = {
      energy: "",
      information: "",
      decision: "",
      lifestyle: "",
      mbti: ""
    };
  }

  onContinuePress() {
    this.props.onContinue(
      this.state.mbti,
      this.state.energy,
      this.state.information,
      this.state.decision,
      this.state.lifestyle
    );
    this.props.navigator.push({
      screen: "MbtiProfileScreen",
    });
  }

  // MBTI logic ** setState is asynchronous **
  componentDidMount() {
    this.decideMbti();
  }

  decideMbti() {
    if (this.props.test1 == A) {
      this.setState({ energy: "E" });
    } else if (this.props.test1 == B) {
      this.setState({ energy: "I" });
    }

    if (this.props.test2 == A) {
      this.setState({ information: "S" });
    } else if (this.props.test2 == B) {
      this.setState({ information: "N" });
    }

    if (this.props.test3 == A) {
      this.setState({ decision: "T" });
    } else if (this.props.test3 == B) {
      this.setState({ decision: "F" });
    }

    if (this.props.test4 == A) {
      this.setState({ lifestyle: "J" });
    } else if (this.props.test4 == B) {
      this.setState({ lifestyle: "P" });
    }
  }
  // calling setState() in componentDidUpdate() must be wrapped in a condition
  // otherwise will cause an infinite loop
  componentDidUpdate(prevState: any, prevProps: any) {
    console.log(prevState);
    console.log(prevProps);

    if (this.state.energy !== prevProps.energy) {
      this.setState({
        mbti:
          this.state.energy +
          this.state.information +
          this.state.decision +
          this.state.lifestyle
      });
    } else {
      console.log("nothing updated");
    }
    console.log(this.state); // completed
  }

  render() {
    let avatarImg = getAvatar(this.state.mbti);

    return (
      <LinearGradient colors={["#9EF8E4", "#30519B"]} style={[{ flex: 1 }]}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.title}>
              Congratulations!
              {`\n`}
              You are
              {`\n`}
              </Text>
              <Text style={styles.mbti}>{this.state.mbti}</Text>

            <AvatarImage style={styles.img} source={avatarImg} />

            <TouchableOpacity
              style={styles.btnContainer}
              onPress={() =>
                this.props.navigator.showLightBox({
                  screen: "MbtiInfoLightBox",
                  style: {
                    backgoroundBlur: "light",
                    backgroundColor: "white",
                    tapBackgroundToDismiss: true
                  },
                  passProps: {
                    mbti: this.state.mbti
                  }
                })
              }
            >
              <Text style={styles.btnText}>READ MORE</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnContainer}
              onPress={() => this.onContinuePress()}
            >
              <Text style={styles.btnText}>CONTINUE</Text>
            </TouchableOpacity>
          </View>
        </View>
        </ScrollView>
      </LinearGradient>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    test1: state.test.test1,
    test2: state.test.test2,
    test3: state.test.test3,
    test4: state.test.test4
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onContinue: (
      mbti: string,
      energy: string,
      information: string,
      decision: string,
      lifestyle: string
    ) => dispatch(createMbti(mbti, energy, information, decision, lifestyle))
  };
};

const MbtiResult = connect(
  mapStateToProps,
  mapDispatchToProps
)(PureMbtiResult);
export default MbtiResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: hp('3%'),
    marginBottom: hp('3%'),
    marginHorizontal: wp('10%'),
    paddingVertical: hp('3%'),
    paddingHorizontal: wp('3%'),
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 2, height: -3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    width: wp('85%'),
  },
  title: {
    fontSize: 25,
    color: "#30519B",
    marginBottom: hp('0.5%'),
    fontFamily: 'NovaRound',
    textAlign: 'center'
  },
  mbti: {
    fontFamily: 'YesevaOne-Regular',
    fontSize: 25,
    letterSpacing: 2.5
  },
  img: {
    resizeMode: "contain",
    height: hp('45%'),
    width: wp('40%'),
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginTop: hp('1%')
  },
  btnContainer: {
    backgroundColor: '#F0957F',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 10,
    width: wp('45%'),
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    borderRadius: 4
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 1.5
  }
});
