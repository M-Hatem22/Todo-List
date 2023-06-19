import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import {AntDesign } from '@expo/vector-icons';
const Task = (props) => {

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
      <AntDesign name="doubleright" size={24} color="black" />
        <Text style={styles.itemText}>{props.text}</Text>
      </View>
      <AntDesign name="delete" size={24} color="black"  /> 
      
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexGrow:1
  },
  itemText: {
    maxWidth: '90%',
  },
  
});

export default Task;