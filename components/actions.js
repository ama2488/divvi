import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export default({ toss, onProfile, cards }) => {
  return (
    <View style={styles.actionBar}>
      <View style={{
        bottom: 25
      }}>
        <TouchableOpacity style={styles.buttonDislikeC} onPress={() => toss('left')}>
          <Text style={styles.buttonTextDislike}>Pass</Text>
        </TouchableOpacity>
      </View>

      <View style={{
        bottom: 25
      }}>
        <TouchableOpacity style={styles.buttonDislikeC} onPress={() => onProfile()}>
          <Text style={styles.buttonTextDislike}>Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={{
        bottom: 25
      }}>
        <TouchableOpacity style={styles.buttonLikeC} onPress={() => toss('right')}>
          <Text style={styles.buttonTextLike}>Donate</Text>
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
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingLeft: 13,
    paddingRight: 13
  },
  buttonDislikeC: {
    height: 75,
    width: 75,
    borderColor: '#f6f6f6',
    borderWidth: 2,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonTextDislike: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'
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
    color: 'white'
  }
})
