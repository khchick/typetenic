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
  counter: string;
  onPress: () => any
}

export default class RightTopButton extends React.Component<RightTopButtonProps>{
  render() {
    return (

      <TouchableOpacity style={styles.buttonContainer} onPress={this.props.onPress}>
        <Text style={styles.buttonText}>
          {this.props.rightButtonName}
        </Text>
        <Text style={styles.counterText}>
          {this.props.counter}
        </Text>
      </TouchableOpacity>
    )
  }
}


const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    width: width * 0.46,
    height: 38,
    backgroundColor: '#3B5998',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 3,
    marginRight: 3
  },
  buttonText: {
    color: 'white',
    // textAlign: 'center',
    letterSpacing: 6,
    fontSize: 17,
    fontFamily: 'GermaniaOne-Regular'
  },
  counterText: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'GermaniaOne-Regular'
  }
});
