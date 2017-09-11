import Animator from './animator';
import React, {Component} from 'react';
import {
  StyleSheet,
  PanResponder,
  Animated,
  Dimensions,
  View,
  Text
} from 'react-native';

const {width, height} = Dimensions.get('window');

export default class Container extends Component {
  constructor({children}) {
    super();
    this.state = {
      stack: children
    };
  }

  onToss(callback) {
    let stack = [...this.state.stack];
    this.setState({
      stack: stack.filter((item, index) => index !== stack.length - 1),
      toss: false
    }, callback)
  }

  componentWillReceiveProps({children}) {
    if (children !== this.props.children)
      this.setState({stack: children});
    }

  render() {
    let {stack, toss} = this.state;
    let {onTossLeft, onTossRight, actionsBar, onProfile, firstChild} = this.props;
    const actionBar = actionsBar(toss => {
      this.setState({toss})
    }, (callback) => {
      React.Children.forEach(stack, (child, index) => {
        if (index === stack.length - 1) {
          callback(child.props);
        }
      });
    });

    return (
      <View style={{
        flex: 1
      }}>
        {React.Children.map(stack, (child, index) => (
          <Animator toss={index === stack.length - 1
            ? toss
            : false} onTossRight={() => this.onToss(() => onTossRight(child.props))} onTossLeft={() => this.onToss(() => onTossLeft(child.props))}>
            {child}
          </Animator>
        ))}
        {actionBar}
      </View>
    )
  }
}
