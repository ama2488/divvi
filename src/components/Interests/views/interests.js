import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  AsyncStorage,
  StyleSheet
} from 'react-native'
import {Icon} from 'react-native-elements'
import { connect } from 'react-redux'
import { Container, Content } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Login from '../../SignIn/login'
import Button from '../../common/button'
import Header from '../../common/header'
import * as actions from '../../../actions'

class Interests extends Component {

  componentWillMount = () => {
    this.setState({interests:this.props.interests})
    AsyncStorage.getItem('Interests').then((res) => {
      console.log(res, 'RESINTERESTS')
      if (JSON.parse(res)) {
        this.setState({interests:JSON.parse(res)})
      } else {
        this.setState({interests:this.props.interests})
      }
    })
  }

  updateInterests (interest) {
    let index = this.state.interests.indexOf(interest)
    let updatedInterests = [...this.state.interests]
    updatedInterests[index].selected = !(interest.selected)
    this.setState({ interests: updatedInterests })
    let selected = this.state.interests.map((i) => {
      return i.label
    })
    AsyncStorage.setItem('Interests', JSON.stringify(this.state.interests))
  }

  render () {
    let one = [...this.state.interests]
    let two = one.splice(8,15)
    return (
      <Container style={{backgroundColor:'#283940'}}>
      <Header title='Interests' balance={`${this.props.balance} DIV`}/>
      <Content>
      <Grid>
      <Col>
      {one.map((item, index)=>
        (!item.selected ?
        <Row style={(index%2 === 0)?styles.block:styles.block2} key={item.label} onPress={()=>{this.updateInterests(item)}}>
        <Text style={styles.fonty}>{item.label}</Text>
        </Row> :
        <Row style={styles.selectedBlock} key={item.label} onPress={()=>{this.updateInterests(item)}}>
        <Text style={styles.selectedFont}>
        <Icon name= {'ios-heart-outline'} type={'ionicon'} size={40} color={'#FE6D64'} style={{height:40, width:40}}/>
        </Text>
        <Text style={styles.selectedFont}>{item.label}</Text>
        </Row>)
      )}
      </Col>
      <Col>
      {two.map((item, index)=>
        (!item.selected ?
        <Row style={(index%2 === 0)?styles.block2:styles.block} key={item.label} onPress={()=>{this.updateInterests(item)}}>
        <Text style={styles.fonty}>{item.label}</Text>
        </Row> :
        <Row style={styles.selectedBlock} key={item.label} onPress={()=>{this.updateInterests(item)}}>
        <Text style={styles.selectedFont}>
        <Icon name= {'ios-heart-outline'} type={'ionicon'} size={40} color={'#FE6D64'} style={{height:40, width:40}}/>
        </Text>
        <Text style={styles.selectedFont}>{item.label}</Text>
        </Row>)
      )}
      </Col>
      </Grid>
      </Content>
      </Container>
    )
  }
}

const mapStateToProps= (state) =>{
  return {interests: state.data.interests, balance: state.balance.balance}
}

export default connect(mapStateToProps,actions)(Interests)

const styles = StyleSheet.create({
  block: {
    height:200,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor:'#557C83'
  },
  block2:{
    height:200,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor:'#3AAFA9'
  },
  fonty:{
    textAlign:'center',
    color:'#FFF',
    fontSize:25,
    fontWeight:'100'
  },
  selectedFont: {
    textAlign:'center',
    color:'#FFF',
    fontSize:25,
    fontWeight:'200'
  },
  selectedBlock: {
    height:200,
    alignItems:'center',
    justifyContent: 'center',
    flexDirection:'column'
  }
})
