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
import ReceivedRowItem from './components/ReceivedRowItem';
import SentRowItem from './components/SentRowItem';
import { handleReceivedReq, handleSentReq } from './../redux/actions/refreshAction';

const { height, width } = Dimensions.get("window");

// List all users, fetch data
interface RequestProps {
  navigator: Navigator;
  token: string;
  handleReceivedReq: () => any;
  handleSentReq: () => any;
  receivedList: Array<any>;
  sentList: Array<any>;
}

interface RequestStates {
  isReceived: boolean
}

class Request extends React.Component<RequestProps, RequestStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      isReceived: true,
    };
  }

  componentDidMount() {
    this.props.handleReceivedReq() // received request to redux
    this.props.handleSentReq() // sent request to redux
  }

  keyExtractor = (item: any, index: any) => {
    item.id.toString(); // The value of key must be a string
  };

  renderRows = ({ item, index }) => (
    <ReceivedRowItem item={item} index={index} onPressItem={this.onPressItem} />
  );

  renderSentRows = ({ item, index }) => (
    <SentRowItem item={item} index={index} onPressItem={this.onPressItem} />
  );

  onPressItem = (item: any) => {
    console.log("Pressed row: " + item);
    this.props.navigator.push({
      screen: 'PublicProfileTabScreen',
      passProps: { targetID: item, token: this.props.token  }
    });
  };

  render() {
    let isEmpty = <Text>You have no requests at the moment</Text>         
    let component = // default to show received request
      <FlatList
        data={this.props.receivedList}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderRows}
      />

    if (this.state.isReceived) {
        if (this.props.receivedList.length < 1) {
          component =  isEmpty
        } else {    
          component = 
            <FlatList
            data={this.props.receivedList}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderRows}
          />           
        }
    } else {
        if (this.props.sentList.length < 1) {
          component =  isEmpty
        } else {    
          component = 
            <FlatList
            data={this.props.sentList}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderSentRows}
          />
        }
    }

    return (
      <LinearGradient colors={["#9EF8E4", "#30519B"]} style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <LeftTopButton
              leftButtonName={"RECEIVED"}
              onPress={() => {
                console.log("press received");  
                    this.setState({
                      isReceived: true
                    })
                    this.props.handleReceivedReq() 

                    this.props.navigator.setTitle({
                      title: 'RECEIVED REQUESTS' // new title 
                    });
                
              }}
            />
            <RightTopButton
              rightButtonName={"SENT"}
              onPress={() => {
                console.log("sent");
                this.setState({
                  isReceived: false
                })             
                this.props.handleSentReq() 
                
                this.props.navigator.setTitle({
                  title: 'SENT REQUESTS' // new title 
                })                  
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
    receivedList: state.refresh.receivedList,
    sentList: state.refresh.sentList
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleSentReq: () => dispatch(handleSentReq()),
    handleReceivedReq: () => dispatch(handleReceivedReq())
  };
};

export default connect(MapStateToProps, mapDispatchToProps)(Request);


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
