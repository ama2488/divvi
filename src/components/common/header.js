import React from 'react'
import { StyleSheet, Text } from 'react-native'

const Header = (props) => {
  return (
    <Text style={props.styles && props.styles.header
      ? props.styles.header
      : styles.header}>
      {props.text}
    </Text>
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 40,
    color: '#283940',
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 30
  }
})

export default Header
