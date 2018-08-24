import { Navigation } from 'react-native-navigation';

import Login from './screens/Login';
import Signup from './screens/Signup';
import Deck from './screens/Deck'; // home root
import Chat from './screens/Chat';
import Request from './screens/Request';
import User from './screens/User';
import Settings from './screens/Settings';
import Profile from './screens/Profile';

Navigation.registerComponent('LoginScreen', () => Login); 
Navigation.registerComponent('SignupScreen', () => Signup);
Navigation.registerComponent('HomeTabScreen', () => Deck);
Navigation.registerComponent('ChatTabScreen', () => Chat);
Navigation.registerComponent('ReqestTabScreen', () => Request);
Navigation.registerComponent('UserTabScreen', () => User);
Navigation.registerComponent('Settings', () => Settings); 
Navigation.registerComponent('ProfileScreen', () => Profile);

Navigation.startSingleScreenApp({
    screen: {
        screen: 'LoginScreen',
        navigatorStyle: {
            navBarHidden: true, 
        }
    }
})

// ** Moved to LoginScreen **
// Navigation.startTabBasedApp({
//     tabs: [
//     {
//         // label: 'My Deck',
//         screen: 'HomeTabScreen',
//         icon: require('./assets/home.png'),
//         title: 'My Deck'
//     },
//     // {
//     //     // label: 'Match',
//     //     screen: 'ReqestTabScreen',
//     //     icon: require('./assets/deck.png'),
//     //     title: 'Match'
//     // },
//     {
//         // label: 'Request',
//         screen: 'ReqestTabScreen',
//         icon: require('./assets/heart.png'),
//         title: 'Request'
//     },
//     {
//         // label: 'Chat',
//         screen: 'ChatTabScreen',
//         icon: require('./assets/chat.png'),
//         title: 'Chat'
//     },
//     {
//         // label: 'Profile',
//         screen: 'UserTabScreen',
//         icon: require('./assets/user.png'),
//         title: 'Profile'
//     }
//     ],
//     tabsStyle: { 
//     // tabBarButtonColor: '#ffff00', // optional, change the color of the tab icons and text (also unselected). On Android, add this to appStyle
//     tabBarSelectedButtonColor: '#F0957F', // optional, change the color of the selected tab icon and text (only selected). On Android, add this to appStyle
//     // tabBarBackgroundColor: '#551A8B', // optional, change the background color of the tab bar
//     },
// });
