import React, { Component } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line
import { View, Animated, PanResponder } from 'react-native';

export default class Ball extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        text: PropTypes.string,
        uri: PropTypes.string
      })
    ),
    renderCard: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.position = new Animated.ValueXY();
    console.log(this.position);
    console.log('x', this.position.x._value);
    console.log('y', this.position.y._value);
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => {
        console.log('PanResponder started');
        return true;
      },
      onPanResponderMove: (event, gesture) => {
        console.log(gesture);
        console.log('dx', gesture.dx);
        console.log('dy', gesture.dy);
        const x = this.position.x._value + gesture.dx;
        const y = this.position.y._value + gesture.dy;
        // Animated.spring(this.position, { toValue: { x, y } }).start();
        // this.position.setValue({ x, y });
        this.position.setValue({ x: gesture.dx, y: gesture.dy });
        console.log('x', this.position.x._value);
        console.log('y', this.position.y._value);
      },
      onPanResponderRelease: () => {
        console.log('PanResponder released');
      }
    });
  }

  renderCards() {
    return this.props.data.map(item => this.props.renderCard(item));
  }

  render() {
    return (
      <Animated.View
        { ...this.panResponder.panHandlers }
        style={ this.position.getLayout() }
      >
        { this.renderCards() }
      </Animated.View>
    );
  }
}
