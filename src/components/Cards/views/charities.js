import React, { Component } from 'react'
import { StyleSheet, PanResponder, Animated, Dimensions, AsyncStorage, Image } from 'react-native'
import { Container, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon, Button } from 'native-base'
import { connect } from 'react-redux'
import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'
import divvicoinArtifacts from '../../../../build/contracts/DivviCoin.json'
import * as actions from '../../../actions'
import Header from '../../common/header'

let web3 = new Web3()
web3.setProvider(new web3.providers.HttpProvider('http://c0a30578.ngrok.io'))
const divviContract = web3.eth.contract(divvicoinArtifacts.abi)
const contractInstance = divviContract.at('0xf8b22d267add336017f7a9c61a8cab4579220188')

const DivviCoin = contract(divvicoinArtifacts)
DivviCoin.setProvider(web3.currentProvider)
const DC = DivviCoin.deployed()

const { width, height } = Dimensions.get('window')

class Charities extends Component {
  state={
    tx: null
  }
  componentWillMount = () => {
    let isAd = this.props.navigation.state.params
    let interests
    let selected
    if (isAd){
        DC.then((instance) => {
          div = instance
          return div.transfer(this.props.user, parseInt(isAd.coins), { from: isAd.address })
        })
          .then((res) => {
            // this.props.updateAd(isAd.id)
            console.log(res)
          })
    }
    // AsyncStorage.getItem('Interests').then((res) => {
    //   console.log(res)
    //   if (res !== {}){
    //   interests = JSON.parse(res)
    //   selected = interests.filter((i) => {
    //     if (i.selected) {
    //       return i
    //     }
    //   }).map((t) => {
    //     return t.label
    //   })
    // }
      // fetch('https://localhost:8080/charities/', {method: 'POST'})
      //   .then((response) => response.json())
      //   .then((responseJson) => {
      //     this.props.getChars(responseJson, selected )
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
    // })
    AsyncStorage.getItem('History').then((res)=>{
      if (res){
        this.props.updateHistory(JSON.parse(res));
      }
    })
  }

  viewProfile = (card) => {
    this.props.navigation.navigate('CharityProfile', card)
  };

  onRight = (card, amount) => {
    let div
    if (card.coins) {
    this.props.navigation.navigate('CharityProfile', card)
    } else {
      let transaction = contractInstance.transfer.getData(card.address, amount)
      // console.log(transaction)
      // DC.then((instance) => {
      //   div = instance
      //   return div.transfer(card.address, amount, { from: this.props.user })
      // })
      //   .then((res) => {
          this.setState({tx: transaction})
          this.props.removeCard(card, `${amount} DIV`)
          // AsyncStorage.setItem('History', JSON.stringify(this.props.data.history))
          setTimeout(()=>{this.forceUpdate();
            console.log(this.state.tx);
            console.log(card.address);
            console.log(card.address.toString('hex'))
          }, 2000)
        // })
    }
  }

  onLeft = (card) => {
      this.props.passCard(card)
  }

  render() {
      return (
        <Container style={{backgroundColor: '#283940'}}>
        <Header title={'DIVVI'}/>
          <View>
            <DeckSwiper
              ref={(c) => this._deckSwiper = c}
              dataSource={this.props.data.charities}
              onSwipeRight={()=>{this.onRight(this.props.data.charities[0], 1)}}
              onSwipeLeft={()=>{this.onLeft(this.props.data.charities[0])}}
              renderItem={(item) =>
                <Card style={{ elevation: 0, height: height, borderColor: '#283940' }}>
                  <CardItem cardBody>
                    <Image style={{ height: 350, flex: 1 }} source={{uri: item.image}} />
                  </CardItem>
                  <CardItem button onPress={()=>{this.viewProfile(item)}}>
                    <Left>
                      <Thumbnail source={{uri:item.image}} />
                      <Body>
                        <Text>{item.name}</Text>
                        {item.location ?
                          <Text note>{item.location}</Text> :
                          <Text note>{`${item.coins} DIV`}</Text>}
                      </Body>
                    </Left>
                  </CardItem>
                </Card>
              }
            />
      </View>
        </Container>
      );
    }
}

const mapStateToProps = state => {
  return { data: state.data, user: state.user }
}

export default connect(mapStateToProps, actions)(Charities)
