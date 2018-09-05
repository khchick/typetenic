// import RowButton from './components/RowButton'
// pass button name, button style, and onPress method 
{/* <RowButton 
btnName={'LIKE'}
style={styles.likeBtn} 
onPress={() => {}}/> */}

import * as React from 'react';
import {
    StyleSheet, 
    Text, 
    Dimensions,
    TouchableOpacity,

} from 'react-native';

const {height, width} = Dimensions.get('window');


interface RowButtonProps {
    btnName: string;
    onPress: (action: any) => any;
    style: any;
}

export default class RowButton extends React.Component<RowButtonProps>{
  render() {
    return (
    
        <TouchableOpacity
          style={this.props.style}
          onPress={() => this.props.onPress}
         >
            <Text style={styles.btnText}>
              {this.props.btnName}
            </Text>

        </TouchableOpacity>        
        )
    }   
}

const styles = StyleSheet.create({
  // likeBtn: {
  //   backgroundColor: "#ffa18e",
  //   paddingHorizontal: 15,
  //   paddingVertical: 5,
  //   marginVertical: 5,
  //   shadowColor: "#000",
  //   shadowOffset: { width: 2, height: 2 },
  //   shadowOpacity: 0.4,
  //   shadowRadius: 6,
  //   margin: 10
  // },
  // passBtn: {
  //   backgroundColor: "#3B5998",
  //   paddingHorizontal: 15,
  //   paddingVertical: 5,
  //   marginVertical: 5,
  //   shadowColor: "#000",
  //   shadowOffset: { width: 2, height: 2 },
  //   shadowOpacity: 0.4,
  //   shadowRadius: 6,
  //   margin: 10
  // },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 1.5
  }
});



