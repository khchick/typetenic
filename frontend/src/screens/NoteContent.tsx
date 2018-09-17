import * as React from "react";
import { transparentNav, globalStyle } from "./styles/common";
import {
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  View,
  Image,
  ScrollView
} from "react-native";
import Config from "react-native-config";
import axios from "axios";
import { connect } from 'react-redux';
const { height, width } = Dimensions.get("window");

interface NoteContentProps {
  token: string;
  noteID: string;
  handleChangeNotification: () => any;
}

interface NoteContentStates {
  noteContent: string;
}

class NoteContent extends React.Component<NoteContentProps, NoteContentStates> {
  constructor(props: NoteContentProps) {
    super(props);

    this.state = {
      noteContent: ''
    }
  }

  componentDidMount() {
    axios
      .get(`${Config.API_SERVER}/api/notification/${this.props.noteID}`,
        {
          headers: {
            Authorization: "Bearer " + this.props.token
          }
        })
      .then(res => {
        this.props.handleChangeNotification();
        this.setState({
          noteContent: res.data[0].content
        })
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <View style={styles.textContainer}>
        <Text style={styles.textContent}>{this.state.noteContent}</Text>
      </View>
    );
  }
}

const MapStateToProps = (state: any) => {
  return {
    token: state.auth.token
  };
};


export default connect(MapStateToProps)(NoteContent);

const styles = StyleSheet.create({
  textContainer: {
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 40,
  },
  textContent: {
    fontSize: 16,
    color: "#30519B",
    marginBottom: 10,
    textAlign: "justify"
  }
});
