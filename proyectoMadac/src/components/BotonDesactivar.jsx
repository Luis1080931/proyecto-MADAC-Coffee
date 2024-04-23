
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

const BotonDesactivar = ({label,onPress}) => {
  return (
    <>
    <TouchableOpacity style={Styles.BotonDesactivar} onPress={onPress} >
        <Text style={Styles.TextDesactivar}>{label}</Text>
    </TouchableOpacity>
    </>
  )

}
const Styles = StyleSheet.create({
    BotonDesactivar : {
        marginTop: 1,
        marginLeft: 230,
        backgroundColor: 'yellow',
        padding: 10,
        width: 135,
        display: 'flex',
        alignItems: 'center',
        borderRadius: 20,
        
    },
    TextDesactivar: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    }
})

export default BotonDesactivar