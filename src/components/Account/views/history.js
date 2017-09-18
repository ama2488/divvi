import React, { Component } from 'react'
import { Image, View } from 'react-native'
import { Container, Content, Card, CardItem, Text, Icon, Right, Thumbnail, Left, Body, Tab, Tabs, TabHeading, StyleProvider } from 'native-base'
import { connect } from 'react-redux'
import Moment from 'moment'
Moment.locale('en')
class History extends Component {
  render () {
    let history;
    if (this.props.history && this.props.history.length > 0){
      history = this.props.history.map(item =>
        <Card key={item.date}>
          <CardItem header >
          <Left>
            <Thumbnail source={{uri: item.image}} />
            <Body>
            <Text>{item.title}</Text>
            <Text note>{item.subTitle}</Text>
            </Body>
            </Left>
           </CardItem>
           <CardItem cardBody>
             <Image source={{uri: item.image}} style={{height: 100, width: null, flex: 1}}/>
           </CardItem>
           <CardItem>
           <Left>
           <Icon active name="ios-git-compare" style={{color: 'green'}} size={20} />
           <Text style={{color: 'green'}}>{item.amount}</Text>
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
        <Text note style={{fontSize:40}}> No history, yet!</Text>
        <Text note>Go get some. </Text>
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
