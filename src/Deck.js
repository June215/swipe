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
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

export default class Deck extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        text: PropTypes.string,
        uri: PropTypes.string
      })
    ),
    renderCard: PropTypes.func.isRequired,
    onSwipeRight: PropTypes.func,
    onSwipeLeft: PropTypes.func
  }

  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {},
    data: []
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   console.log(221, nextProps);
  //   console.log(222, prevState);
  //   return null;
  // }

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
      onPanResponderRelease: (event, gesture) => {
        console.log('PanResponder released');
        console.log(gesture);
        console.log('dx', gesture.dx);
        console.log('dy', gesture.dy);
        if (gesture.dx > SWIPE_THRESHOLD) {
          console.log('swipe right');
          this.forceSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          console.log('swipe left');
          this.forceSwipe('left');
        } else {
          this.resetPosition();
        }
      }
    });
    this.state = { position, index: 0 };
  }

  render() {
    return (
      <View>
        { this.renderCards() }
      </View>
    );
  }

  renderCards() {
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
    });
  }

  resetPosition() {
    Animated.spring(this.state.position, {
      toValue: { x: 0, y: 0 },
    }).start();
  }

  resetPositionNoSpring() {
    this.state.position.setValue({ x: 0, y: 0 });
  }

  onSwipeComplete(direction) {
    const { onSwipeRight, onSwipeLeft, data } = this.props;
    const item = data[this.state.index];
    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
    this.resetPositionNoSpring();
  }

  forceSwipe(direction) {
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(this.state.position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION
    }).start((() => this.onSwipeComplete(direction)));
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
}
