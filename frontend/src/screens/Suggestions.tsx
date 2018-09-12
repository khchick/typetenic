import * as React from "react";
import LinearGradient from "react-native-linear-gradient";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Alert
} from "react-native";
import axios from "axios";
import Config from "react-native-config";
import { connect } from "react-redux";
import LeftTopButton from "./components/LeftTopButton";
import RightTopButton from "./components/RightTopButton";
import CreateReqRowItem from './components/CreateReqRowItem';
import ConnectRowItem from './components/ConnectRowItem';
import { createSentReq, createConnection } from './../redux/actions/refreshAction';

const { height, width } = Dimensions.get("window");

// List all users, fetch data
interface SuggestionsProps {
  navigator: Navigator;
  token: string;
  createSentReq: () => any;
  createConnection: () => any;
  nonSuggestedList: Array<any>;
  suggestedList: Array<any>;
}

interface RequestStates {
  isDiscover: boolean
}
class Suggestions extends React.Component<SuggestionsProps, RequestStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      isDiscover: true,
    };
  }

  componentDidMount() {
    this.props.createSentReq()
    this.props.createConnection()
  }

  keyExtractor = (item: any, index: any) => {
    item.id.toString(); // The value of key must be a string
  };

  renderCreateReqRows = ({ item, index }) => (
    <CreateReqRowItem item={item} index={index} onPressItem={this.onPressItem} />
  );

  renderConnectRows = ({ item, index }) => (
    <ConnectRowItem item={item} index={index} onPressItem={this.onPressItem} />
  );

  onPressItem = (item: any) => {
    console.log("Pressed row: " + item);
    this.props.navigator.push({
      screen: 'PublicProfileTabScreen',
      passProps: { targetID: item, token: this.props.token  }
    });
  };

  render() {
    // msg if run out of 10 token?

    let component = // default to show discover
        <FlatList
          data={this.props.nonSuggestedList}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderCreateReqRows}
        />
    if (this.state.isDiscover) {
      component = 
        <FlatList
          data={this.props.nonSuggestedList}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderCreateReqRows}
        />
    } else {
      component = 
        <FlatList
          data={this.props.suggestedList}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderConnectRows}
        />
    }

    return (
      <LinearGradient colors={["#9EF8E4", "#30519B"]} style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <LeftTopButton
              leftButtonName={"DISCOVER"}
              onPress={() => {
                this.setState({
                  isDiscover: true
                })
                this.props.createSentReq()

                this.props.navigator.setTitle({
                  title: 'DISCOVER' // new title 
                });
              }}
            />
            <RightTopButton
              rightButtonName={"CARDS"}
              onPress={() => {
                this.setState({
                  isDiscover: false
                })
                this.props.createConnection()

                this.props.navigator.setTitle({
                  title: 'CARDS of the DAY' // new title 
                });
              }}
            />
          </View>

          <ScrollView style={styles.listContainer}>
            {component}
          </ScrollView>
        </View>
      </LinearGradient>
    );
  }
}

const MapStateToProps = (state: any) => {
  return {
    token: state.auth.token,
    suggestedList: state.refresh.suggestedList,
    nonSuggestedList: state.refresh.nonSuggestedList,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    createSentReq: () => dispatch(createSentReq()),
    createConnection: () => dispatch(createConnection())
  };
};

export default connect(MapStateToProps, mapDispatchToProps)(Suggestions);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 6
  },
  listContainer: {
    marginHorizontal: 10,
    marginVertical: 10
  }
});
