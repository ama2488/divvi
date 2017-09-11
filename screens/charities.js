import React, {Component} from 'react';
import {StyleSheet, PanResponder, Animated, Dimensions, View} from 'react-native';
import Container from '../components/container.js';
import Card from '../components/card.js';
import Actions from '../components/actions.js';
import Button from '../components/button.js';

const {width, height} = Dimensions.get('window');

export default class Charities extends Component {
  viewProfile = (card) => {
    console.log('profile', card);
    this.props.navigation.navigate('CharityProfile');
  };
  render() {
    return (
      <View style={styles.container}>
        <Container onTossLeft={card => console.log(card, 'tossed left')} onTossRight={card => console.log(card, 'tossed right')} actionsBar={toss => <Actions toss={toss}/>} onProfile={card => this.viewProfile(card)}>
          <Card image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYSQmpM6-PdGIJVTSE6CbTjLpiGLyhgIMQOHBGkN6rzjcQBLNf" title="APA" subTitle="Austin, TX"/>
          <Card image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYSQmpM6-PdGIJVTSE6CbTjLpiGLyhgIMQOHBGkN6rzjcQBLNf" title="GiveMeMoney" subTitle="Houston, TX"/>
          <Card image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYSQmpM6-PdGIJVTSE6CbTjLpiGLyhgIMQOHBGkN6rzjcQBLNf" title="Donate" subTitle="Dallas, TX"/>
          <Card image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYSQmpM6-PdGIJVTSE6CbTjLpiGLyhgIMQOHBGkN6rzjcQBLNf" title="APA" subTitle="Austin, TX"/>
          <Card image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYSQmpM6-PdGIJVTSE6CbTjLpiGLyhgIMQOHBGkN6rzjcQBLNf" title="GiveMeMoney" subTitle="Houston, TX"/>
          <Card image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYSQmpM6-PdGIJVTSE6CbTjLpiGLyhgIMQOHBGkN6rzjcQBLNf" title="Donate" subTitle="Dallas, TX"/>
          <Card image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYSQmpM6-PdGIJVTSE6CbTjLpiGLyhgIMQOHBGkN6rzjcQBLNf" title="APA" subTitle="Austin, TX"/>
          <Card image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYSQmpM6-PdGIJVTSE6CbTjLpiGLyhgIMQOHBGkN6rzjcQBLNf" title="GiveMeMoney" subTitle="Houston, TX"/>
          <Card image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYSQmpM6-PdGIJVTSE6CbTjLpiGLyhgIMQOHBGkN6rzjcQBLNf" title="Donate" subTitle="Dallas, TX"/>
          <Card image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYSQmpM6-PdGIJVTSE6CbTjLpiGLyhgIMQOHBGkN6rzjcQBLNf" title="APA" subTitle="Austin, TX"/>
          <Card image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYSQmpM6-PdGIJVTSE6CbTjLpiGLyhgIMQOHBGkN6rzjcQBLNf" title="GiveMeMoney" subTitle="Houston, TX"/>
          <Card image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYSQmpM6-PdGIJVTSE6CbTjLpiGLyhgIMQOHBGkN6rzjcQBLNf" title="Donate" subTitle="Dallas, TX"/>
        </Container>
      </View>
    );
  }
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
});
