import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import BotonDesactivar from '../components/BotonDesactivar';

const Muestras = () => {
  const [muestras, setMuestras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMuestra, setSelectedMuestra] = useState(null); // Para mantener la muestra seleccionada

  // para buscar 
  const [searchTerm, setSearchTerm] = useState('');
// Filtrar segun su estado 
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
      const updatedMuestras = muestras.filter(muestra => muestra.codigo !== codigo);
      setMuestras(updatedMuestras);
      console.log('Muestra desactivada correctamente');
    } catch (error) {
      console.error('Error al desactivar la muestra:', error);
    }
  };

  const openModal = (muestra) => {
    setSelectedMuestra(muestra);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedMuestra(null);
    setModalVisible(false);
  };

  const filteredMuestras = muestras.filter(muestra => {
    return Object.values(muestra).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  //filtro por estado 
  const filterMuestrasByEstado = (estado) => {
    setFilterByEstado(estado);
  };
  const filteredMuestrasByEstado = filterByEstado
  ? filteredMuestras.filter(muestra => muestra.estado.toLowerCase() === filterByEstado.toLowerCase())
  : filteredMuestras;

// Botones para filtrar por estado
<View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>
  <TouchableOpacity onPress={() => filterMuestrasByEstado('activo')}>
    <Text style={{ color: filterByEstado === 'activo' ? 'blue' : 'black' }}>Activos</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => filterMuestrasByEstado('inactivo')}>
    <Text style={{ color: filterByEstado === 'inactivo' ? 'blue' : 'black' }}>Inactivos</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => setFilterByEstado('')}>
    <Text style={{ color: filterByEstado === '' ? 'blue' : 'black' }}>Todos</Text>
  </TouchableOpacity>
</View>

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10, padding: 10 }}
        onChangeText={setSearchTerm}
        value={searchTerm}
        placeholder="Buscar"
      />
      <Text>Muestras</Text>
      <FlatList
        data={filteredMuestrasByEstado}
        keyExtractor={(item) => item.codigo.toString()} 
        renderItem={({ item }) => (
          <MuestraItem muestra={item} openModal={openModal} />
        )}
      />

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <TouchableOpacity onPress={closeModal} style={{ alignSelf: 'flex-end' }}>
              <Text>X</Text>
            </TouchableOpacity>
            {selectedMuestra && (
              <View>
                <BotonDesactivar label="Desactivar" onPress={() => desactivarMuestra(selectedMuestra.codigo)} />
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const MuestraItem = ({ muestra, openModal }) => {
  return (
    <View style={{ margin: 10, borderColor: '#ccc', padding: 15, backgroundColor: '#E6E6E6', borderRadius: 12 }}>
      <TouchableOpacity onPress={() => openModal(muestra)} style={{ alignSelf: 'flex-end' }}>
        <Icon name="dots-three-vertical" type="entypo" />
      </TouchableOpacity>
      
      <Text style={{ color: 'black', fontSize: 18 }}>Codigo: {muestra.codigo}</Text>
      <Text style={{ color: 'black', fontSize: 18 }}>Fecha: {muestra.fecha}</Text>
      <Text style={{ color: 'black', fontSize: 18 }}>Cantidad: {muestra.cantidad}</Text>
      <Text style={{ color: 'black', fontSize: 18 }}>Quien recibe: {muestra.quien_recibe}</Text>
      <Text style={{ color: 'black', fontSize: 18 }}>Proceso de fermentación: {muestra.proceso_fermentacion}</Text>
      <Text style={{ color: 'black', fontSize: 18 }}>Humedad del café: {muestra.humedad_cafe}</Text>
      <Text style={{ color: 'black', fontSize: 18 }}>Altura MSNM: {muestra.altura_MSNM}</Text>
      <Text style={{ color: 'black', fontSize: 18 }}>Tipo de secado: {muestra.tipo_secado}</Text>
      <Text style={{ color: 'black', fontSize: 18 }}>Observaciones: {muestra.observaciones}</Text>
      <Text style={{ color: 'black', fontSize: 18 }}>Lote: {muestra.fk_lote}</Text>
      <Text style={{ color: 'black', fontSize: 18 }}>Estado: {muestra.estado}</Text>
    </View>
  );
};

export default Muestras;
