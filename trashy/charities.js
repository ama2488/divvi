import React, { Component } from 'react'
import { StyleSheet, PanResponder, Animated, Dimensions, View, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import Container from '../container'
import Card from '../card'
import Actions from '../actions'
import Button from '../../common/button'
import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'
import divvicoinArtifacts from '../../../../build/contracts/DivviCoin.json'
import * as actions from '../../../actions'

let web3 = new Web3()
web3.setProvider(new web3.providers.HttpProvider('http://c0a30578.ngrok.io'))

const DivviCoin = contract(divvicoinArtifacts)
DivviCoin.setProvider(web3.currentProvider)
const DC = DivviCoin.deployed()

const { width, height } = Dimensions.get('window')

class XCharities extends Component {
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
      selected = interests.interests.filter((i) => {
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

  onRight = (card) => {
    let div
    if (card.ad) {
    this.props.navigation.navigate('CharityProfile', card)
    } else {
      DC.then((instance) => {
        div = instance
        return div.transfer(card.address, 1, { from: this.props.user })
      })
        .then((res) => {
          this.props.updateCharity(card.id)
          this.props.removeCard(card)
          AsyncStorage.setItem('History', JSON.stringify(this.props.data.history))
          this.forceUpdate()
        })
    }
  }

  onLeft = (card) => {
      this.props.passCard(card)
      this.forceUpdate()
  }

  render () {
    return (
      <View style={styles.container}>
        <Container onTossLeft={card => this.onLeft(card)}
          onTossRight={card => { this.onRight(card) }}
          actionsBar={(toss, onProfile) => <Actions toss={toss}
            onProfile={() => {
              onProfile(this.viewProfile)
            }}/>}>
          {this.props.data.charities.map(card => <Card
            key={card.id}
            id={card.id}
            image={card.image}
            title={card.title}
            subTitle={card.subTitle}
            address={card.address}
            ad={card.ad}
            url={card.url}/>)}
        </Container>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return { data: state.data, user: state.user }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100px',
    color: 'white'
  },
  buttonWhiteText: {
    fontSize: 20,
    color: '#FFF'
  }
})

export default connect(mapStateToProps, actions)(XCharities)
