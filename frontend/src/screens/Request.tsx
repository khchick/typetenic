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
import RowItem from './components/RowItem';

const { height, width } = Dimensions.get("window");

// List all users, fetch data
interface RequestProps {
  navigator: Navigator;
  token: string;
}

interface RequestStates {
  sourceData: any;
}

class Request extends React.Component<RequestProps, RequestStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      sourceData: null
    };
  }

  async componentWillMount() {
    axios
      .get(`${Config.API_SERVER}/api/connection/request/received`, {
        headers: {
          Authorization: "Bearer " + this.props.token
        }
      })
      .then(res => {
        this.setState({
          sourceData: res.data
        });
      })
      .catch(err => console.log(err));
  }

  keyExtractor = (item: any, index: any) => {
    item.id.toString(); // The value of key must be a string
  };

  renderRows = ({ item, index }) => (
    <RowItem item={item} index={index} onPressItem={this.onPressItem} />
  );

  onPressItem = (item: any) => {
    console.log("Pressed row: " + item);
    this.props.navigator.push({
      title: "New Page",
      screen: "LoginScreen", // to target user profile
      passProps: { userId: item.id }
    });
  };

  render() {
    return (
      <LinearGradient colors={["#9EF8E4", "#30519B"]} style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <LeftTopButton
              leftButtonName={"RECEIVED"}
              onPress={() => {
                console.log("received");
                axios
                  .get(`${Config.API_SERVER}/api/connection/request/received`, {
                    headers: {
                      Authorization: "Bearer " + this.props.token
                    }
                  })
                  .then(res => {
                    this.setState({
                      sourceData: res.data
                    });
                    this.props.navigator.setTitle({
                      title: 'RECEIVED REQUESTS' // new title 
                    });
                  })
                  .catch(err => console.log(err));
              }}
            />
            <RightTopButton
              rightButtonName={"SENT"}
              onPress={() => {
                console.log("sent");
                axios
                  .get(`${Config.API_SERVER}/api/connection/request/sent`, {
                    headers: {
                      Authorization: "Bearer " + this.props.token
                    }
                  })
                  .then(res => {
                    this.setState({
                      sourceData: res.data
                    });
                    this.props.navigator.setTitle({
                      title: 'SENT REQUESTS' // new title 
                    });
                  })
                  .catch(err => console.log(err));
              }}
            />
          </View>

          <ScrollView style={styles.listContainer}>
            <FlatList
              data={this.state.sourceData}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderRows}
            />
          </ScrollView>
        </View>
      </LinearGradient>
    );
  }
}

const MapStateToProps = (state: any) => {
  return {
    token: state.auth.token
  };
};

export default connect(MapStateToProps)(Request);

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
