// @flow
import React, {Component} from 'react';
import {View, Text, StatusBar, TouchableOpacity} from 'react-native';
import s from './styles/style';
import {Font} from 'expo';
import PM from './styles/fonts/PM.ttf';
import MS from './styles/fonts/Montserrat-Light.ttf';

type State = {
  currentTime: ?any,
  fontLoaded: boolean,
  isStart: boolean,
};
type Props = {};

class App extends Component<Props, State> {
  state = {
    currentTime: Date.now(),
    fontLoaded: false,
    isStart: false,
  };

  _timeout: ?mixed = null;

  _loadFont = async () => {
    await Font.loadAsync({
      'permanent-marker': PM,
      montserrat: MS,
    });
    this.setState({fontLoaded: true});
  };

  _start = () => {
    let {isStart} = this.state;
    this._timeout = setTimeout(
      () => this.setState({currentTime: Date.now() - this.state.currentTime}),
      30,
    );
    console.log(this.state.currentTime);
    this.setState({
      isStart: !isStart,
    });
  };

  _stop = () => {};

  componentDidMount() {
    this._loadFont();
  }

  render() {
    let {fontLoaded} = this.state;

    return (
      <View style={s.container}>
        <StatusBar barStyle="light-content" />
        <View style={s.headContainer}>
          <View style={s.oneFlexed} />
          <View style={[s.oneFlexed, {flex: 1}]}>
            <Text
              style={[
                s.titleText,
                {fontFamily: fontLoaded ? 'montserrat' : null},
              ]}
            >
              {'Stopwatching'}
            </Text>
          </View>
          <View style={s.oneFlexed} />
        </View>
        <View style={s.contentBody}>
          <Text
            style={[
              s.timeStyle,
              {fontFamily: fontLoaded ? 'permanent-marker' : null},
            ]}
          >
            00:00:00
          </Text>
          <TouchableOpacity onPress={this._start}>
            <View style={[s.button, s.buttonCircle, {margin: 10}]}>
              <Text
                style={[
                  s.titleText,
                  {fontSize: 20},
                  {fontFamily: fontLoaded ? 'permanent-marker' : null},
                ]}
              >
                {this.state.isStart ? 'STOP' : 'START'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default App;
