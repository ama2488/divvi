import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { Container, Left, Header as NBHeader, Body, Right, Button, Icon, Title, StyleProvider } from 'native-base'
import getTheme from '../../native-base-theme/components'
import material from '../../native-base-theme/variables/material'
import Expo, {Font} from 'expo'


const Header = (props) => {
  return (
    <StyleProvider style={getTheme(material)}>
    <NBHeader style={{backgroundColor:'#283940'}}>
    <Body>
    <Text style={props.styles && props.styles.header
      ? props.styles.header
      : styles.header}>
      {props.title}
    </Text>
    </Body>
    </NBHeader>
    </StyleProvider>
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 35,
    color: '#FFF',
    alignSelf: 'center',
    fontWeight: '100',
  }
})

export default Header
