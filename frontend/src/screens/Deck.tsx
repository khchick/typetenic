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
        <TouchableOpacity
            style={styles.btnContainer}
            onPress={() =>
              this.props.navigator.switchToTab({
                tabIndex: 0
              })
            }
          >
            <Text style={styles.btnText}>Start discovering</Text>
          </TouchableOpacity>
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
  btnContainer: {
    backgroundColor: "#F0957F",
    marginVertical: 10,
    width: width * 0.5,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center"
  },
});

