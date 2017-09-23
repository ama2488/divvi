import React, { Component } from 'react'
import {
  StyleSheet,
  PanResponder,
  Animated,
  Dimensions,
  View,
  Image,
  ScrollView,
  Modal,
  WebView,
  AsyncStorage
} from 'react-native'
import {connect} from 'react-redux'
import {Container, Content, Card, CardItem, Thumbnail, Text, Icon, Left, Body, Button, Right} from 'native-base'
import Header from '../../common/header'
import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'
import divvicoinArtifacts from '../../../../build/contracts/DivviCoin.json'
import * as actions from '../../../actions'

let web3 = new Web3()
web3.setProvider(new web3.providers.HttpProvider('http://c0a30578.ngrok.io'))
const DivviCoin = contract(divvicoinArtifacts)
DivviCoin.setProvider(web3.currentProvider)

const { width, height } = Dimensions.get('window')

class CharityProfile extends Component {
  state = {
    showAd: false,
    balance: 0
  }
  componentWillMount = () => {
    if (this.props.navigation.state.params.coins){
      this.setState({showAd: true});
      setTimeout(()=>{
        this.setState({showAd:false})
        this.props.removeCard(this.props.navigation.state.params, `${this.props.navigation.state.params.coins} DIV`)
        AsyncStorage.setItem('History', JSON.stringify(this.props.history))
        this.props.navigation.navigate('Charities', this.props.navigation.state.params)
      }, 60000)
    }
    DivviCoin.deployed().then((instance)=>{
      return instance.balanceOf(this.props.navigation.state.params.address, {from: this.props.navigation.state.params.address})
    })
    .then((balance)=>{
      this.setState({balance: balance.valueOf()})
    })
  }
  onBack = () => {
    this.props.navigation.goBack()
  };

  render () {
    return (

      <Container style={{backgroundColor:'#283940'}}>
              <Header title={'Profile'} balance={`${this.props.balance} DIV`}></Header>
              <Content>
                <Card style={{flex: 1}}>
                  <CardItem>
                    <Left>
                    <Image style={styles.image} source={{
                      uri: this.props.navigation.state.params.image
                    }}/>
                      <Body>
                      <Text style={{color:'#557B83', fontSize:25}}>{this.props.navigation.state.params.name}</Text>
                        <Text note>
                          {this.props.navigation.state.params.location}
                        </Text>
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem>
                    <Body>
                      <Text>
                      {this.props.navigation.state.params.bio}
                      </Text>
                    </Body>
                  </CardItem>
                  <CardItem>
                    <Left>
                      <Button transparent textStyle={{color: '#39AEA9'}}>
                        <Icon style={{color: '#3AAFA9'}} name="ios-git-compare" />
                        <Text style={{color: '#3AAFA9', fontSize:15}} >{this.state.balance} DIV</Text>
                        </Button>
                      </Left>
                      <Right>
                      <Button transparent textStyle={{color: '#39AEA9', size:'30'}} onPress={() => {
                        this.onBack()}}>
                      <Text style={{color: '#3AAFA9', fontSize:15}} >Back</Text>
                      </Button>
                    </Right>
                  </CardItem>
                </Card>
                </Content>
                <Modal onComplete={()=>{this.onComplete()}} animationType='none'
                transparent={false}
                visible={this.state.showAd}>
                <WebView
              source={{uri:this.props.navigation.state.params.video}}
              style={{height: height, width: width}}
              mediaPlaybackRequiresUserAction={false}
              allowsInlineMediaPlayback={true}
              bounces={false}
              />
                </Modal>
              </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {history: state.data.history, balance: state.balance.balance}
}

export default connect(mapStateToProps, actions)(CharityProfile)

const styles = StyleSheet.create({
  label: {
    fontSize: 20,
    margin: 10,
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 75,
  }
})
