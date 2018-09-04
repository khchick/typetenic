// to use in screens:
// import TopBar from './components/TopBar'
// pass names e.g: <TopBar leftButtonName={'RECEIVED'} rightButtonName={'SENT'} />

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


interface TopBarProps {
    leftButtonName: string;
    rightButtonName: string;
}

export default class TopBar extends React.Component<TopBarProps>{
  render() {
    return (
    
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.topButton}>
            <Text style={styles.topBtnText}>{this.props.leftButtonName}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.topButton}>
            <Text style={styles.topBtnText}>{this.props.rightButtonName}</Text>
          </TouchableOpacity>
        </View>
        )
    }   
}


const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row', 
    height: 45,   
  },
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
