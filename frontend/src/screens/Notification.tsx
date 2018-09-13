import * as React from "react";
import LinearGradient from "react-native-linear-gradient";
import {
  StyleSheet,
  View,
  ScrollView,
  FlatList
} from "react-native";
import { connect } from "react-redux";
import NoteItem from './components/NoteItem';
import { handleChangeNotification } from './../redux/actions/refreshAction';

interface NotificationProps {
  navigator: Navigator;
  token: string;
  handleChangeNotification: () => any;
  notificationList: Array<any>;  
}

class Notification extends React.Component<NotificationProps, {}> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    this.props.handleChangeNotification() 
  }

  keyExtractor = (item: any, index: any) => {
    item.id.toString(); // The value of key must be a string
  };

  renderRows = ({ item, index }) => (
    <NoteItem item={item} index={index} onPressItem={this.onPressItem} />
  );

  onPressItem = (item: any) => {
    this.props.navigator.push({
      title: "Notification Content",
      screen: "NoteContent",
      passProps: { noteID: item }
    });
  };

  render() {
    return (
      <LinearGradient colors={["#9EF8E4", "#30519B"]} style={{ flex: 1 }}>
        <View style={styles.container}>
          <ScrollView style={styles.listContainer}>
            <FlatList
              data={this.props.notificationList}
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
    token: state.auth.token,
    notificationList: state.refresh.notificationList,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleChangeNotification: () => dispatch(handleChangeNotification())
  };
};

export default connect(MapStateToProps, mapDispatchToProps)(Notification);

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
