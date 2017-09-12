import React, {Component} from 'react';
import {StyleSheet, PanResponder, Animated, Dimensions, View} from 'react-native';
import Container from '../components/container.js';
import Card from '../components/card.js';
import Actions from '../components/actions.js';
import Button from '../components/button.js';

const {width, height} = Dimensions.get('window');

export default class Charities extends Component {
  state = {
    cards: [
      {
        id: 1,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYSQmpM6-PdGIJVTSE6CbTjLpiGLyhgIMQOHBGkN6rzjcQBLNf",
        title: "APA",
        subTitle: "Austin, TX"
      }, {
        id: 2,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYSQmpM6-PdGIJVTSE6CbTjLpiGLyhgIMQOHBGkN6rzjcQBLNf",
        title: "GiveMeMoney",
        subTitle: "Houston, TX"
      }, {
        id: 3,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYSQmpM6-PdGIJVTSE6CbTjLpiGLyhgIMQOHBGkN6rzjcQBLNf",
        title: "Donate",
        subTitle: "Dallas, TX"
      }, {
        id: 35,
        image: "http://www.toxel.com/wp-content/uploads/2008/07/ua2.jpg",
        title: "100 DIV",
        subTitle: ""
      }, {
        id: 4,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYSQmpM6-PdGIJVTSE6CbTjLpiGLyhgIMQOHBGkN6rzjcQBLNf",
        title: "GiveMeMoney",
        subTitle: "Houston, TX"
      }, {
        id: 5,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYSQmpM6-PdGIJVTSE6CbTjLpiGLyhgIMQOHBGkN6rzjcQBLNf",
        title: "APA",
        subTitle: "Austin, TX"
      }
    ]
  };

  // componentWillMount(){
  //   http to get all charities/ads and set cards equal to users' custom card array
  // }

  viewProfile = (card) => {
    console.log(card);
    this.props.navigation.navigate('CharityProfile', card);
  };
  render() {
    return (
      <View style={styles.container}>
        <Container onTossLeft={card => console.log(card, 'tossed left')} onTossRight={card => console.log(card, 'tossed right')} firstChild={'hello'} actionsBar={(toss, onProfile) => <Actions toss={toss} onProfile={() => {
          onProfile(this.viewProfile)
        }}/>}>
          {this.state.cards.map(card => <Card key={card.id} image={card.image} title={card.title} subTitle={card.subTitle}/>)}
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
