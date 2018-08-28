import { StyleSheet } from 'react-native'; 
import {Dimensions} from 'react-native';
 
export const {height, width} = Dimensions.get('window');

export const transparentNav = {
    navBarTranslucent: true, // neccessary for tranparent to work
    navBarTransparent: true,
    drawUnderNavBar: true, 
    tabBarHidden: true,
};

export const globalStyle = StyleSheet.create({
    // for all screens
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
      },
    // building MBTI profile
    cardContainer: {
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 30,

        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        width: width * 0.85,
        height: height * 0.85,
        marginTop: 40,
    },

})
