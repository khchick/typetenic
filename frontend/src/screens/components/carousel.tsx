import Carousel from 'react-native-snap-carousel';
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

export default class myCarousel extends React.Component {

    _renderItem ({item, index}) {
        return (
            <View style={styles.slide}>
                <Text style={styles.title}>{ item.title }</Text>
            </View>
        );
    }

    render () {
        return (
            <Carousel
              ref={(c) => { this._carousel = c; }}
              data={this.state.entries}
              renderItem={this._renderItem}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
            />
        );
    }
}