import React, { Component } from 'react'
import {
  StyleSheet,
  PanResponder,
  Animated,
  Dimensions,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  AsyncStorage
} from 'react-native'
import {Container} from 'native-base'
import Login from '../../SignIn/login'
import Button from '../../common/button'
import Header from '../../common/header'

const { width, height } = Dimensions.get('window')

export default class Interests extends Component {
  constructor (props) {
    super(props)
    this.state = {
      interests: [
        {
          label: 'animals',
          src: require('../../../images/animals.jpg')
        }, {
          label: 'children',
          src: require('../../../images/children.jpg')
        }, {
          label: 'parks',
          src: require('../../../images/fields.jpg')
        }, {
          label: 'public health',
          src: require('../../../images/public_health.jpg')
        }, {
          label: 'crime',
          src: require('../../../images/crime.jpg')
        }, {
          label: 'mental health',
          src: require('../../../images/mental_health.jpg')
        }, {
          label: 'environment',
          src: require('../../../images/environment.jpg')
        }, {
          label: 'public_policy',
          src: require('../../../images/policy.jpg')
        }, {
          label: 'developing nations',
          src: require('../../../images/dev_nations.jpg')
        }, {
          label: 'homelessness',
          src: require('../../../images/homeless.jpg')
        }, {
          label: 'LGBQT',
          src: require('../../../images/lgbqt.jpg')
        }, {
          label: 'reproductive health',
          src: require('../../../images/rep_health.jpg')
        }, {
          label: 'veterans and military',
          src: require('../../../images/military.jpg')
        }, {
          label: 'education',
          src: require('../../../images/education.jpg')
        }, {
          label: 'technology',
          src: require('../../../images/technology.jpg')
        }, {
          label: 'disabled',
          src: require('../../../images/disabled.jpg')
        }
      ]
    }
  };

  componentWillMount = () => {
    const self = this
    AsyncStorage.getItem('Interests').then((res) => {
      if (res) {
        self.setState(JSON.parse(res))
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
    AsyncStorage.setItem('Interests', JSON.stringify(this.state))
  }

  getPairsArray (interests) {
    var pairs_r = []
    var pairs = []
    var count = 0
    interests.forEach((item) => {
      count += 1
      pairs.push(item)
      if (count == 2) {
        pairs_r.push(pairs)
        count = 0
        pairs = []
      }
    })
    return pairs_r
  }

  renderGallery () {
    var count = 0
    var previous_item = ''
    var pairs = this.getPairsArray(this.state.interests)
    return pairs.map((item, index) => {
      return (
        <View style={styles.item} key={index}>
          <Image resizeMode={Image.resizeMode.cover}
            style={(item[0].selected) ? styles.selectedPhoto : styles.photo}
            source={item[0].src}>
            <TouchableOpacity onPress={() => {
              this.updateInterests(item[0])
            }}>
              <Text style={styles.label}>{item[0].label}</Text>
            </TouchableOpacity>
          </Image>
          <Image resizeMode={Image.resizeMode.cover} style={(item[1].selected)
            ? styles.selectedPhoto
            : styles.photo} source={item[1].src}>
            <TouchableOpacity onPress={() => {
              this.updateInterests(item[1])
            }}>
              <Text style={styles.label}>{item[1].label}</Text>
            </TouchableOpacity>
          </Image>
        </View>
      )
    })
  }
  render () {
    return (
      <Container>
      <Header title='Interests'/>
      <View style={styles.container}>
        <Login />
        <ScrollView style={styles.gallery}>
          {this.renderGallery()}
        </ScrollView>
      </View>
      </Container>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFF'
  },
  gallery: {
    flexDirection: 'column'
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#99e6e6',
    padding: 20
  },
  tab: {
    flex: 1
  },
  icon: {
    textAlign: 'center'
  },
  buttonWhiteText: {
    fontSize: 20,
    color: '#FFF'
  },
  item: {
    flex: 1,
    flexDirection: 'row'
  },
  photo: {
    flex: 1,
    height: 200
  },
  hover: {
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    marginRight: 10,
    marginTop: 20,
    borderRadius: 100,
    backgroundColor: 'rgba(0,0,0,0.2)',
    height: 90,
    width: 90,
    opacity: 1
  },
  selectedPhoto: {
    flex: 1,
    height: 200,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderWidth: 5,
    borderColor: '#99e6e6'
  },
  label: {
    fontSize: 25,
    backgroundColor: 'transparent',
    color: 'white',
    marginTop: 75,
    textAlign: 'center'
  }
})
