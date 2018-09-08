// to use in screens:
// import RightTopButton from './components/RightTopButton'
// pass names e.g: <RightTopButton leftButtonName={'RIGHT'} onPress={() => {console.log('RIGHT')}} />

import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';

const { height, width } = Dimensions.get('window');


interface RightTopButtonProps {
  rightButtonName: string;
  onPress: () => any
}

export default class RightTopButton extends React.Component<RightTopButtonProps>{
  render() {
    return (

      <TouchableOpacity style={styles.buttonContainer} onPress={this.props.onPress}>
        <Text style={styles.buttonText}>{this.props.rightButtonName}</Text>
      </TouchableOpacity>
    )
  }
}


const styles = StyleSheet.create({
  buttonContainer: {
    width: width * 0.48,
    backgroundColor: '#3B5998',
    //borderColor: 'white',
    //borderWidth: 1,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    justifyContent: 'center',
    marginLeft: 3
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    letterSpacing: 4,
    fontSize: 16,
    fontWeight: "600",
  }
});
