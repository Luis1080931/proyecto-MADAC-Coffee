
import React, { useState } from 'react';
import { View,Alert, TextInput, StyleSheet, Image } from 'react-native';
import BotonRegistrar from './Botton';
import axios from 'axios';



const FormMuestra = () => {
    const [fecha, setFecha] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [quien_recibe, setQuien_recibe] = useState('');
    const [proceso_fermentacion, setProceso_fermentacion] = useState('');
    const [ humedad_cafe, setHumedad_cafe] = useState('')
    const [altura_MSNM, setAltura_MSNM] = useState('')
    const [tipo_secado, setTipo_secado] = useState('')
    const [observaciones, setObservaciones] = useState('')
    const [fk_lote, setFk_lote] = useState('')

    const ip = "192.168.101.108";

    const isValidText = (text) => {
      return text.trim().length > 0;
     };
     
    const handleButtonPress = () => {
      if (!isValidText(fecha) || !isValidText(cantidad) || !isValidText(quien_recibe) || !isValidText(proceso_fermentacion) || !isValidText(humedad_cafe) || !isValidText(altura_MSNM) || !isValidText(tipo_secado) || !isValidText(observaciones) || !isValidText(fk_lote)) {
        Alert.alert('Error', 'Por favor, completa todos los campos.');
        return;
     }
     const muestra = {
        fecha,
        cantidad,
        quien_recibe,
        proceso_fermentacion,
        humedad_cafe,
        altura_MSNM,
        tipo_secado,
        observaciones,
        fk_lote
     };
    
     axios.post(`http://${ip}:3000/muestra/crearmuestra`, muestra)
        .then(response => {
          Alert.alert('Registro exitoso');
          console.log(response.data);
        })
        .catch(error => {
          Alert.alert('Error al registrar');
          console.error(error);
        });
    };
    
   
    return (
       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
         <View style= {styles.ContentFormulario}>

           <TextInput
             style={styles.TextInput}
             onChangeText={text => setFecha(text)}
             value={fecha}
             placeholder="Ingresa la fecha"
           />

           <TextInput
             style={styles.TextInput}
             onChangeText={text => setCantidad(text)}
             value={cantidad}
             placeholder="Ingresa una cantidad"
             keyboardType='numeric'
           />

           <TextInput
             style={styles.TextInput}
             onChangeText={text => setQuien_recibe(text)}
             value={quien_recibe}
             placeholder="Ingresa quien recibe."
           />

           <TextInput
             style={styles.TextInput}
             onChangeText={text => setProceso_fermentacion(text)}
             value={proceso_fermentacion}
             placeholder="Ingresa el proceso de fermentación"
           />

           <TextInput
             style={styles.TextInput}
             onChangeText={text => setHumedad_cafe(text)}
             value={humedad_cafe}
             placeholder="Ingresa la humedad del cafe"
             keyboardType='numeric'
           />

           <TextInput
             style={styles.TextInput}
             onChangeText={text => setAltura_MSNM(text)}
             value={altura_MSNM}
             placeholder="Ingresa la altura en MSNM"
             keyboardType='numeric'
           />
           

           <TextInput
             style={styles.TextInput}
             onChangeText={text => setTipo_secado(text)}
             value={tipo_secado}
             placeholder="Ingresa el tipo de secado"
           />

           <TextInput 
           style = {styles.TextInput}
           onChangeText={text => setObservaciones(text)}
           value= {observaciones}
           placeholder='Ingresa las observaciones'
           />

           <TextInput 
           style = {styles.TextInput}
           onChangeText={text => setFk_lote(text)}
           value= {fk_lote}
           placeholder='Ingresa el id del lote'
           keyboardType='numeric'
           />

           <BotonRegistrar label={'Registrarse'} onPress={handleButtonPress}/>
           </View>
{/*            <Image 
        style={{ width: 200, height: 200, marginBottom: 15 }}
        source={require('../assets/logo.png')}
      /> */}
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
     
    TextInput:{ 
      color: 'black',
      width: 260,
      height: 40, 
      borderRadius: 6,
      backgroundColor: 'white', 
      margin: 8,
    },

      Text: {
        alignItems: 'flex-start',
      }
   })
   export default FormMuestra;
   
