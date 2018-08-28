import * as React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {transparentNav, globalStyle} from './styles/common';
import {
    StyleSheet, 
    Text, 
    TextInput,
    TouchableOpacity,
    StatusBar,
    View,
    KeyboardAvoidingView,
    Alert
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-datepicker'

interface SignupProps {
    navigator: Navigator
}

interface SignupStates {
  name: string,
  date: string,
  gender: string,
  orientation: string,
  location: string,
  items: any,
  items2: any,
  items3: any,
}

export default class SignupCont extends React.Component<SignupProps, SignupStates> {
  constructor(props: SignupProps) {
    super(props);

    this.state = {
      name: '', 
      date: '21-09-2018',
      gender: '',
      items: [
          {
              label: 'Male',
              value: 'M',
          },
          {
              label: 'Female',
              value: 'F',
          },          
      ],
      orientation: '',
      items2: [
          {
              label: 'Male',
              value: 'Male',
          },
          {
              label: 'Female',
              value: 'Female',
          },
          {
              label: 'Any',
              value: 'Any',
          },
      ],
      location: '',
      items3: [ // import country list
          {
              label: 'Hong Kong',
              value: 'Hong Kong',
          },
          {
              label: 'Singapore',
              value: 'Singapore',
          },
          {
              label: 'Taiwan',
              value: 'Taiwan',
          },
      ],
    };
  }



  onSignupPress() {
    console.log(this.state)
  }

  render() {
    return (
      <LinearGradient colors={['#9EF8E4', '#30519B']} style={[{flex: 1}]}>
      <View style={styles.container}>
          {/* upload photo */}
        
        <Text>Display Name</Text>
        <TextInput placeholder='Display Name'
          onChangeText={ (val) => this.setState({name: val}) } 
          placeholderTextColor='#fff'
          returnKeyType='next'
          style={styles.input}
        />

        <Text>Date of Birth</Text>
          <DatePicker
              style={{width: 200, backgroundColor: 'white'}}
              date={this.state.date}
              mode="date"
              placeholder="Select date"
              format="DD-MM-YYYY"
              minDate="01-01-1918"
              maxDate="31-12-2020"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={false}
              // customStyles={{              
              //   dateInput: {
              //     marginLeft: 36
              //   }
              // }}
              onDateChange={(date: any) => {
                this.setState({date: date})}
              }
          />

        <Text>Gender</Text>
          <RNPickerSelect
            placeholder={{
                label: 'Select Gender',
            }}
            items={this.state.items}
            onValueChange={(val: string) => {
                this.setState({gender: val});
            }}
            value={this.state.gender}          
            style={{ ...pickerSelectStyles }}
          />

        <Text>Interest in</Text> 
          <RNPickerSelect
            placeholder={{
                label: 'Select interest',
            }}
            items={this.state.items2}
            onValueChange={(val: string) => {
                this.setState({orientation: val});
            }}
            value={this.state.orientation}          
            style={{ ...pickerSelectStyles }}
          />

        <Text>Location</Text>
          <RNPickerSelect
            placeholder={{
                label: 'Select location',
            }}
            items={this.state.items3}
            onValueChange={(val: string) => {
                this.setState({location: val});
            }}
            value={this.state.location}          
            style={{ ...pickerSelectStyles }}
          />


            
        <TouchableOpacity style={styles.btnContainer} 
         onPress={() => this.props.navigator.showModal({
            screen: 'MbtiTestScreen',
            navigatorStyle: transparentNav,
        })}>
          <Text style={styles.btnText}>Start MBTI Test</Text>
        </TouchableOpacity>

      </View>
      </LinearGradient>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  welcome: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 50,
  },
  btnContainer: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginVertical: 15,
    width: '40%',
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    color: '#fff',
    marginBottom: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 25,
    width: '85%'
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
      fontSize: 16,
      paddingTop: 13,
      paddingHorizontal: 10,
      paddingBottom: 12,
      // borderWidth: 1,
      // borderColor: 'gray',
      borderRadius: 4,
      backgroundColor: 'white',
      color: 'black',
  },
});