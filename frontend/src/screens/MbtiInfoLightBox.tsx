import * as React from 'react';
import {transparentNav, globalStyle} from './styles/common';
import {
    StyleSheet, 
    Text, 
    Dimensions,
    TouchableOpacity,
    View,
    Image,
    ScrollView
} from 'react-native';
const {height, width} = Dimensions.get('window');


export default class MbtiInfo extends React.Component {
    render() {
        return (            
            <ScrollView contentContainerStyle={styles.infoBox} >    
                
                <Text style={globalStyle.title}>
                    About MBTI
                </Text>
                <Text style={globalStyle.question}>
                    Personality is just one of many factors that guide our behavior, however. Our actions are also influenced by our environment, our experiences, and our individual goals. On our website, we describe how people belonging to a specific personality type are likely to behave. We outline indicators and tendencies, however, not definitive guidelines or answers. Significant differences can exist even among people who share a personality type. The information on this website is meant to inspire personal growth and an improved understanding of yourself and your relationships – not to be taken as gospel.

                </Text>                
      
            </ScrollView>
        )  
      }
}

const styles = StyleSheet.create({
    infoBox: {
        alignItems: 'center',
        width: width * 0.7,
        height: height * 0.6,
        marginTop: 40,
    },
  });
  