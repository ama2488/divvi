import React, {Component} from 'react';
import {
  StyleSheet,
  PanResponder,
  Animated,
  Dimensions,
  View,
  Text,
  ScrollView,
  Image,
  TouchableHighlight
} from 'react-native';

import FormContainer from '../components/formcontainer.js';
import Label from '../components/label.js';
import Button from '../components/button.js';

const {width, height} = Dimensions.get('window');

export default class Interests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interests: [
        {
          label: 'animals',
          src: require('../images/animals.jpg')
        }, {
          label: 'children',
          src: require('../images/children.jpg')
        }, {
          label: 'fields',
          src: require('../images/fields.jpg')
        }, {
          label: 'public health',
          src: require('../images/public_health.jpg')
        }, {
          label: 'crime',
          src: require('../images/crime.jpg')
        }, {
          label: 'mental health',
          src: require('../images/mental_health.jpg')
        }, {
          label: 'environment',
          src: require('../images/environment.jpg')
        }, {
          label: 'public_policy',
          src: require('../images/policy.jpg')
        }, {
          label: 'developing nations',
          src: require('../images/dev_nations.jpg')
        }, {
          label: 'homelessness',
          src: require('../images/homeless.jpg')
        }, {
          label: 'LGBQT',
          src: require('../images/lgbqt.jpg')
        }, {
          label: 'reproductive health',
          src: require('../images/rep_health.jpg')
        }, {
          label: 'veterans and military',
          src: require('../images/military.jpg')
        }, {
          label: 'education',
          src: require('../images/education.jpg')
        }, {
          label: 'technology',
          src: require('../images/technology.jpg')
        }, {
          label: 'disabled',
          src: require('../images/disabled.jpg')
        }
      ]
    };
  };

  updateInterests(interest) {
    let index = this.state.interests.indexOf(interest);
    let updatedInterests = [...this.state.interests];

    updatedInterests[index].selected = (interest.selected)
      ? false
      : true;

    this.setState({interests: updatedInterests});
    console.log(this.state);
  }

  onSave = () => {
    this.props.navigation.goBack();
  };

  getPairsArray(interests) {
    var pairs_r = [];
    var pairs = [];
    var count = 0;
    interests.forEach((item) => {
      count += 1;
      pairs.push(item);
      if (count == 2) {
        pairs_r.push(pairs)
        count = 0;
        pairs = [];
      }
    });
    return pairs_r;
  }

  renderGallery() {
    var count = 0;
    var previous_item = '';
    var pairs = this.getPairsArray(this.state.interests);
    return pairs.map((item, index) => {
      return (
        <View style={styles.item} key={index}>
          <Image resizeMode={Image.resizeMode.cover} style={(item[0].selected)
            ? styles.selectedPhoto
            : styles.photo} source={item[0].src}>
            <TouchableHighlight onPress={() => {
              this.updateInterests(item[0])
            }}>
              <Text style={styles.label}>{item[0].label}</Text>
            </TouchableHighlight>
          </Image>
          <Image resizeMode={Image.resizeMode.cover} style={(item[1].selected)
            ? styles.selectedPhoto
            : styles.photo} source={item[1].src}>
            <TouchableHighlight onPress={() => {
              this.updateInterests(item[1])
            }}>
              <Text style={styles.label}>{item[1].label}</Text>
            </TouchableHighlight>
          </Image>
        </View>
      );
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.gallery}>
          {this.renderGallery()}
        </ScrollView>
        <Button label="Save" styles={{
          button: styles.hover,
          label: styles.buttonWhiteText
        }} onPress={() => {
          this.onSave()
        }}/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 20
  },
  gallery: {
    flexDirection: 'column'
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#84E1BF',
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
    marginTop: 25,
    borderRadius: 100,
    backgroundColor: '#FE6D64',
    height: 90,
    width: 90,
    opacity: 50
  },
  selectedPhoto: {
    flex: 1,
    height: 200,
    borderWidth: 2,
    borderColor: 'green'
  },
  label: {
    fontSize: 20,
    backgroundColor: 'transparent',
    color: 'white',
    alignSelf: 'center'
  }
});
