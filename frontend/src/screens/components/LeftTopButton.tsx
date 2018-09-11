// to use in screens:
// import LeftTopButton from './components/LeftTopButton'
// pass names e.g: <LeftTopButton leftButtonName={'LEFT'} onPress={() => {console.log('LEFT')}} />

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

const {height, width} = Dimensions.get('window');


interface LeftTopButtonProps {
    leftButtonName: string;
    onPress: (action: any) => any
}

export default class LeftTopButton extends React.Component<LeftTopButtonProps>{
  render() {
    return (
    
          <TouchableOpacity style={styles.buttonContainer} onPress={ this.props.onPress } >
            <Text style={styles.buttonText}>{this.props.leftButtonName}</Text>
          </TouchableOpacity>
        )
    }   
}


const styles = StyleSheet.create({
  buttonContainer: {
    width: width * 0.46,
    height: 38,
    backgroundColor: '#3B5998',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    justifyContent: 'center',
    marginRight: 3,
    marginLeft: 3
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    letterSpacing: 6,
    fontSize: 17,
    fontFamily: 'GermaniaOne-Regular'
  }
});
