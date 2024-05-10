import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import axiosClient from './../axiosClient.js'

Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmWUlfCRc4EsA.woff2' },
    { src: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu7GxKOzY.woff2', fontWeight: 'bold' },
  ],
});


const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
    padding: 20,
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: { flexDirection: 'row' },
  tableCell: {
    margin: 5,
    fontSize: 10,
    padding: 3,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableHeader: {
    fontWeight: 'bold',
    backgroundColor: '#f2f2f2',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
});
/* const [resultados, setResultados] = useState([]);

  useEffect(() => {
    axiosClient.get('/resultados/listar').then((response) => {
      console.log(response.data)
      setResultados(response.data)
    })
  }, []); */

const PDFReport = () => (

<Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Información General:</Text>
        <Text>Caficultor: {/* {data.caficultor} */}</Text>
        <Text>Departamento: {/* {data.departamento} */}</Text>
        <Text>Vereda: {/* {data.vereda} */}</Text>
        <Text>Nombre de la finca: {/* {data.nombreFinca} */}</Text>
        <Text>Código de la muestra: {/* {data.codigoMuestra} */}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Especificaciones del Café:</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.tableHeader]}>Variedad del Café</Text>
            <Text style={styles.tableCell}>{/* {data.variedad} */}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.tableHeader]}>Altura sobre el nivel del mar</Text>
            <Text style={styles.tableCell}>{/* {data.altura} */}</Text>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Datos Generales del Café:</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.tableHeader]}>Tipo de Molienda</Text>
            <Text style={styles.tableCell}>{/* {data.tipoMolienda} */}</Text>
          </View>
          {/* Agregar más filas para los datos generales del café */}
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Análisis Físico:</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.tableHeader]}>Variable</Text>
            <Text style={[styles.tableCell, styles.tableHeader]}>Resultado</Text>
          </View>
          {/* Renderizar los resultados del análisis físico */}
          {resultados.map((resultado, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{resultado.variable}</Text>
              <Text style={styles.tableCell}>{resultado.valor}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export default PDFReport;
