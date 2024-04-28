import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const BotonActualizar = ({ label, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText} >{label} </Text>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    backgroundColor: '#F4D03F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default BotonActualizar;
