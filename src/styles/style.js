import {StyleSheet} from 'react-native';
import {Font} from 'expo';

// type SType : StyleSheet.Styles;

let s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headContainer: {
    flex: 2,
    backgroundColor: '#663399',
    flexDirection: 'row',
  },
  oneFlexed: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 11,
  },
  titleText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    // fontFamily: 'permanent-marker',
  },
  timeStyle: {
    color: '#fff',
    fontSize: 70,
    fontWeight: 'bold',
  },
  contentBody: {
    flex: 17,
    backgroundColor: '#9B59B6',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#F7CA18',
  },
  buttonCircle: {
    borderRadius: 100,
    width: 100,
    height: 100,
    // padding: ,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default s;
