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
    
          <TouchableOpacity style={styles.topButton} onPress={ this.props.onPress } >
            <Text style={styles.topBtnText}>{this.props.leftButtonName}</Text>
          </TouchableOpacity>
        )
    }   
}


const styles = StyleSheet.create({
  topButton: {    
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: width * 0.5,
    backgroundColor: '#3B5998',
    borderColor: 'white',
    borderWidth: 1
  },
  topBtnText: {
    color: 'white',
    textAlign: 'center',
    letterSpacing: 4,
    fontSize: 16,
    fontWeight: "600"
  },
});
