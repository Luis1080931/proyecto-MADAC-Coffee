import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';



const Muestras = () => {
  const [muestras, setMuestras] = useState([]);
  const [loading, setLoading] = useState(true);

  const ip = "192.168.101.108";

  useEffect(() => {
    const fetchMuestras = async () => {
      try {
        const response = await axios.get(`http://${ip}:3000/muestra/listar`);
        setMuestras(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar las muestras:', error);
        setLoading(false);
      }
    };

    fetchMuestras();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' ,color: 'black'}}>
      <Text>Muestras</Text>
      <FlatList style={{color: 'black'}}
        data={muestras}
        keyExtractor={(item) => item.codigo.toString()} 
        renderItem={({ item }) => <MuestraItem muestra={item} />}
      />
    </View>
  );
};
const MuestraItem = ({ muestra }) => {
  return (
    <View style={{ margin: 10, borderColor: '#ccc', padding: 15,  backgroundColor: '#E6E6E6', borderRadius: 12}}>
      <Text style={{color: 'black', fontSize: 18}}>Codigo: {muestra.codigo}</Text>  
      <Text style={{color: 'black', fontSize: 18}}>Fecha: {muestra.fecha}</Text>
      <Text style={{color: 'black', fontSize: 18}}>Cantidad: {muestra.cantidad}</Text>
      <Text style={{color: 'black', fontSize: 18}}>Quien recibe: {muestra.quien_recibe}</Text>
      <Text style={{color: 'black', fontSize: 18}}>Proceso de fermentación: {muestra.proceso_fermentacion}</Text>
      <Text style={{color: 'black', fontSize: 18}}>Humedad del café: {muestra.humedad_cafe}</Text>
      <Text style={{color: 'black', fontSize: 18}}>Altura MSNM: {muestra.altura_MSNM}</Text>
      <Text style={{color: 'black', fontSize: 18}}>Tipo de secado: {muestra.tipo_secado}</Text>
      <Text style={{color: 'black', fontSize: 18}}>Observaciones: {muestra.observaciones}</Text>
      <Text style={{color: 'black', fontSize: 18}}>Lote: {muestra.fk_lote}</Text>
      <Text style={{color: 'black', fontSize: 18}}>Estado: {muestra.estado}</Text>
    </View>
  );
};

export default Muestras;
