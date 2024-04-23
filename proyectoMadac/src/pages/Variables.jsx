import { View, Text, Alert, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Variables = () => {
    // const que traera las varaibles de un objeto
    const [variables, setVariables] = useState([])
    // Mantendra la muestra seleccionada
    const [selectedVariable, setSelectedVariable] = useState(null)

    //Ip local del computador 
    const ip = "192.168.101.99";

    //se utiliza para cargar las muestras desde la API cuando el componente se monta por primera vez.
    useEffect(() => {
        //Se utiliza para cargar las variables y actualizar el estado de variables
        const fetchVariables = async () => {
            try {
                const response = await axios.get(`http://${ip}:3000/variable/listar`);
                setVariables(response.data)
            } catch (error) {
                console.log('Error al cargar las variables');
            }
        }
        fetchVariables()
    },[])
    //const para desactivar las varibles dependiendo del codigo
    const desactivarVariable = async (v_codigo) => {
        try {
            const response = await axios.put(`http://${ip}:3000/desactivar/${v_codigo}`)
            //Actualiza despues de desactivar
            const UpdateVariables = variables.filter(variable => variable.v_codigo !== v_codigo)
            setVariables(UpdateVariables)
            Alert.alert('Variable desactivada con exito')
        } catch (error) {
            Alert.alert('¡lo siento!, error al desactivar.')
            console.log('Error al desactivar la variable'+ error);
        }
    }

  return (
    <View>
        <FlatList
        data = {variables}
        keyExtractor={item => item.v_codigo.toString()}
        renderItem={({item}) => (
            <variableItem variable = {item}/>
        )}
        />
    </View>
  )
}

export default Variables