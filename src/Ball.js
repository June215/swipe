import React from 'react';
import { StyleSheet, View, Animated } from 'react-native';

export default class Ball extends React.Component {
  componentWillMount() {
    this.position = new Animated.ValueXY(0,0);
    Animated.spring(this.position, {
      toValue: { x: 200, y: 500 },
    }).start();
  }

  render() {
    return (
      <Animated.View style={this.position.getLayout()}>
        <View style={styles.ball} />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  ball: {
    height: 120,
    width: 120,
    borderRadius: 60,
    borderWidth: 60,
    borderColor: 'red',
  },
});
