import React, { Component } from 'react'
import { StyleSheet, PanResponder, Animated, Dimensions, AsyncStorage, Image } from 'react-native'
import { Container, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon, Button, Toast } from 'native-base'
import { connect } from 'react-redux'
import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'
import divvicoinArtifacts from '../../../../build/contracts/DivviCoin.json'
import Login from '../../SignIn/login'
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
    tx: null,
    error: false
  }
  componentWillMount = () => {
    let params = this.props.navigation.state.params
    let coins = params ? params.coins : undefined
    let logout = params ? params.logout : undefined
    setTimeout(()=>{console.log(logout, 'LOGOUT\n\n\n\n\n')},3500)
    let interests
    let selected
    if (coins){
        DC.then((instance) => {
          div = instance
          return div.transfer(this.props.user, parseInt(coins), { from: params.address })
        })
          .then((res) => {
            this.refreshBalance()
          })
    }
    if (logout) {
      this.setState({logout:true})
      this.forceUpdate()
    }
    if(this.props.data.charities.length === 0){
      this.props.refreshCharities()
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
    this.setState({balance:this.props.balance})
    AsyncStorage.removeItem('History')
    this.refreshBalance()
    // AsyncStorage.getItem('History').then((res)=>{
    //   if (res){
    //     this.props.updateHistory(JSON.parse(res));
    //   }
    // })
  }

  refreshBalance = () => {
        let self = this
        let div
        DivviCoin.deployed().then((instance) => {
          div = instance
          return div.balanceOf.call(self.props.user)
        }).then(function (value) {
          self.setState({balance: value.valueOf()})
          return div.balanceOfDonations.call(self.props.user)
        })
          .then((bal) => {
            self.setState({ donations: bal.valueOf()})
            self.props.getBalances(this.state.balance, bal.valueOf())
          })
          .catch(function (e) {
            console.log(e)
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
      // let transaction = contractInstance.transfer.getData(card.address, amount)
      // console.log(transaction)
      if (parseInt(this.state.balance) === 0){
        Toast.show({
          text: 'Oops! No mas Divvi Coins.',
          position: 'bottom',
          duration: 3500,
          type: 'warning'
        })
        return
      }
      if (amount > this.state.balance){
        amount = this.state.balance
      }
      DC.then((instance) => {
        div = instance
        return div.transfer(card.address, parseInt(amount), { from: this.props.user })
      })
        .then((res) => {
          // this.setState({tx: transaction})
          this.props.removeCard(card, `${amount} DIV`)
          AsyncStorage.setItem('History', JSON.stringify(this.props.data.history))
          this.refreshBalance()
        })
    }
  }

  onLeft = (card) => {
      this.props.passCard(card)
  }

  render() {
      return (
        <Container style={{backgroundColor: '#283940'}}>
        <Login refreshBalance={()=>{this.refreshBalance()}} isLogout={this.state.logout}/>
        <Header title={'DIVVI'}
        image={'../../images/2.png'}
        balance={`${this.state.balance} DIV`}/>
          <View>
            <DeckSwiper
              ref={(c) => this._deckSwiper = c}
              dataSource={this.props.data.charities}
              onSwipeRight={()=>{this.onRight(this.props.data.charities[0], this.props.donation)}}
              onSwipeLeft={()=>{this.onLeft(this.props.data.charities[0])}}
              looping={true}
              renderItem={(item) =>
                <Card style={{ elevation: 0, height: height, borderColor: '#283940', marginTop:0 }}>
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
  return { data: state.data, user: state.user, donation: state.data.donation, balance:state.balance.balance }
}

export default connect(mapStateToProps, actions)(Charities)
