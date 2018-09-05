// import AvatarImage, {getAvatar} from '../components/AvatarImage';
// let mbtiImg = getAvatar(this.props.item.mbti)
//  <AvatarImage style={styles.thumb} source={  mbtiImg } />   

import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
} from 'react-native';


interface AvatarProps {
    source: any;
    style: any;
}

export default class AvatarImage extends React.Component<AvatarProps>{

    render() {
        return (
            <Image
                style={this.props.style}
                source={this.props.source}
            />
        )
    }
}

// set avatar based on MBTI\
export const getAvatar = (mbti: string) => {

    switch (mbti) {

        // Analysts
        case 'INTJ':
            return require('../../assets/16Types/architect.png');

        case 'INTP':
            return require('../../assets/16Types/logician.png');

        case 'ENTJ':
            return require('../../assets/16Types/debater.png');

        case 'ENTP':
            return require('../../assets/16Types/commander.png');

        // Diplomats
        case 'INFJ':
            return require('../../assets/16Types/advocate.png');

        case 'INFP':
            return require('../../assets/16Types/mediator.png');

        case 'ENFJ':
            return require('../../assets/16Types/protagonist.png');

        case 'ENFP':
            return require('../../assets/16Types/campaigner.png');

        // Sentinels
        case 'ISTJ':
            return require('../../assets/16Types/logistician.png');

        case 'ISFJ':
            return require('../../assets/16Types/defender.png');

        case 'ESTJ':
            return require('../../assets/16Types/executive.png');

        case 'ESFJ':
            return require('../../assets/16Types/consul.png');

        // Explorers
        case 'ISFP':
            return require('../../assets/16Types/virtuoso.png');

        case 'ESFP':
            return require('../../assets/16Types/adventurer.png');

        case 'ESTP':
            return require('../../assets/16Types/entrepreneur.png');

        case 'ESFP':
            return require('../../assets/16Types/entertainer.png');

        default:
            console.log('No MBTI found')
    }
}



