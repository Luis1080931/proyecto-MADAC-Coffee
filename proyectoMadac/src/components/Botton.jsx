import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const BotonRegistrar = ({ label, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText} >{label} </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    backgroundColor: '#30A900',
    padding: 10,
    width: 135,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,

  },
});

export default BotonRegistrar;
