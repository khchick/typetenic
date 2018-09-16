import {
    StyleSheet
} from 'react-native';
import {
    Dimensions
} from 'react-native';

export const {
    height,
    width
} = Dimensions.get('window');

// for all screens
export const globalStyle = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        fontFamily: 'Futura',
        letterSpacing: 2,
    },
    // building MBTI profile
    cardContainer: {
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 2,
            height: -3
        },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        width: width * 0.85,
        // height: height * 0.85,
        marginTop: 15,
        marginBottom: 15
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