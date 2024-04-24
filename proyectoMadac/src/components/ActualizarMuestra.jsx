import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const ActualizarMuestra = ({ muestra, actualizarMuestra }) => {
  const [datosMuestra, setDatosMuestra] = useState(muestra);

  const ip = "192.168.101.99";

  const handleChange = (campo, valor) => {
    setDatosMuestra({ ...datosMuestra, [campo]: valor });
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`http://${ip}:3000/muestra/actualizar/${muestra.codigo}`, datosMuestra);
      actualizarMuestra(datosMuestra); // Actualiza la muestra en el estado de la lista de muestras
      console.log('Muestra actualizada correctamente');
    } catch (error) {
      console.error('Error al actualizar la muestra:', error);
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.label}>Fecha:</Text>
      <TextInput
        style={styles.input}
        value={datosMuestra.fecha}
        onChangeText={(text) => handleChange('fecha', text)}
      />

      <Text style={styles.label}>Cantidad:</Text>
      <TextInput
        style={styles.input}
        value={datosMuestra.cantidad}
        onChangeText={(text) => handleChange('cantidad', text)}
      />

      <Text style={styles.label}>Quién recibe:</Text>
      <TextInput
        style={styles.input}
        value={datosMuestra.quien_recibe}
        onChangeText={(text) => handleChange('quien_recibe', text)}
      />

      <Text style={styles.label}>Proceso de fermentación:</Text>
      <TextInput
        style={styles.input}
        value={datosMuestra.proceso_fermentacion}
        onChangeText={(text) => handleChange('proceso_fermentacion', text)}
      />

      <Text style={styles.label}>Humedad del café:</Text>
      <TextInput
        style={styles.input}
        value={datosMuestra.humedad_cafe}
        onChangeText={(text) => handleChange('humedad_cafe', text)}
      />

      <Text style={styles.label}>Altura MSNM:</Text>
      <TextInput
        style={styles.input}
        value={datosMuestra.altura_MSNM}
        onChangeText={(text) => handleChange('altura_MSNM', text)}
      />

      <Text style={styles.label}>Tipo de secado:</Text>
      <TextInput
        style={styles.input}
        value={datosMuestra.tipo_secado}
        onChangeText={(text) => handleChange('tipo_secado', text)}
      />

      <Text style={styles.label}>Observaciones:</Text>
      <TextInput
        style={styles.input}
        value={datosMuestra.observaciones}
        onChangeText={(text) => handleChange('observaciones', text)}
      />

      <Text style={styles.label}>Lote:</Text>
      <TextInput
        style={styles.input}
        value={datosMuestra.fk_lote}
        onChangeText={(text) => handleChange('fk_lote', text)}
      />
      
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
