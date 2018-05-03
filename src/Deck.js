import React, { Component } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line
import { View, Animated } from 'react-native';

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

  renderCards() {
    return this.props.data.map(item => this.props.renderCard(item));
  }

  render() {
    return (
      <View>
        { this.renderCards() }
      </View>
    );
  }
}
