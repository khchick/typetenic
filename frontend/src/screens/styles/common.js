import { StyleSheet } from 'react-native'; 
import {Dimensions} from 'react-native';
 
export const {height, width} = Dimensions.get('window');


export const navigatorStyle = {
    // navBarTranslucent: true, // neccessary for tranparent to work
    // navBarTransparent: true,
    // drawUnderNavBar: true, 
    navBarHidden: false,
    navBarTextColor: 'white',
    navBarBackgroundColor: '#9EF8E4',

};

// for all screens
export const globalStyle = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        fontFamily: 'helvetica',
        letterSpacing: 1.5,
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
    title: {
        fontSize: 20,
        color: '#30519B',
    },
    question: {
        fontSize: 16,
        color: '#30519B',
        marginBottom: 10,
    },
    img: {
        height: 150,
        width: 200,
        marginBottom: 10,
    },

});
  

export const answer = {
    color: '#30519B',
    marginTop: 15,
    marginBottom: 5,
}
  
export const chosenAnswer = {
    fontWeight: '500',
    color: '#ed755a',
    marginTop: 15,
    marginBottom: 5,
}