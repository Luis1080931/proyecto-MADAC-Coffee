import React, { useState } from 'react';
import { View, Alert, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';
import BotonRegistrar from './Botton';
import { Image } from 'react-native-elements';

const FormVariables = () => {
  const [nombre, setNombre] = useState('');
  const [fk_tipo_analisis, setFk_tipo_analisis] = useState('');

  const ip = "10.193.144.233";

  const isValidText = (text) => {
    return text.trim().length > 0;
  };

  const handleButtonPress = () => {
    if (!isValidText(nombre) || !isValidText(fk_tipo_analisis)) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    const variable = {
      nombre,
      fk_tipo_analisis
    };

    axios.post(`http://${ip}:3000/variable/crear`, variable)
      .then(response => {
        Alert.alert('Se registró la variable con éxito');
        console.log(response.data);
        setNombre('');
        setFk_tipo_analisis('');
      })
      .catch(error => {
        Alert.alert('Error al registrar la variable');
        console.error(error);
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <View style={styles.ContentFormulario}>
        <TextInput
          style={styles.TextInput}
          onChangeText={text => setNombre(text)}
          value={nombre}
          placeholder="Ingresa el nombre de la variable"
        />
        <TextInput
          style={styles.TextInput}
          onChangeText={number => setFk_tipo_analisis(number)}
          value={fk_tipo_analisis}
          placeholder="Ingrese el tipo de análisis"
          keyboardType="numeric"
        />
        <BotonRegistrar label={'Registrarse'} onPress={handleButtonPress} />
      </View>
      <Image
        style={{ width: 200, height: 200, marginBottom: 15 }}
        source={require('../assets/logo.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ContentFormulario: {
    margin: 12,
    padding: 18,
    borderRadius: 18,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextInput: {
    color: 'black',
    width: 260,
    height: 40,
    borderRadius: 6,
    backgroundColor: 'white',
    margin: 8,
  },
});

export default FormVariables;
