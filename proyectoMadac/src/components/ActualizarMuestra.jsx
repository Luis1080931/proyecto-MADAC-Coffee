import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const ActualizarMuestra = ({ muestra, actualizarMuestra }) => {
  const [datosMuestra, setDatosMuestra] = useState(muestra);
  const ip = "192.168.100.155";

  const handleChange = (campo, valor) => {
    setDatosMuestra({ ...datosMuestra, [campo]: valor });
  };

  const handleSubmit = async () => {
    try {
      // Realizar la solicitud PUT para actualizar la muestra
      await axios.put(`http://${ip}:3000/muestra/actualizar/${muestra.codigo}`, datosMuestra);

      // Actualizar la muestra en el estado utilizando la función actualizarMuestra
      actualizarMuestra(datosMuestra);

      console.log('Muestra actualizada correctamente');
    } catch (error) {
      console.error('Error al actualizar la muestra:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Renderizar los campos de entrada para la muestra */}
      <Text style={styles.label}>Fecha:</Text>
      <TextInput
        style={styles.input}
        value={datosMuestra.fecha}
        onChangeText={(text) => handleChange('fecha', text)}
      />

      {/* Renderizar otros campos de entrada para la muestra de manera similar */}

      {/* Botón para enviar el formulario y actualizar la muestra */}
      <TouchableOpacity style={styles.boton} onPress={handleSubmit}>
        <Text style={styles.textoBoton}>Actualizar Muestra</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    width: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  boton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  textoBoton: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ActualizarMuestra;
