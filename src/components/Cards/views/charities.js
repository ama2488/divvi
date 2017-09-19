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

const DivviCoin = contract(divvicoinArtifacts)
DivviCoin.setProvider(web3.currentProvider)
const DC = DivviCoin.deployed()

const { width, height } = Dimensions.get('window')

class Charities extends Component {
  componentWillMount = () => {
    let isAd = this.props.navigation.state.params
    let interests
    let selected
    if (isAd){
        DC.then((instance) => {
          div = instance
          return div.transfer(this.props.user, parseInt(isAd.ad), { from: isAd.address })
        })
          .then((res) => {
            this.props.updateAd(isAd.id)
          })
    }
    AsyncStorage.getItem('Interests').then((res) => {
      interests = JSON.parse(res)
      selected = interests.filter((i) => {
        if (i.selected) {
          return i
        }
      }).map((t) => {
        return t.label
      })
    })
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
    if (card.ad) {
    this.props.navigation.navigate('CharityProfile', card)
    } else {
      DC.then((instance) => {
        div = instance
        return div.transfer(card.address, amount, { from: this.props.user })
      })
        .then((res) => {
          this.props.removeCard(card, `${amount} DIV`)
          AsyncStorage.setItem('History', JSON.stringify(this.props.data.history))
          setTimeout(()=>{this.forceUpdate()}, 2000)
        })
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
                <Card style={{ elevation: 3, height: height }}>
                  <CardItem cardBody>
                    <Image style={{ height: 350, flex: 1 }} source={{uri: item.image}} />
                  </CardItem>
                  <CardItem button onPress={()=>{this.viewProfile(item)}}>
                    <Left>
                      <Thumbnail source={{uri:item.image}} />
                      <Body>
                        <Text>{item.title}</Text>
                        <Text note>{item.subTitle}</Text>
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
