// @flow
import React, {Component} from 'react';
import {View, Text, StatusBar, TouchableOpacity} from 'react-native';
import s from './styles/style';
import {Font} from 'expo';
import PM from './styles/fonts/PM.ttf';
import MS from './styles/fonts/Montserrat-Light.ttf';

type State = {
  currentTime: number,
  fontLoaded: boolean,
  isStart: boolean,
  m: string,
  s: string,
  ms: string,
};
type Props = {};

class App extends Component<Props, State> {
  state = {
    currentTime: Date.now(),
    fontLoaded: false,
    isStart: false,
    m: '',
    s: '',
    ms: '',
  };

  _timeout: ?mixed = null;

  _loadFont = async () => {
    await Font.loadAsync({
      'permanent-marker': PM,
      montserrat: MS,
    });
    this.setState({fontLoaded: true});
  };

  _updateTime = () => {
    this._timeout = setTimeout(() => this._updateTime(), 30);
    this.setState({
      currentTime: Date.now() - this.state.currentTime,
    });
    console.log(this.state.currentTime);
  };

  _checkCondition = () => {
    let {isStart} = this.state;
    if (isStart) {
      this._updateTime();
    } else if (!isStart) {
      this._stop();
    }
  };

  _start = () => {
    let {isStart} = this.state;
    this.setState({
      isStart: !isStart,
    });
    this._checkCondition();
  };

  _stop = () => {
    clearTimeout(this._timeout);
  };

  componentDidMount() {
    this._loadFont();
  }

  render() {
    let {fontLoaded, m, s, ms} = this.state;

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
