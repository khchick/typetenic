import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Config from 'react-native-config';
import io from 'socket.io-client/dist/socket.io';
import axios from 'axios';
import { GiftedChat, Bubble, SystemMessage } from 'react-native-gifted-chat';

const socketUrl = 'http://localhost.com:8080'
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Mjd9.55tl9fToUKG32_Yh1fB0Cqwjy4kPETaK4dSb3N_3v7k';
const userID = 27;
const conversationID = 1;
const targetID = 28;

export default class Example extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            loadEarlier: true,
            typingText: null,
            isLoadingEarlier: false,
        };

        this.socket = io('localhost:8080', { jsonp: false });

        this.socket.on('broadcast message', (msg: any) => {
            console.log('broadcast message activated');
            this.onReceive(msg);
        })

        this._isMounted = false;
        this.onSend = this.onSend.bind(this);
        this.onReceive = this.onReceive.bind(this);
        this.renderBubble = this.renderBubble.bind(this);
        this.renderSystemMessage = this.renderSystemMessage.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        // this.onLoadEarlier = this.onLoadEarlier.bind(this);

        this._isAlright = null;
    }

    componentWillMount() {
        this.initSocket();
        this._isMounted = true;
        this.socket.on('list messages', () => {
            console.log('list messages activated');
            let self = this;
            axios.get(`${Config.API_SERVER}/api/chat/messages/${conversationID}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
                .then(function (res) {
                    console.log(res.data);
                    self.setState({
                        messages: res.data
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    onSend(messages = []) {
        this.socket.emit('message sent', messages);
        axios.post(`${Config.API_SERVER}/api/chat/messages/${conversationID}/${targetID}`, {
            "content": messages[0].text
        }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            .then(() => {
                this.setState(previousState => ({
                    messages: GiftedChat.append(previousState.messages, messages),
                }))
            });
    }

    onReceive(incomingMessage) {
        this.setState((previousState) => {
            return {
                messages: GiftedChat.append(previousState.messages, incomingMessage
                )
            };
        });
    }

    //   onReceive(text) {
    //     this.setState((previousState) => {
    //       return {
    //         messages: GiftedChat.append(previousState.messages, {
    //           _id: Math.round(Math.random() * 1000000),
    //           text: text,
    //           createdAt: new Date(),
    //           user: {
    //             _id: 2,
    //             name: 'React Native',
    //             // avatar: 'https://facebook.github.io/react/img/logo_og.png',
    //           },
    //         }),
    //       };
    //     });
    //   }

    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: '#f0f0f0',
                    }
                }}
            />
        );
    }

    renderSystemMessage(props) {
        return (
            <SystemMessage
                {...props}
                containerStyle={{
                    marginBottom: 15,
                }}
                textStyle={{
                    fontSize: 14,
                }}
            />
        );
    }

    renderFooter(props) {
        if (this.state.typingText) {
            return (
                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>
                        {this.state.typingText}
                    </Text>
                </View>
            );
        }
        return null;
    }

    render() {
        return (
                <GiftedChat
                messages={this.state.messages}
                onSend={this.onSend}
                loadEarlier={this.state.loadEarlier}
                onLoadEarlier={this.onLoadEarlier}
                isLoadingEarlier={this.state.isLoadingEarlier}

                user={{
                    _id: userID, // sent messages should have same user._id
                }}

                renderBubble={this.renderBubble}
                renderSystemMessage={this.renderSystemMessage}
                renderFooter={this.renderFooter}
            />
        );
    }

    initSocket = () => {
        const socket = io(socketUrl)
        socket.on('connect', () => {
            console.log("Connected");
        })
        this.setState({ socket })
    }

        // answerDemo(messages) {
    //     if (messages.length > 0) {
    //         if ((messages[0].image || messages[0].location) || !this._isAlright) {
    //             this.setState((previousState) => {
    //                 return {
    //                     typingText: 'React Native is typing'
    //                 };
    //             });
    //         }
    //     }

    //     setTimeout(() => {
    //         if (this._isMounted === true) {
    //             if (messages.length > 0) {
    //                 if (messages[0].image) {
    //                     this.onReceive('Nice picture!');
    //                 } else if (messages[0].location) {
    //                     this.onReceive('My favorite place');
    //                 } else {
    //                     if (!this._isAlright) {
    //                         this._isAlright = true;
    //                         this.onReceive('Alright');
    //                     }
    //                 }
    //             }
    //         }

    //         this.setState((previousState) => {
    //             return {
    //                 typingText: null,
    //             };
    //         });
    //     }, 1000);
    // }


    // onLoadEarlier() {
    //     this.setState((previousState) => {
    //         return {
    //             isLoadingEarlier: true,
    //         };
    //     });

    //     setTimeout(() => {
    //         if (this._isMounted === true) {
    //             this.setState((previousState) => {
    //                 return {
    //                     messages: GiftedChat.prepend(previousState.messages, require('./data/old_messages.js')),
    //                     loadEarlier: false,
    //                     isLoadingEarlier: false,
    //                 };
    //             });
    //         }
    //     }, 1000); // simulating network
    // }
}

const styles = StyleSheet.create({
    footerContainer: {
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
    },
    footerText: {
        fontSize: 14,
        color: '#aaa',
    },
});