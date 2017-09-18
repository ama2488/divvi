import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { Icon } from 'react-native-elements'

export default({ toss, onProfile, cards }) => {
  return (
    <View style={styles.actionBar}>
      <View style={{
        bottom: 25
      }}>
        <TouchableOpacity style={styles.buttonDislikeC} onPress={() => onProfile()}>
          <Icon name={ 'angle-double-up' } type={'font-awesome'} size={25} color={'#283940'}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  actionBar: {
    height: 50,
    position: 'absolute',
    bottom: 10,
    width:'100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingLeft: 13,
    paddingRight: 13
  },
  buttonDislikeC: {
    height: 60,
    width: 80,
    borderColor: '#283940',
    borderWidth: 2,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonTextDislike: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#283940'
  },
  buttonLikeC: {
    height: 75,
    width: 75,
    borderColor: '#f6f6f6',
    borderWidth: 2,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonTextLike: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#283940'
  }
})
