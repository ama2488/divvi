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
web3.setProvider(new web3.providers.HttpProvider('http://5516f622.ngrok.io'))

const DivviCoin = contract(divvicoinArtifacts)
DivviCoin.setProvider(web3.currentProvider)
const DC = DivviCoin.deployed()

const { width, height } = Dimensions.get('window')
const owner = '0xabbddb3a442be91007ecbb06abeccf55ee414cf6'
class Charities extends Component {
  componentWillMount = () => {
    console.log(this.props)
    let interests
    let selected
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
  }

  viewProfile = (card) => {
    this.props.navigation.navigate('CharityProfile', card)
  };

  onRight = (card) => {
    let div
    if (card.ad) {
      DC.then((instance) => {
        div = instance
        return div.transfer(this.props.user, parseInt(card.ad), { from: card.address })
      })
        .then((res) => {
          this.props.updateBalance(parseInt(card.ad), 'decrease')
        })
    } else {
      DC.then((instance) => {
        div = instance
        return div.transfer(card.address, 1, { from: this.props.user })
      })
        .then((res) => {
          this.props.updateDonation(1, 'increase')
        })
    }
  }

  onLeft = (card) => {

  }

  render () {
    return (
      <View style={styles.container}>
        <Container onTossLeft={card => console.log(card, 'tossed left')}
          onTossRight={card => { this.onRight(card) }}
          actionsBar={(toss, onProfile) => <Actions toss={toss}
            onProfile={() => {
              onProfile(this.viewProfile)
            }}/>}>
          {this.props.data.map(card => <Card
            key={card.id}
            image={card.image}
            title={card.title}
            subTitle={card.subTitle}
            address={card.address}
            ad={card.ad}/>)}
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
    backgroundColor: '#84E1BF',
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

export default connect(mapStateToProps, actions)(Charities)
