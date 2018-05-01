import React from 'react';
import { StyleSheet, View } from 'react-native';

export default class Ball extends React.Component {
  render() {
    return (
      <View style={styles.ball} />
    );
  }
}

const styles = StyleSheet.create({
  ball: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 30,
    borderColor: 'grey',
  },
});
