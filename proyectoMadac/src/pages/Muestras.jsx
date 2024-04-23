import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';
import BotonDesactivar from '../components/BotonDesactivar';
import { useNavigation } from '@react-navigation/native';
import FormMuestra from '../components/FormMuestra';

const Muestras = () => {
  const navigation = useNavigation();
  const [muestras, setMuestras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterByEstado, setFilterByEstado] = useState('');

  const ip = "192.168.101.99";

  useEffect(() => {
    const fetchMuestras = async () => {
      try {
        const response = await axios.get(`http://${ip}:3000/muestra/listar`);
        setMuestras(response.data);
        setLoading(false);
      } catch (error) {
        console.log('Error al cargar las muestras:', error);
        setLoading(false);
      }
    };

    fetchMuestras();
  }, []);

  const desactivarMuestra = async (codigo) => {
    try {
      await axios.put(`http://${ip}:3000/muestra/desactivar/${codigo}`);
      // Actualizar las muestras después de desactivar
      const updatedMuestras = muestras.map(muestra => {
        if (muestra.codigo === codigo) {
          return { ...muestra, estado: 'inactivo' }; // Cambiar el estado a inactivo
        }
        return muestra;
      });
      setMuestras(updatedMuestras);
      console.log('Muestra desactivada correctamente');
    } catch (error) {
      console.error('Error al desactivar la muestra:', error);
    }
  };

  const filteredMuestras = muestras.filter(muestra => {
    return Object.values(muestra).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const filterMuestrasByEstado = (estado) => {
    setFilterByEstado(estado);
  };

  const filteredMuestrasByEstado = filterByEstado
    ? filteredMuestras.filter(muestra => muestra.estado.toLowerCase() === filterByEstado.toLowerCase())
    : filteredMuestras;

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setSearchTerm}
          value={searchTerm}
          placeholder="Buscar"
        />
        <TouchableOpacity onPress={() => navigation.navigate('Registrar muestra')}>
          <Text style= {styles.IconFalse}>📝</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => filterMuestrasByEstado('activo')}>
          <Text style={[styles.button, filterByEstado === 'activo' && styles.activeButton]}>Activos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => filterMuestrasByEstado('inactivo')}>
          <Text style={[styles.button, filterByEstado === 'inactivo' && styles.DesactiveButton]}>Inactivos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilterByEstado('')}>
          <Text style={[styles.button, !filterByEstado && styles.activeButton]}>Todos</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Muestras</Text>
      <FlatList
        data={filteredMuestrasByEstado}
        keyExtractor={(item) => item.codigo.toString()} 
        renderItem={({ item }) => (
          <MuestraItem muestra={item} desactivarMuestra={desactivarMuestra} />
        )}
      />
    </View>
  );
};

const MuestraItem = ({ muestra, desactivarMuestra }) => {
  return (
    <View style={styles.muestraContainer}>
      <Text style={styles.muestraText}>Codigo: {muestra.codigo}</Text>
      <Text style={styles.muestraText}>Fecha: {muestra.fecha}</Text>
      <Text style={styles.muestraText}>Cantidad: {muestra.cantidad}</Text>
      <Text style={styles.muestraText}>Quien recibe: {muestra.quien_recibe}</Text>
      <Text style={styles.muestraText}>Proceso de fermentación: {muestra.proceso_fermentacion}</Text>
      <Text style={styles.muestraText}>Humedad del café: {muestra.humedad_cafe}</Text>
      <Text style={styles.muestraText}>Altura MSNM: {muestra.altura_MSNM}</Text>
      <Text style={styles.muestraText}>Tipo de secado: {muestra.tipo_secado}</Text>
      <Text style={styles.muestraText}>Observaciones: {muestra.observaciones}</Text>
      <Text style={styles.muestraText}>Lote: {muestra.fk_lote}</Text>
      <Text style={styles.muestraText}>Estado: {muestra.estado}</Text>


        <BotonDesactivar label="Desactivar" onPress={() => desactivarMuestra(muestra.codigo)}/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9F9',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  input: {
    marginTop:10,
    height: 50,
    width: '80%',
    borderRadius: 10,
    borderColor: '#CACFD2',
    borderWidth: 2,
    padding: 10,
  },
  IconFalse: {
    fontSize: 34,
    marginRight: 20
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  button: {
    color: 'black',
    fontSize: 16,
  },
  activeButton: {
    color: 'green',
  },
  DesactiveButton: {
    color: '#E74C3C',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 10,
  },
  muestraContainer: {
    margin: 10,
    borderColor: '#909497',
    padding: 15,
    backgroundColor: '#CACFD2',
    borderRadius: 12,
  },
  muestraText: {
    color: 'black',
    fontSize: 18,
    marginBottom: 5,
  },
});

export default Muestras;
