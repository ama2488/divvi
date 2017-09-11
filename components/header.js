import React from 'react';
import {StyleSheet, Text} from 'react-native';

const Header = (props) => {
  return (
    <Text style={props.styles && props.styles.textLabel
      ? props.styles.textLabel
      : styles.textLabel}>
      {props.text}
    </Text>
  );
}

const styles = StyleSheet.create({
  textLabel: {
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: 'Verdana',
    marginBottom: 10,
    color: 'grey'
  }
});

export default Header;
