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
  min: string,
  sec: string,
  milsec: string,
};
type Props = {};

class App extends Component<Props, State> {
  state = {
    currentTime: 0,
    fontLoaded: false,
    isStart: false,
    min: '',
    sec: '',
    milsec: '',
    result: '',
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
    this._timeout = setTimeout(() => this._updateTime(), 100);
    this.setState((state) => {
      return {currentTime: Date.now() - this.state.currentTime};
    });
    let t = new Date(this.state.currentTime);
    let min = ('0' + t.getMinutes()).slice(-2);
    let sec = ('0' + t.getSeconds()).slice(-2);
    let milsec = ('0' + t.getMilliseconds()).slice(-2);
    let result = min + ':' + sec + ':' + milsec;
    this.setState((state) => {
      return {min, sec, milsec, result};
    });
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
    let {currentTime, fontLoaded, min, sec, milsec, result} = this.state;
    // let formattedTime = min + ':' + sec + ':' + milsec;
    // {currentTime > 0 ? {result} : '00:00:00'}
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
              {fontFamily: fontLoaded ? 'montserrat' : null},
            ]}
          >
            {min}:{sec}:{milsec}
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
