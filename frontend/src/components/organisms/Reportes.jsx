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
    height: '15%'
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
    width: '55%',
  },
  row3: {
    display: 'flex',
    flexDirection: 'column',
    border: 1,
    borderColor: 'black',
    width: '25%'
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
    borderColor: 'black',
    height: '20px',
    fontSize: 9
  },
  text: {
    flex: 1,
    width: '80%',
    textAlign: 'center',
    fontSize: 10 
  },
  text2: {
    flex: 1,
    textAlign: 'center',
    fontSize: 10,
    marginTop: 25
  },
  image: {
    width: 60,
  },
  imageSennova: {
    width: 100
  },
  headerText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 10,
  },
  sectionPrimera: {
    marginTop: 25,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'extrabold',
    marginBottom: 15,
  },
  sectionTitleFisicos: {
    fontSize: 11,
    fontWeight: 'extrabold',
    marginBottom: 15
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
    padding: 30,
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
    padding: 3,
    height: '20px'
  },
  tableCellMuestra: {
    fontSize: 10,
    padding: 3,
    width: '130px'
  },
  tableCellDatos: {
    fontSize: 10,
    padding: 3,
    borderWidth: 1,
    borderStyle: 'solid', 
    borderColor: '#000',
    width: '150px',
    height: '30px'
  },
  tableCellValorDatos: {
    fontSize: 10,
    padding: 3,
    borderWidth: 1,
    borderStyle: 'solid', 
    borderColor: '#000',
    width: '115px',
    height: '30px'
  },
  tableColDatos: {
    width: '80%'
  },
  tableHeader: {
    fontWeight: 'bold',
  },
  tableColHeader: {
    width: '96%',
    height: '25px',
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
    width: '100%',
  },
  tableFisicos: {
    width: '558px',
    flex: 1,
    flexDirection: 'column',
    marginBottom: 10,
  },
  tableRowFisicos: {
    flexDirection: 'row',
  },
  tableColVariable: {
    width: '300px',
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
  
  tableColGeneral: {
    width: '230px',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    textAlign: 'center',
    justifyContent: 'center'
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
  tabelSensorial: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: '300px',
    borderStyle:'solid',
    borderWidth: 1,
    borderColor: '#000'
  },
  headerSensorial: {
    width: '100%',
    height: '15px',
    backgroundColor: '#C6E0B4',
    alignItems: 'center',
  },
  textHeaderSensorial: {
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center'
  },
  tableColSensorial: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  tableColSenso: {
    flex: 1,
    flexDirection: 'column',
    height: '30px',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  tableMayor: {
    width: '80%',
    height: '90%',  
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
  },
  headTable: {
    fontSize: 14,
    height: '30px',
  },
  headTableDes: {
    fontSize: 14,
    textAlign: 'center',
    height: '30px',
  },
  tableColVar: {
    height: '25px',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  tableCellDatosSensory: {
    width: '100%',
    height: '20px',
    fontSize: 10,
    padding: 3,
    borderWidth: 1,
    borderStyle: 'solid', 
    borderColor: 'black'
  },
  margins: {
    marginBottom: 200
  }
});

const PDFReport = ({ data, datos }) => (

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
            <Text style={styles.text}>Centro de Gestión y Desarrollo Sostenible </Text>
            <Text style={styles.text}>Surcolombiano</Text>
            <Text style={styles.text}>Escuela Nacional de la Calidad del Café </Text>
          </View>
          <View style={styles.col2}>
            <Text style={styles.text2}>INFORME SERVICIO ANALISIS FISICO SENSORIAL</Text>
          </View>
        </View>
        <View style={styles.row3}>
          <View style={styles.col3}>
            <Image style={styles.imageSennova} src={logoSennova} />
          </View>
          <View style={styles.col3Text}>
            <Text style={styles.textCol3}>CÓDIGO: {data.muestra_id}</Text>
            <Text style={styles.textCol3}>VERSIÓN: 01</Text>
            <Text style={styles.textCol3}>FECHA: 2023-05-05</Text>
            <Text style={styles.textCol3}>PÁGINA: </Text>
            {/* <Text style={styles.textCol3} render={({ pageNumber, totalPages }) => (
              `PÁGINA: ${pageNumber} de ${totalPages}`
            )}  /> */}
          </View>
        </View>
      </View>
        
      <View style={styles.sectionPrimera}>
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
                <Text style={[styles.tableCellMuestra, styles.tableHeader]}>Método para la preparacion de la muestra:</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.altura_MSNM}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={[styles.tableFisicos]}>
        <Text style={styles.sectionTitle}>4. Datos Generales del Café:</Text>
        <View style={styles.plusCol}>
          <View style={styles.halfTable}>
            <View style={[styles.tableRowFisicos]}>
              <View style={styles.tableColVariable}>
                <Text style={[styles.tableCellDatos]}>Tipo De Molienda: </Text>
                <Text style={[styles.tableCellDatos]}>Tipo de Fermentacion: </Text>
                <Text style={[styles.tableCellDatos]}>Densidad De Café Verede(g/l): </Text>
                <Text style={[styles.tableCellDatos]}>Fecha De Procesamiento: </Text>
                <Text style={ styles.tableCellDatos }> Código de la muestra: </Text>
              </View>
              <View style={styles.tableColGeneral}>
                <Text style={styles.tableCellValorDatos}>{data.tipo_molienda}</Text>
                <Text style={styles.tableCellValorDatos}>{data.proceso_fermentacion}</Text>
                <Text style={styles.tableCellValorDatos}>{data.densidad_cafe}</Text>
                <Text style={styles.tableCellValorDatos}>{new Date(data.fecha).toLocaleDateString('es-CO')}</Text>
                <Text style={styles.tableCellValorDatos}>{data.muestra_id}</Text>
              </View>
            </View>
          </View>
          <View style={[styles.halfTable]}>
            <View style={styles.tableRowFisicos}>
              <View style={styles.tableColVariable}>
                <Text style={styles.tableCellDatos}> Tipo de Tostión: </Text>
                <Text style={styles.tableCellDatos}> Tiempo de Fermentación: </Text>
                <Text style={styles.tableCellDatos}> Actividad De Agua(Aw): </Text>
                <Text style={styles.tableCellDatos}> Tipo De Secado: </Text>
                <Text style={styles.tableCellDatos}> Presentación: </Text>
              </View>
              <View style={styles.tableColGeneral}>
                <Text style={styles.tableCellValorDatos}> {data.tipo_tostion} </Text>
                <Text style={styles.tableCellValorDatos}> {data.tiempo_fermentacion} </Text>
                <Text style={styles.tableCellValorDatos}> {data.actividad_agua} </Text>
                <Text style={styles.tableCellValorDatos}> {data.tiempo_secado} </Text>
                <Text style={styles.tableCellValorDatos}> {data.presentacion} </Text>
              </View>
            </View>
          </View>
          
        </View>
      </View>

    </Page>
    <Page size='A4' style={styles.page}>
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
            <Text style={styles.text}>Centro de Gestión y Desarrollo Sostenible </Text>
            <Text style={styles.text}>Surcolombiano</Text>
            <Text style={styles.text}>Escuela Nacional de la Calidad del Café </Text>
          </View>
          <View style={styles.col2}>
            <Text style={styles.text2}>INFORME SERVICIO ANALISIS FISICO SENSORIAL</Text>
          </View>
        </View>
        <View style={styles.row3}>
          <View style={styles.col3}>
            <Image style={styles.imageSennova} src={logoSennova} />
          </View>
          <View style={styles.col3Text}>
            <Text style={styles.textCol3}>CÓDIGO: {data.muestra_id}</Text>
            <Text style={styles.textCol3}>VERSIÓN: 01</Text>
            <Text style={styles.textCol3}>FECHA: 2023-05-05</Text>
            <Text style={styles.textCol3}>PÁGINA: </Text>
            {/* <Text style={styles.textCol3} render={({ pageNumber, totalPages }) => (
              `PÁGINA: ${pageNumber} de ${totalPages}`
            )}  /> */}
          </View>
        </View>
      </View>
    {data ? (
        <>
          <Text style={styles.sectionTitleFisicos}>5. Análisis Físico:</Text>
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
        </>
      ): (
        'No hay resultados'
      )}
    </Page>
    <Page size='A4' style={styles.page}>
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
            <Text style={styles.text}>Centro de Gestión y Desarrollo Sostenible </Text>
            <Text style={styles.text}>Surcolombiano</Text>
            <Text style={styles.text}>Escuela Nacional de la Calidad del Café </Text>
          </View>
          <View style={styles.col2}>
            <Text style={styles.text2}>INFORME SERVICIO ANALISIS FISICO SENSORIAL</Text>
          </View>
        </View>
        <View style={styles.row3}>
          <View style={styles.col3}>
            <Image style={styles.imageSennova} src={logoSennova} />
          </View>
          <View style={styles.col3Text}>
            <Text style={styles.textCol3}>CÓDIGO: {data.muestra_id}</Text>
            <Text style={styles.textCol3}>VERSIÓN: 01</Text>
            <Text style={styles.textCol3}>FECHA: 2023-05-05</Text>
            <Text style={styles.textCol3}>PÁGINA: </Text>
            {/* <Text style={styles.textCol3} render={({ pageNumber, totalPages }) => (
              `PÁGINA: ${pageNumber} de ${totalPages}`
            )}  /> */}
          </View>
        </View>
      </View>
{datos ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Resultados:</Text>
            <View style={styles.headerSensorial}>
              <Text style={styles.textHeaderSensorial}> Datos Generales De La Muestra </Text>
            </View>
          <View style={styles.tabelSensorial}>
            <View style={styles.tableMayor}>
                <View style={styles.plusCol}>
                  <View style={styles.halfTable}>
                    <View style={styles.tableRowFisicos}>
                      <View style={styles.tableColSensorial}>
                        <Text style={styles.headTable}> ATRIBUTO </Text>
                        <Text style={styles.tableCellDatosSensory}> Fragancia Aroma: </Text>  
                        <Text style={styles.tableCellDatosSensory}> Sabor: </Text>  
                        <Text style={styles.tableCellDatosSensory}> Retrogusto: </Text>  
                        <Text style={styles.tableCellDatosSensory}> Acidez: </Text>  
                        <Text style={styles.tableCellDatosSensory}> Cuerpo: </Text>  
                        <Text style={styles.tableCellDatosSensory}> Uniformidad: </Text>  
                        <Text style={styles.tableCellDatosSensory}> Balance: </Text>  
                        <Text style={styles.tableCellDatosSensory}> Taza limpia: </Text>  
                        <Text style={styles.tableCellDatosSensory}> Dulzor: </Text>  
                        <Text style={styles.tableCellDatosSensory}> Puntaje general: </Text>  
                        <Text style={styles.tableCellDatosSensory}> Puntaje total: </Text>  
                      </View>
                    </View>
                  </View>
                  <View style={styles.halfTable}>
                  <View style={styles.tableRowFisicos}>
                    <View style={styles.tableColSensorial}>
                      <Text style={styles.headTable}> PUNTAJE </Text>
                      <Text style={styles.tableCellDatosSensory}> {datos.aroma} </Text>  
                    </View>
                  </View>
                  </View>
                  <View style={styles.halfTable}>
                    <View style={styles.tableColSenso}>
                      <Text style={styles.headTableDes}> DESCRIPCIÓN </Text>
                      <Text style={styles.headTableDes}> SENSORIAL </Text>
                    </View>
                  </View>
                </View>
            </View>
          </View>
        </View>
      ): (
        ''
      )}
    </Page>
  </Document>
);

export default PDFReport; 

/* import React from 'react';
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
    height: '15%'
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
    width: '55%',
  },
  row3: {
    display: 'flex',
    flexDirection: 'column',
    border: 1,
    borderColor: 'black',
    width: '25%'
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
    borderColor: 'black',
    height: '20px',
    fontSize: 9
  },
  text: {
    flex: 1,
    width: '80%',
    textAlign: 'center',
    fontSize: 10 
  },
  text2: {
    flex: 1,
    textAlign: 'center',
    fontSize: 10,
    marginTop: 25
  },
  image: {
    width: 60,
  },
  imageSennova: {
    width: 100
  },
  headerText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 10,
  },
  sectionPrimera: {
    marginTop: 25,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'extrabold',
    marginBottom: 15,
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
    padding: 30,
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
    padding: 3,
    height: '20px'
  },
  tableCellMuestra: {
    fontSize: 10,
    padding: 3,
    width: '130px'
  },
  tableCellDatos: {
    fontSize: 10,
    padding: 3,
    borderWidth: 1,
    borderStyle: 'solid', 
    borderColor: '#000',
    width: '150px',
    height: '30px'
  },
  tableCellValorDatos: {
    fontSize: 10,
    padding: 3,
    borderWidth: 1,
    borderStyle: 'solid', 
    borderColor: '#000',
    width: '115px',
    height: '30px'
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
    width: '558px',
    flex: 1,
    flexDirection: 'column',
    marginBottom: 10,
  },
  tableRowFisicos: {
    flexDirection: 'row',
  },
  tableColVariable: {
    width: '300px',
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
  
  tableColGeneral: {
    width: '230px',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    textAlign: 'center',
    justifyContent: 'center'
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
  tabelSensorial: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: '300px',
    borderStyle:'solid',
    borderWidth: 1,
    borderColor: '#000'
  },
  headerSensorial: {
    width: '100%',
    height: '15px',
    backgroundColor: '#C6E0B4',
    alignItems: 'center',
  },
  textHeaderSensorial: {
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center'
  },
  tableColSensorial: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  tableColSenso: {
    flex: 1,
    flexDirection: 'column',
    height: '30px',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  tableMayor: {
    width: '80%',
    height: '90%',  
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
  },
  headTable: {
    fontSize: 14,
    height: '30px',
  },
  headTableDes: {
    fontSize: 14,
    textAlign: 'center',
    height: '30px',
  },
  tableColVar: {
    height: '25px',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  tableCellDatosSensory: {
    width: '100%',
    height: '20px',
    fontSize: 10,
    padding: 3,
    borderWidth: 1,
    borderStyle: 'solid', 
    borderColor: 'black'
  }
});

const PDFReport = ({ data, datos }) => {
  const rowsPerPage = 15; // Número de filas por página

  const splitData = (data) => {
    const result = [];
    for (let i = 0; i < data.length; i += rowsPerPage) {
      result.push(data.slice(i, i + rowsPerPage));
    }
    return result;
  };

  const renderTable = (data) => (

<View style={styles.section}>
<>

          <Text style={styles.sectionTitle}>5. Análisis Físico:</Text>
          <View style={styles.tableFisicos}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeaderFisicos} >Análisis Físicos</Text>
            </View>
            <View style={styles.plusCol}>
              <View style={styles.halfTable}>
              {data.map((row, index) => (
                <View key={index} style={styles.tableRowFisicos}>
                  <View style={styles.tableColVariable}>
                    <Text style={styles.tableCell}>{row.variable}</Text>
                  </View>
                  <View style={styles.tableColValor}>
                    <Text style={styles.tableCell}>{row.valor}</Text>
                  </View>
                </View>
              ))}
              </View>
            </View>
          </View>
          </>
        </View>

    <View style={styles.tableFisicos}>
      <View style={styles.tableColHeader}>
        <Text style={styles.tableCellHeaderFisicos}>Análisis Físicos</Text>
      </View>
      {data.map((row, index) => (
        <View key={index} style={styles.tableRowFisicos}>
          <View style={styles.tableColVariable}>
            <Text style={styles.tableCell}>{row.variable}</Text>
          </View>
          <View style={styles.tableColValor}>
            <Text style={styles.tableCell}>{row.valor}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const pages = splitData(data.resultados);

  return (
    <Document>
      {pages.map((pageData, pageIndex) => (
        <Page size="A4" style={styles.page} key={pageIndex}>
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
                <Text style={styles.textCol3}>PÁGINA: {pageIndex + 1} de {pages.length}</Text>
              </View>
            </View>
          </View>
          {pageIndex === 0 && (
            <>
              <View style={styles.sectionPrimera}>
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
                        <Text style={[styles.tableCellMuestra, styles.tableHeader]}>Método para la preparacion de la muestra:</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{data.altura_MSNM}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View style={[styles.tableFisicos]}>
        <Text style={styles.sectionTitle}>4. Datos Generales del Café:</Text>
        <View style={styles.plusCol}>
          <View style={styles.halfTable}>
            <View style={[styles.tableRowFisicos]}>
              <View style={styles.tableColVariable}>
                <Text style={[styles.tableCellDatos]}>Tipo De Molienda: </Text>
                <Text style={[styles.tableCellDatos]}>Tipo de Fermentacion: </Text>
                <Text style={[styles.tableCellDatos]}>Densidad De Café Verede(g/l): </Text>
                <Text style={[styles.tableCellDatos]}>Fecha De Procesamiento: </Text>
                <Text style={ styles.tableCellDatos }> Código de la muestra: </Text>
              </View>
              <View style={styles.tableColGeneral}>
                <Text style={styles.tableCellValorDatos}>{data.tipo_molienda}</Text>
                <Text style={styles.tableCellValorDatos}>{data.proceso_fermentacion}</Text>
                <Text style={styles.tableCellValorDatos}>{data.densidad_cafe}</Text>
                <Text style={styles.tableCellValorDatos}>{new Date(data.fecha).toLocaleDateString('es-CO')}</Text>
                <Text style={styles.tableCellValorDatos}>{data.muestra_id}</Text>
              </View>
            </View>
          </View>
          <View style={styles.halfTable}>
            <View style={styles.tableRowFisicos}>
              <View style={styles.tableColVariable}>
                <Text style={styles.tableCellDatos}> Tipo de Tostión: </Text>
                <Text style={styles.tableCellDatos}> Tiempo de Fermentación: </Text>
                <Text style={styles.tableCellDatos}> Actividad De Agua(Aw): </Text>
                <Text style={styles.tableCellDatos}> Tipo De Secado: </Text>
                <Text style={styles.tableCellDatos}> Presentación: </Text>
              </View>
              <View style={styles.tableColGeneral}>
                <Text style={styles.tableCellValorDatos}> {data.tipo_tostion} </Text>
                <Text style={styles.tableCellValorDatos}> {data.tiempo_fermentacion} </Text>
                <Text style={styles.tableCellValorDatos}> {data.actividad_agua} </Text>
                <Text style={styles.tableCellValorDatos}> {data.tiempo_secado} </Text>
                <Text style={styles.tableCellValorDatos}> {data.presentacion} </Text>
              </View>
            </View>
          </View>
          
        </View>
      </View>
            </>
          )}
          {renderTable(pageData)}
          {datos ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Resultados:</Text>
            <View style={styles.headerSensorial}>
              <Text style={styles.textHeaderSensorial}> Datos Generales De La Muestra </Text>
            </View>
          <View style={styles.tabelSensorial}>
            <View style={styles.tableMayor}>
                <View style={styles.plusCol}>
                  <View style={styles.halfTable}>
                    <View style={styles.tableRowFisicos}>
                      <View style={styles.tableColSensorial}>
                        <Text style={styles.headTable}> ATRIBUTO </Text>
                        <Text style={styles.tableCellDatosSensory}> Fragancia Aroma: </Text>  
                        <Text style={styles.tableCellDatosSensory}> Sabor: </Text>  
                        <Text style={styles.tableCellDatosSensory}> Retrogusto: </Text>  
                        <Text style={styles.tableCellDatosSensory}> Acidez: </Text>  
                        <Text style={styles.tableCellDatosSensory}> Cuerpo: </Text>  
                        <Text style={styles.tableCellDatosSensory}> Uniformidad: </Text>  
                        <Text style={styles.tableCellDatosSensory}> Balance: </Text>  
                        <Text style={styles.tableCellDatosSensory}> Taza limpia: </Text>  
                        <Text style={styles.tableCellDatosSensory}> Dulzor: </Text>  
                        <Text style={styles.tableCellDatosSensory}> Puntaje general: </Text>  
                        <Text style={styles.tableCellDatosSensory}> Puntaje total: </Text>  
                      </View>
                    </View>
                  </View>
                  <View style={styles.halfTable}>
                  <View style={styles.tableRowFisicos}>
                    <View style={styles.tableColSensorial}>
                      <Text style={styles.headTable}> PUNTAJE </Text>
                      <Text style={styles.tableCellDatosSensory}> {datos.aroma} </Text>  
                    </View>
                  </View>
                  </View>
                  <View style={styles.halfTable}>
                    <View style={styles.tableColSenso}>
                      <Text style={styles.headTableDes}> DESCRIPCIÓN </Text>
                      <Text style={styles.headTableDes}> SENSORIAL </Text>
                    </View>
                  </View>
                </View>
            </View>
          </View>
        </View>
      ): (
        ''
      )}
        </Page>
      ))}
    </Document>
  );
};

export default PDFReport; */
