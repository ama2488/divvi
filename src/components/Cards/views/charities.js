import React, { Component } from 'react'
import { StyleSheet, PanResponder, Animated, Dimensions, View, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import Container from '../container'
import Card from '../card'
import Actions from '../actions'
import Button from '../../common/button'

const { width, height } = Dimensions.get('window')

class Charities extends Component {
  componentWillMount = () => {
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
  render () {
    return (
      <View style={styles.container}>
        <Container onTossLeft={card => console.log(card, 'tossed left')} onTossRight={card => console.log(card, 'tossed right')} firstChild={'hello'} actionsBar={(toss, onProfile) => <Actions toss={toss} onProfile={() => {
          onProfile(this.viewProfile)
        }}/>}>
          {this.props.data.map(card => <Card key={card.id} image={card.image} title={card.title} subTitle={card.subTitle}/>)}
        </Container>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return { data: state.data }
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

export default connect(mapStateToProps)(Charities)
