import React, { Component } from 'react'
import {
  StyleSheet,
  PanResponder,
  Animated,
  Dimensions,
  View,
  Text,
  Image,
  ScrollView,
  Modal,
  WebView,
  AsyncStorage
} from 'react-native'
import {connect} from 'react-redux'
import {Container} from 'native-base'
import Button from '../../common/button'
import Header from '../../common/header'
import * as actions from '../../../actions'

const { width, height } = Dimensions.get('window')

class CharityProfile extends Component {
  state = {
    showAd: false,
  }
  componentWillMount = () => {
    if (this.props.navigation.state.params.ad){
      this.setState({showAd: true});
      setTimeout(()=>{
        this.setState({showAd:false})
        this.props.removeCard(this.props.navigation.state.params, `${this.props.navigation.state.params.ad} DIV`)
        AsyncStorage.setItem('History', JSON.stringify(this.props.history))
        this.props.navigation.navigate('Charities', this.props.navigation.state.params)
      }, 60000)
    }
  }
  onBack = () => {
    this.props.navigation.goBack()
  };
  onComplete = () => {

  }
  render () {
    return (
      <Container>
      <Header title={this.props.navigation.state.params.title}></Header>
        <ScrollView>
          <Text style={styles.label}>
            {this.props.navigation.state.params.subTitle}
          </Text>
          <Image style={styles.image} source={{
            uri: this.props.navigation.state.params.image
          }}/>
          <Button label='Back' styles={{
            label: styles.buttonWhiteText
          }} onPress={() => {
            this.onBack()
          }}/>
        </ScrollView>
        <Modal onComplete={()=>{this.onComplete()}} animationType='none'
        transparent={false}
        visible={this.state.showAd}>
        <WebView
      source={{uri:this.props.navigation.state.params.url}}
      style={{height: height, width: width}}
      mediaPlaybackRequiresUserAction={false}
      allowsInlineMediaPlayback={true}
      bounces={false}
      />
        </Modal>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {history: state.data.history}
}

export default connect(mapStateToProps, actions)(CharityProfile)

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: '#FFF',
    padding: 30,
    flexDirection: 'column'
  },
  label: {
    color: 'white',
    fontSize: 20,
    margin: 10,
    alignSelf: 'center'
  },
  alignRight: {
    alignSelf: 'flex-end'
  },
  textInput: {
    height: 50,
    fontSize: 30
  },
  buttonWhiteText: {
    fontSize: 20,
    color: '#FFF'
  },
  buttonBlackText: {
    fontSize: 20,
    color: '#595856'
  },
  footer: {
    marginTop: 5
  },
  header: {
    fontSize: 40,
    color: '#283940',
    alignSelf: 'center',
    marginTop: 30
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 100,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: 'white'
  }
})
