import React, { Component } from 'react'
import {
  StyleSheet,
  PanResponder,
  Animated,
  Dimensions,
  View,
  Image,
  Slider,
  AsyncStorage,
  Alert
} from 'react-native'
import { Container, Content, Card, CardItem, Text, Icon, Right, Thumbnail, Left, Body, Tab, Tabs, TabHeading, StyleProvider, Button } from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid';
import { connect } from 'react-redux'
import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'
import divvicoinArtifacts from '../../../../build/contracts/DivviCoin.json'
import Header from '../../common/header'
import getTheme from '../../../native-base-theme/components'
import material from '../../../native-base-theme/variables/material'
import Expo, {Font} from 'expo'
import * as actions from '../../../actions'
import History from './history'

const { width, height } = Dimensions.get('window')

let web3 = new Web3()
web3.setProvider(new web3.providers.HttpProvider('http://c0a30578.ngrok.io'))
const DivviCoin = contract(divvicoinArtifacts)
DivviCoin.setProvider(web3.currentProvider)

class Account extends Component {
  constructor () {
    super()
    this.state = {
      owner: null
    }
  };

componentWillMount = () => {
  AsyncStorage.getItem('Donation').then((don)=>{
      if (don !== null && don !== {}){
        this.setState({donation: JSON.parse(don)})
        this.props.updateDonation(JSON.parse(don))
      } else {
        this.setState({donation: this.props.donation})
      }
    })
}

  updateDonation(direction, val){
    let don;
    if (direction) {
      val ? don = parseInt(this.state.donation) + val :
        don = parseInt(this.state.donation) + 1
  } else {
    val ? don = parseInt(this.state.donation) - val :
      don = parseInt(this.state.donation) - 1
  }
  if (don > this.props.balance) {
    don = JSON.parse(JSON.stringify(this.props.balance))
  }
  if (don < 1){
    don = 1
  }
  else {
    this.setState({donation:don})
    this.props.updateDonation(don)
    AsyncStorage.setItem('Donation', JSON.stringify(don))
  }
  }

  onLogout = () => {
  Alert.alert(
  'Log Out',
  'Are you sure you want to log out?',
  [{text: 'Yes', onPress: () => this.props.navigation.navigate('Charities', {logout:true})},
    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},])
  }

  render () {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#283940',
      }}>
      <Header title={'Account'} balance={`${this.props.balance} DIV`} onLogout={()=>{this.onLogout()}}/>
        <StyleProvider style={getTheme(material)}>
      <Tabs>
          <Tab heading={ <TabHeading><Icon name="ios-analytics-outline" /><Text>Overview</Text></TabHeading>}>
          <Grid>
          <Row style={{backgroundColor:'#A2D5AC', borderWidth:0}}>
          <Col style={styles.center}>
          <Text style={{color: 'white'}}> Current Balance</Text>
          <Text style={{color: 'white', fontSize:35}}> {this.props.balance} DIV</Text>
          </Col>
          <Col style={styles.center}>
          <Text>
          <Icon
          name= {'ios-cash-outline'}
          style={{height:400, width:400, color: '#FFF', fontSize:80}}/>
          </Text>
          </Col>
          </Row>
          <Row style={{backgroundColor:'#3AAFA9', borderWidth:1, borderColor: '#3AAFA9'}}>
          <Col style={styles.center}>
          <Text>
          <Icon
          name= {'ios-globe-outline'}
          style={{height:400, width:400, color: '#FFF', fontSize:80}}/>
          </Text>
          </Col>
          <Col style={styles.center}>
          <Text style={{color: 'white'}}> Total Donations</Text>
          <Text style={{color: 'white', fontSize:35}}> {this.props.donations} DIV</Text>
          </Col>
          </Row>
          <Row style={{backgroundColor:'#557C83', alignItems:'center', justifyContent:'center'}}>
          <Col size={1} style={styles.center}>
          <Text>
          <Icon onPress={()=>{this.updateDonation()}}
          onLongPress={()=>{this.updateDonation(false, 5)}}
          suppressHighlighting={true}
          name= {'ios-arrow-down-outline'}
          style={{height:300, width:300, color: '#FFF', fontSize: 35}}/>
          </Text>
          </Col>
          <Col style={styles.center} size={2}>
          <Text style={{color: 'white'}}> Donation Amount</Text>
          <Text style={{color: 'white', fontSize:35}}> {this.state.donation} DIV</Text>
          </Col>
          <Col size={1} style={styles.center}>
          <Text>
          <Icon onPress={()=>{this.updateDonation(true)}}
          onLongPress={()=>{this.updateDonation(true, 5)}}
          suppressHighlighting={true}
          name= {'ios-arrow-up-outline'}
          style={{height:300, width:300, color: '#FFF', fontSize:35}}/>
          </Text>
          </Col>
          </Row>
          </Grid>
          </Tab>
          <Tab style={{backgroundColor:'#283940'}} heading={ <TabHeading><Icon name="ios-time-outline" /><Text>History</Text></TabHeading>}>
          <Container>
          <Content>
          <History/>
     </Content>
        </Container>
          </Tab>
        </Tabs>
          </StyleProvider>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return { user: state.user, history: state.data.history, donation: state.data.donation, donations: state.balance.donations, balance:state.balance.balance}
}

export default connect(mapStateToProps, actions)(Account)

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  }
})
