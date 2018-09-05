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

const {height, width} = Dimensions.get('window');


interface RightTopButtonProps {
    rightButtonName: string;
    onPress: () => any
}

export default class RightTopButton extends React.Component<RightTopButtonProps>{
  render() {
    return (
    
          <TouchableOpacity style={styles.topButton} onPress={ this.props.onPress }>
            <Text style={styles.topBtnText}>{this.props.rightButtonName}</Text>
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
    borderWidth: 1,
  },
  topBtnText: {
    color: 'white',
    textAlign: 'center',
  },
});
