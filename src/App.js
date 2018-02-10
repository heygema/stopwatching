// @flow
import React, {Component} from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import s from './styles/style';
import {Font, Audio} from 'expo';
import PM from './styles/fonts/PM.ttf';
import MS from './styles/fonts/Montserrat-Light.ttf';
import OSans from './styles/fonts/OpenSans-Regular.ttf';
import uuidv1 from 'uuid/v1';

type State = {
  startTime: number,
  isPaused: boolean,
  currentTime: number,
  fontLoaded: boolean,
  isStart: boolean,
  min: string,
  sec: string,
  milsec: string,
  laps: Array<Object>,
};
type Props = {};

class App extends Component<Props, State> {
  state = {
    startTime: 0,
    currentTime: 0,
    fontLoaded: false,
    isStart: false,
    isPaused: false,
    min: '',
    sec: '',
    milsec: '',
    laps: [],
  };

  _timeout: ?mixed = null;

  _keyExtractor = (item, index) => item.id;

  _handlePlaySoundAsync = async () => {
    await Audio.setIsEnabledAsync(true);
    let sound = new Audio.Sound();
    await sound.loadAsync({
      uri:
        'https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Comfort_Fit_-_03_-_Sorry.mp3',
    });
    await sound.playAsync();
  };

  _loadFont = async () => {
    await Font.loadAsync({
      'permanent-marker': PM,
      montserrat: MS,
      'open-sans': OSans,
    });
    this.setState({fontLoaded: true});
  };

  _setTime = () => {
    this._timeout = setTimeout(() => this._updateTime(), 50);
  };

  _updateTime = () => {
    this.setState(() => {
      return {currentTime: Date.now()};
    });
  };

  _getConcatedTimeFmt = () => {
    let {currentTime, startTime} = this.state;
    let elapsed = currentTime - startTime;
    let t = new Date(elapsed);
    let min = ('0' + t.getMinutes()).slice(-2);
    let sec = ('0' + t.getSeconds()).slice(-2);
    let milsec = ('0' + t.getMilliseconds()).slice(-2);
    let concated = min + ':' + sec + ':' + milsec;
    return concated;
  };

  _checkLap = () => {
    let {laps} = this.state;
    let time = this._getConcatedTimeFmt();
    let id = uuidv1();
    this.setState({
      laps: [
        ...laps,
        {
          id,
          time,
        },
      ],
    });
    console.log(laps);
  };

  _restartLap = () => {
    this.setState({
      laps: [],
    });
  };

  _start = () => {
    console.log('started ....');
    this.setState({
      startTime: Date.now(),
      currentTime: Date.now(),
      isStart: true,
    });
  };

  _pause = () => {
    // TODO: implement pause
    console.log('pause');
    this.setState({
      isStart: false,
      isPaused: true,
      currentTime: Date.now(),
    });
    clearTimeout(this._timeout);
    // this.setState({
    //   isPaused: true,
    // });
    // if (this._timeout != null) {
    //   clearTimeout(this._timeout);
    // }
  };

  _unpause = () => {
    //  TODO: implement unpaused
    console.log('unpause');
    this.setState({
      isPaused: false,
      isStart: true,
    });
    // this._setTime();
  };

  _stop = () => {
    console.log('stop');
    this.setState({
      isStart: false,
      currentTime: Date.now(),
    });
    clearTimeout(this._timeout);
  };

  componentDidMount() {
    // this._handlePlaySoundAsync();
    this._loadFont();
  }

  render() {
    let {currentTime, isStart, isPaused, fontLoaded} = this.state;

    let time = this._getConcatedTimeFmt();

    if (isStart) {
      this._setTime();
    }
    // if (isPaused) {
    //   clearTimeout(this._timeout);
    // }

    return (
      <View style={s.container}>
        <StatusBar barStyle="light-content" />
        <View style={s.headContainer}>
          <View style={s.oneFlexed} />
          <View style={[s.oneFlexed, {flex: 1, alignItems: 'center'}]}>
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
          <View style={{flex: 2, justifyContent: 'flex-end'}}>
            {currentTime > 0 ? (
              <Text
                style={[
                  s.timeStyle,
                  {fontFamily: fontLoaded ? 'open-sans' : null},
                ]}
              >
                {
                  // {min}:{sec}:{milsec}
                  time
                }
              </Text>
            ) : (
              <Text
                style={[
                  s.timeStyle,
                  {fontFamily: fontLoaded ? 'open-sans' : null},
                ]}
              >
                00:00:00
              </Text>
            )}
          </View>
          {
            // view of 3 items for button
          }
          <View style={{flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={isStart ? this._checkLap : this._restartLap}
            >
              <View
                style={[
                  s.button,
                  s.buttonCircle,
                  {margin: 10, backgroundColor: '#333'},
                ]}
              >
                <Text
                  style={[
                    s.titleText,
                    {fontSize: 20},
                    {
                      fontFamily: fontLoaded ? 'permanent-marker' : null,
                    },
                  ]}
                >
                  {isStart ? 'LAP' : 'RESTART'}
                </Text>
              </View>
            </TouchableOpacity>
            {isStart ? (
              <TouchableOpacity onPress={this._stop}>
                <View style={[s.button, s.buttonCircle, {margin: 10}]}>
                  <Text
                    style={[
                      s.titleText,
                      {fontSize: 20},
                      {fontFamily: fontLoaded ? 'permanent-marker' : null},
                    ]}
                  >
                    {isStart ? 'STOP' : 'START'}
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={this._start}>
                <View style={[s.button, s.buttonCircle, {margin: 10}]}>
                  <Text
                    style={[
                      s.titleText,
                      {fontSize: 20},
                      {fontFamily: fontLoaded ? 'permanent-marker' : null},
                    ]}
                  >
                    {isStart ? 'STOP' : 'START'}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={this.state.isPaused ? this._unpause : this._pause}
            >
              <View
                style={[
                  s.button,
                  s.buttonCircle,
                  {margin: 10, backgroundColor: '#ececec'},
                ]}
              >
                <Text
                  style={[
                    s.titleText,
                    {fontSize: 20, color: '#555'},
                    {fontFamily: fontLoaded ? 'permanent-marker' : null},
                  ]}
                >
                  {this.state.isPaused ? 'UNPAUSE' : 'PAUSE'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{justifyContent: 'center', flex: 2, flexDirection: 'column'}}
          >
            <FlatList
              data={this.state.laps}
              renderItem={({item}) => (
                <View>
                  <Text style={{color: '#fff'}}>
                    Lap {this.state.laps.indexOf(item) + 1} : {item.time}
                  </Text>
                </View>
              )}
              keyExtractor={this._keyExtractor}
            />
          </View>
          <Text style={{color: '#fff', fontSize: 15}}>Made in China.</Text>
        </View>
      </View>
    );
  }
}

export default App;
