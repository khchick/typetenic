import * as React from "react";
import LinearGradient from "react-native-linear-gradient";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  FlatList,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import Config from "react-native-config";
import axios from 'axios';
import NoteItem from './components/NoteItem';
import { handleChangeNotification } from './../redux/actions/refreshAction';

const { height, width } = Dimensions.get("window");

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
    // show no of notifications in tabbar
  }

  keyExtractor = (item: any, index: any) => {
    item.id.toString(); // The value of key must be a string
  };

  renderRows = ({ item, index }) => (
    <NoteItem item={item} index={index} onPressItem={this.onPressItem} />
  );

  onPressItem = (item: any) => {
    axios
      .put(
        `${Config.API_SERVER}/api/notification/${item}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${this.props.token}`
          }
        }
      )
      .then((res) => {
        this.props.navigator.push({
          title: "Notification Content",
          screen: "NoteContent",
          passProps: {
            noteID: item,
            handleChangeNotification: this.props.handleChangeNotification
          }
        });
      })
      .catch(err => console.log(err));
  };

  countUnreadNotes(data: Array<any>) {
    console.log(data);
    let count = 0;
    data.forEach(note => {
      if (note.read_status == "Unread") {
        count++;
      }
    });
    if (count > 0) {
      return count;
    } else {
      return null;
    }
    
  }

  render() {
    this.props.navigator.setTabBadge({
      // tabIndex: 0, // (optional) if missing, the badge will be added to this screen's tab
      badge: this.countUnreadNotes(this.props.notificationList), // badge value, null to remove badge
      badgeColor: '#006400', // (optional) if missing, the badge will use the default color
    });

    let component;
    let isEmpty =
      <View style={styles.defaultMsgContainer}>
        <Text style={styles.defaultMsg}>
          {"\n"}
          {"\n"}
          {"\n"}
          {"\n"}
          {"\n"}
          You have no notifications at the moment</Text>
      </View>

    if (this.props.notificationList.length < 1) {
      component = isEmpty
    } else {
      component =
        <FlatList
          data={this.props.notificationList}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderRows}
        />
    }

    return (
      <LinearGradient colors={["#9EF8E4", "#30519B"]} style={{ flex: 1 }}>
        <View style={styles.container}>
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
  },
  defaultMsgContainer: {
    flex: 1,
    justifyContent: "center",
    width: width * 0.8
  },
  defaultMsg: {
    fontSize: 16,
    textAlign: "center"
  }
});
