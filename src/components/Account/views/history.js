import React, { Component } from 'react'
import { Image, View, Share } from 'react-native'
import { Container, Content, Card, CardItem, Text, Icon, Right, Thumbnail, Left, Body, Tab, Tabs, TabHeading, StyleProvider, Button } from 'native-base'
import { connect } from 'react-redux'
import Moment from 'moment'
Moment.locale('en')
class History extends Component {
  onShare = (item) => {
    Share.share({
      message: 'I just moved some Divvi Coins!',
      url: 'http://amandamallen.com',
      title: 'Divvi - share the wealth.'
    })
  }
  render () {
    let history;
    if (this.props.history && this.props.history.length > 0){
      history = this.props.history.sort((a,b)=>{
        let A = new Date(a.date)
        let B = new Date(b.date)
        if(A > B) return -1;
        if(A < B) return 1;
        return 0;})
    .map(item =>
        <Card key={item.date}>
          <CardItem header >
          <Left>
            <Thumbnail source={{uri: item.image}} />
            <Body>
            <Text>{item.title ? item.title : item.name ? item.name : item.company}</Text>
            <Text note>{item.subTitle ? item.subTitle : item.location ? item.location : `${item.coins} DIV`}</Text>
            </Body>
            </Left>
            <Icon name="ios-send-outline" style={{color: '#3AAFA9', fontSize: 40}}
            suppressHighlighting={true}
            onPress={() => {this.onShare(item)}}/>
           </CardItem>
           <CardItem cardBody>
             <Image source={{uri: item.image}} style={{height: 100, width: null, flex: 1}}/>
           </CardItem>
           <CardItem>
           <Left>
           <Icon active name="ios-git-compare" style={{color: '#3AAFA9', fontSize: 30}} />
           <Text style={{color: '#3AAFA9'}}>{item.amount}</Text>
           </Left>
           <Right>
           <Text note>{Moment(new Date(item.date)).fromNow()}</Text>
           </Right>
           </CardItem>
           </Card>)
  } else {
    history = <Card>
      <CardItem header>
        <Body style={{alignItems:'center'}}>
        <Text note style={{fontSize:40, textAlign: 'center'}}> No history... yet!</Text>
        <Text note style={{textAlign: 'center', marginTop:10}}>Go get some. </Text>
        </Body>
      </CardItem>
    </Card>
  }
    return (<View>{history}</View>)
  }
}

const mapStateToProps = (state) => {
  return {history: state.data.history}
}

export default connect(mapStateToProps)(History)
