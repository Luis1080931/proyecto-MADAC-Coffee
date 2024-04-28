import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const BotonDesactivar = ({ isActive, onPress }) => {
  const backgroundColor = isActive ? '#B03A2E' : '#2ECC71';
  const label = isActive ? "Desactivar" : "Activar";

  return (
    <TouchableOpacity style={[styles.botonDesactivar, { backgroundColor }]} onPress={onPress}>
      <Text style={styles.textoBoton}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  botonDesactivar: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  textoBoton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default BotonDesactivar;
