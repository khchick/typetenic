// to use in screens:
// import AcceptReq from './components/AcceptReq'
// pass names e.g: <AcceptReq leftButtonName={'LEFT'} onPress={() => {console.log('LEFT')}} />

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


interface AcceptReqProps {
    AcceptReqButtonName: string;
    onPress: (action: any) => any
}

export default class AcceptReq extends React.Component<AcceptReqProps>{
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
    borderWidth: 1,
  },
  topBtnText: {
    color: 'white',
    textAlign: 'center',
  },
});
