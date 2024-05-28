import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmWUlfCRc4EsA.woff2' },
    { src: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu7GxKOzY.woff2', fontWeight: 'bold' },
  ],
});

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: '50%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
  },
  page: {
    fontFamily: 'Roboto',
    padding: 20,
    fontSize: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  }, /* ,
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  }, */
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
  tableColHeader: {
    width: '50%',
    backgroundColor: '#eee',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 10,
    fontWeight: 'bold',
  },
  tableCellHeaderFisicos: {
    margin: 5,
    fontSize: 10,
    fontWeight: 'bold',
  },
  tableFisicos: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 10,
  },
  tableRowFisicos: {
    flexDirection: 'column', // Cambiado de 'row' a 'column'
    width: '50%', // Ancho para cada fila, ya que quieres 4 filas en una fila
  },
  tableColVariable: {
    width: '40%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
  },
  tableColValor: {
    width: '10%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
  },
  plusCol: {
    display: 'flex',
    flexDirection: 'row'

  }
});

const PDFReport = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text>Centro de Gestión y Desarrollo Sostenible Surcolombiano</Text>
        <Text>INFORME SERVICIO ANALISIS FISICO SENSORIAL</Text>
        <Text>VERSIÓN: 01</Text>
        <Text>FECHA: 2023-05-05</Text>
        <Text>PAGINA: 1 de 4</Text>
      </View>
      <View style={styles.section} >
        <Text style={styles.sectionTitle}> 1. Objetivo </Text>
        <Text>El objetivo del siguiente informe es presentar los resultados del análisis físico-sensorial obtenidos para la muestra de café {data.muestra_id} descrita a continuación.</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Información General:</Text>
        <Text>Caficultor: {data.caficultor_nombre}</Text>
        <Text>Departamento: {data.municipio}</Text>
        <Text>Vereda: {data.vereda}</Text>
        <Text>Nombre de la finca: {data.finca_id}</Text>
        <Text>Código de la muestra: {data.muestra_id}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Especificaciones del Café:</Text>
        <View style={styles.table}>
          <View style={[ styles.tableRow, styles.tableHeader ]}>
            <View style={styles.tableCol}>
              <Text style={[styles.tableCell, styles.tableHeader]}>Variedad del Café</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{data.variedad}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={[styles.tableCell, styles.tableHeader]}>Altura sobre el nivel del mar</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{data.altura}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Datos Generales del Café:</Text>
        <View style={styles.table}>
          <View style={[ styles.tableRow, styles.tableHeader ]}>
            <View style={styles.tableCol}>
              <Text style={[styles.tableCell, styles.tableHeader]}>Tipo de Fermentacion</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{data.proceso_fermentacion}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}> {data.muestra_id} </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Análisis Físico:</Text>
        <View style={styles.tableFisicos} >
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeaderFisicos} rowSpan={4}> Análisis Fisicos </Text>
            </View>
            <View style={styles.plusCol}>

          {[...Array(15)].map((_, index) => (
            <View key={index} style={styles.tableRowFisicos}>
              <View style={styles.tableColVariable}>
                <Text style={styles.tableCell}>{data.resultados[index].variable}</Text>
              </View>
              <View style={styles.tableColValor}>
                <Text style={styles.tableCell}>{data.resultados[index].valor}</Text>
              </View>
            </View>
          ))}
          {/* Renderizar las siguientes 15 variables y sus valores */}
          {[...Array(15)].map((_, index) => (
            <View key={index} style={styles.tableRowFisicos}>
              <View style={styles.tableColVariable}>
                <Text style={styles.tableCell}>{data.resultados[index + 15].variable}</Text>
              </View>
              <View style={styles.tableColValor}>
                <Text style={styles.tableCell}>{data.resultados[index + 15].valor}</Text>
              </View>
            </View>
          ))}
            </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default PDFReport;
