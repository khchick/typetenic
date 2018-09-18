import * as React from "react";
import LinearGradient from "react-native-linear-gradient";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import LeftTopButton from "./components/LeftTopButton";
import RightTopButton from "./components/RightTopButton";
import Card from "./components/Card";
import {
  handleChangeTypeDeck,
  handleChangeTenDeck
} from "./../redux/actions/refreshAction";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { height, width } = Dimensions.get("window");

interface IDeckProps {
  navigator: Navigator;
  token: string;
  userID: number;
  handleChangeTypeDeck: () => any;
  handleChangeTenDeck: () => any;
  typeDeckList: Array<any>;
  tenDeckList: Array<any>;
}

interface IDeckStates {
  deckContent: Array<any>;
  isTypeDeck: boolean;
}

class Deck extends React.Component<IDeckProps, IDeckStates> {
  constructor(props: IDeckProps) {
    super(props);

    this.state = {
      deckContent: [],
      isTypeDeck: true
    };
    this.refreshTypeDeck = this.refreshTypeDeck.bind(this)
  }

  componentDidMount() {
    this.props.handleChangeTypeDeck();
    this.props.handleChangeTenDeck();
  }

  keyExtractor = (item: any, index: any) => {
    item.id.toString();
  };

  renderCards = ({ item, index }) => (
    <Card
      item={item}
      index={index}
      navigator={this.props.navigator}
      refreshTypeDeck={this.refreshTypeDeck.bind(this)}
    />
  );

  refreshTypeDeck() {
    this.props.handleChangeTypeDeck();
    this.props.handleChangeTenDeck();
  }

  render() {
    let component = (
      <FlatList
        data={this.props.typeDeckList}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderCards}
        horizontal={true}
        snapToInterval={width}
        snapToAlignment={"center"}
        decelerationRate={"fast"} // stop scrolling momentum
      />
    )

    // let isEmpty =
    //   <View style={styles.defaultMsgContainer}>
    //     <Text style={styles.defaultMsg}>
    //       {"\n"}
    //       {"\n"}
    //       {"\n"}
    //       {"\n"}
    //       Your deck is empty
    //       {"\n"}
    //       {"\n"}
    //       Go to DISCOVER to connect with other users</Text>
    //   </View>
    let isEmpty =
      <View>
        <Text style={styles.defaultMsg}>
          {"\n"}
          {"\n"}
          {"\n"}
          {"\n"}
          Your deck is empty
          {"\n"}
          {"\n"}
        </Text>
        <View style={styles.buttonsContainer}>
        <TouchableOpacity
            style={styles.btnContainer}
            onPress={() =>
              this.props.navigator.switchToTab({
                tabIndex: 0
              })
            }
          >
            <Text style={styles.btnText}>Start Discovering</Text>
          </TouchableOpacity>
          </View>
      </View>

    if (this.state.isTypeDeck) {
      if (this.props.typeDeckList.length < 1) {
        component = isEmpty
      } else {
        component =
          <FlatList
            data={this.props.typeDeckList}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderCards}
            horizontal={true}
            snapToInterval={width}
            snapToAlignment={"center"}
            decelerationRate={"fast"} // stop scrolling momentum
          />
      }
    } else {
      if (this.props.tenDeckList.length < 1) {
        component = isEmpty
      } else {
        component =
          <FlatList
            data={this.props.tenDeckList}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderCards}
            horizontal={true}
            snapToInterval={width}
            snapToAlignment={"center"}
            decelerationRate={"fast"} // stop scrolling momentum
          />
      }
    }

    return (
      <LinearGradient colors={["#9EF8E4", "#30519B"]} style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.topButtonContainer}>
            <LeftTopButton
              leftButtonName={"MY TYPES"}
              onPress={() => {
                this.props.handleChangeTypeDeck();
                this.setState({
                  isTypeDeck: true
                });
              }}
            />
            <RightTopButton
              rightButtonName={"MY PICKS"}
              onPress={() => {
                this.props.handleChangeTenDeck();
                this.setState({
                  isTypeDeck: false
                });
              }}
            />
          </View>
          <ScrollView
            horizontal={true}
          >{component}
          </ScrollView>

        </View>
      </LinearGradient>
    );
  }
}

const MapStateToProps = (state: any) => {
  return {
    token: state.auth.token,
    userID: state.profile.id,
    typeDeckList: state.refresh.typeDeckList,
    tenDeckList: state.refresh.tenDeckList
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleChangeTypeDeck: () => dispatch(handleChangeTypeDeck()),
    handleChangeTenDeck: () => dispatch(handleChangeTenDeck())
  };
};

export default connect(
  MapStateToProps,
  mapDispatchToProps
)(Deck);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  topButtonContainer: {
    flexDirection: "row"
  },
  defaultMsg: {
    fontSize: 16,
    textAlign: "center"
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'center',
    width: wp('80%'),
    marginHorizontal: wp('10%')
},
  btnContainer: {
    backgroundColor: "#F0957F",
    width: wp('45%'),
    height: hp('6%'),
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
},
  btnText: {
    color: "white",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 1.5
}
});

