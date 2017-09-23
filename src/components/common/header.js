import React from 'react'
import { StyleSheet, Text, Image } from 'react-native'
import { Container, Left, Header as NBHeader, Body, Right, Button, Icon, Title, StyleProvider } from 'native-base'
import getTheme from '../../native-base-theme/components'
import material from '../../native-base-theme/variables/material'
import Expo, {Font} from 'expo'


const Header = (props) => {
  return (
    <StyleProvider style={getTheme(material)}>
    <NBHeader style={{backgroundColor:'#283940'}}>
    {props.onLogout ? <Left></Left> : null }
    {props.image ?
    <Body>
    <Image source={require('../../images/1.png')} style={{flex: 1, height:35, width:70, alignSelf:'center'}}/>
    <Text style={{fontSize:15, color: '#E5EFC1', alignSelf:'center', fontWeight: '100', backgroundColor:'transparent'}}>
    {props.balance}
    </Text>
    </Body> :
    <Body>
    <Text style={props.styles && props.styles.header
      ? props.styles.header
      : styles.header}>
      {props.title}
    </Text>
    <Text style={{fontSize:15, color: '#E5EFC1', alignSelf:'center', fontWeight: '100', backgroundColor:'transparent'}}>
    {props.balance}
    </Text>
  </Body>}

    {props.onLogout ?
      <Button transparent onPress={() => {props.onLogout()}} style={{paddingBottom:20, paddingLeft:15}}>
      <Icon name="ios-log-out-outline" style={{color: '#FFF', fontSize:30, marginRight:0, marginLeft:30, fontWeight:'100'}}/>
      </Button>
       : null}
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
    backgroundColor: 'transparent'
  }
})

export default Header
