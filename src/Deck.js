import React, { Component } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line
import {
  View,
  Animated,
  PanResponder,
  Dimensions
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

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
    const position = new Animated.ValueXY();
    // console.log(this.position);
    // console.log('x', this.position.x._value);
    // console.log('y', this.position.y._value);
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => {
        console.log('PanResponder started');
        return true;
      },
      onPanResponderMove: (event, gesture) => {
        console.log(gesture);
        console.log('dx', gesture.dx);
        console.log('dy', gesture.dy);
        // const x = this.position.x._value + gesture.dx;
        // const y = this.position.y._value + gesture.dy;
        // Animated.spring(this.position, { toValue: { x, y } }).start();
        // this.position.setValue({ x, y });
        position.setValue({ x: gesture.dx });
        console.log('x', position.x._value);
        console.log('y', position.y._value);
      },
      onPanResponderRelease: () => {
        console.log('PanResponder released');
      }
    });
    this.state = { position };
  }

  getCardStyle() {
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 2, 0, SCREEN_WIDTH * 2],
      outputRange: ['-120deg', '0deg', '120deg']
    });
    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    };
  }

  renderCards() {
    console.log(222);
    return this.props.data.map((item, index) => {
      if (index === 0) {
        return (
          <Animated.View
            { ...this.panResponder.panHandlers }
            style={ this.getCardStyle() }
            key={ item.id }
          >
            { this.props.renderCard(item) }
          </Animated.View>
        );
      }
      return  this.props.renderCard(item);
    })
  }

  render() {
    return (
      <View>
        { this.renderCards() }
      </View>
    );
  }
}
