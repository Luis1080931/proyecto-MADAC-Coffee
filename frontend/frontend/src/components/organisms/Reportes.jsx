import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import logoSena from './../../assets/icons/logoPDFSENA.png'
import logoSennova from './../../assets/icons/logoSennova.png'
import logoENCC from './../../assets/icons/ENCC.jpg'

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
    alignItems: 'center',
    marginBottom: 10,
    height: '10%'
  },
  row1: {
    flex: 1,
    width: '20%',
    flexDirection: 'column',
    border: 1,
    borderColor: 'black',
  },
  row2: {
    flex: 3,
    flexDirection: 'column',
    border: 1,
    borderColor: 'black',
    width: '60%',
  },
  row3: {
    flex: 1,
    flexDirection: 'column',
    border: 1,
    borderColor: 'black',
    width: '20%'
  },
  col1: {
    height: '50%',
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  col2: {
    height: '50%',
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  col3: {
    height: '50%',
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  col3Text: {
    height: '50%',
    borderWidth: 1,
    borderColor: 'black',
    fontSize: 8 
  },
  textCol3: {
    borderBottomWidth: 1,
    borderColor: 'black'
  },
  text: {
    flex: 1,
    textAlign: 'center',
    fontSize: 10 
  },
  text2: {
    flex: 1,
    textAlign: 'center',
    fontSize: 10,
    marginTop: 11
  },
  image: {
    width: 60,
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
    fontWeight: 'extrabold',
    marginBottom: 5,
  },
  sectionText: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  table: {
    display: 'flex',
    flexDirection: 'row',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000'
  },
  tableRow: {
    flexDirection: 'row',
    width: '100%'
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
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
    padding: 3,/* 
    borderWidth: 0,
    borderStyle: 'solid', */
    /* borderRightWidth: 0,
    borderBottomWidth: 0, */
  },
  tableCellDatos: {
    fontSize: 10,
    padding: 3,
    borderWidth: 1,
    borderStyle: 'solid', 
    borderColor: 'black'
  },
  tableCellValorDatos: {
    fontSize: 10,
    padding: 3,
    borderWidth: 1,
    borderStyle: 'solid', 
    borderColor: 'black'
  },
  tableColDatos: {
    width: '80%'
  },
  tableHeader: {
    fontWeight: 'bold',
  },
  tableColHeader: {
    width: '96%',
    flex: 1,
    backgroundColor: '#C6E0B4',
    textAlign: 'center',
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
    width: '100%'
  },
  tableFisicos: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 10,
  },
  tableRowFisicos: {
    flexDirection: 'row',
  },
  tableColVariable: {
    width: '80%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
  },
  tableColValor: {
    width: '20%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
  },
  plusCol: {
    flexDirection: 'row',
  },
  halfTable: {
    width: '48%',
  },
  plusColDatos: {
    flexDirection: 'column',
  },
});

const PDFReport = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header} fixed>
        <View style={styles.row1}>
          <View style={styles.col1}>
            <Image style={styles.image} src={logoSena} />
          </View>
          <View style={styles.col1}>
            <Image style={styles.image} src={logoENCC} />
          </View>
        </View>
        <View style={styles.row2}>
          <View style={styles.col2}>
            <Text style={styles.text}>Centro de Gestión y Desarrollo Sostenible Surcolombiano</Text>
            <Text style={styles.text}>Escuela Nacional de la Calidad del Café </Text>
          </View>
          <View style={styles.col2}>
            <Text style={styles.text2}>INFORME SERVICIO ANALISIS FISICO SENSORIAL</Text>
          </View>
        </View>
        <View style={styles.row3}>
          <View style={styles.col3}>
            <Image style={styles.image} src={logoSennova} />
          </View>
          <View style={styles.col3Text}>
            <Text style={styles.textCol3}>VERSIÓN: 01</Text>
            <Text style={styles.textCol3}>FECHA: 2023-05-05</Text>
            <Text style={styles.textCol3}>PÁGINA: 1 de 4</Text>
            {/* <Text style={styles.textCol3} render={({ pageNumber, totalPages }) => (
              `PÁGINA: ${pageNumber} de ${totalPages}`
            )}  /> */}
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Objetivo</Text>
        <Text style={styles.sectionText}>El objetivo del siguiente informe es presentar los resultados del análisis físico-sensorial obtenidos para la muestra de café {data.muestra_id} descrita a continuación.</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Información General:</Text>
        <Text style={styles.sectionText}>Caficultor: {data.caficultor_nombre}</Text>
        <Text style={styles.sectionText}>Departamento: {data.municipio}</Text>
        <Text style={styles.sectionText}>Vereda: {data.vereda}</Text>
        <Text style={styles.sectionText}>Nombre de la finca: {data.nombre_finca}</Text>
        <Text style={styles.sectionText}>Código de la muestra: {data.muestra_id}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Especificaciones del Café:</Text>
        <View style={styles.table}>
          <View style={[styles.plusColDatos]}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <View style={styles.tableCol}>
                <Text style={[styles.tableCell, styles.tableHeader]}>Variedad del Café</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.variedad}</Text>
              </View>
            </View>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <View style={styles.tableCol}>
                <Text style={[styles.tableCell, styles.tableHeader]}>Altura sobre el nivel del mar</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.altura_MSNM}</Text>
              </View>
            </View>
          </View>
          <View style={[styles.plusColDatos]}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <View style={styles.tableCol}>
                <Text style={[styles.tableCell, styles.tableHeader]}>Método de muestreo: </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.variedad}</Text>
              </View>
            </View>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <View style={styles.tableCol}>
                <Text style={[styles.tableCell, styles.tableHeader]}>Método para la preparacion de la muestra:</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.altura_MSNM}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. Datos Generales del Café:</Text>
        <View style={styles.plusCol}>
          <View style={styles.halfTable}>
            <View style={[styles.tableRowFisicos]}>
              <View style={styles.tableColDatos}>
                <Text style={[styles.tableCellDatos]}>Tipo de Fermentacion</Text>
                <Text style={ styles.tableCellDatos }> Código de la muestra: </Text>
              </View>
              <View style={styles.tableColDatos}>
                <Text style={styles.tableCellValorDatos}>{data.proceso_fermentacion}</Text>
                <Text style={styles.tableCellValorDatos}>{data.muestra_id}</Text>
              </View>
              {/* <View style={[ styles.tableColVariable ]}>
              </View>
              <View style={styles.tableColValor}>
              </View> */}
            </View>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>5. Análisis Físico:</Text>
        <View style={styles.tableFisicos}>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeaderFisicos} >Análisis Físicos</Text>
          </View>
          <View style={styles.plusCol}>
            <View style={styles.halfTable}>
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
            </View>
            <View style={styles.halfTable}>
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
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>6. Resultados:</Text>
      </View>
    </Page>
  </Document>
);

export default PDFReport; 