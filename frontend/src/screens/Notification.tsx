import * as React from "react";
import LinearGradient from "react-native-linear-gradient";
import {
  StyleSheet,
  View,
  ScrollView,
  FlatList
} from "react-native";
import axios from "axios";
import Config from "react-native-config";
import { connect } from "react-redux";
import NoteItem from './components/NoteItem';

interface NotificationProps {
  navigator: Navigator;
  token: string;
}

interface NotificationStates {
  sourceData: any;
}

class Notification extends React.Component<NotificationProps, NotificationStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      sourceData: null
    };
  }

  async componentWillMount() {
    axios
      .get(`${Config.API_SERVER}/api/notification/all`, {
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
    <NoteItem item={item} index={index} onPressItem={this.onPressItem} />
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

export default connect(MapStateToProps)(Notification);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  listContainer: {
    marginHorizontal: 10,
    marginVertical: 10
  }
});
