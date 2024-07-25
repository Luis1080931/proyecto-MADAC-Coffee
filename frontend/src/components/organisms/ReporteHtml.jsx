import React, { useEffect, useState } from 'react';
import logoSena from './../../assets/icons/logoPDFSENA.png'
import logoSennova from './../../assets/icons/logoSennova.png'
import logoENCC from './../../assets/icons/ENCC.jpg'
import RadarChart from './RadarGraphic.jsx';

const styles = {
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    height: '150px'
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
    height: '106px',
    marginTop: 2
  },
  row3: {
    flex:1,
    flexDirection: 'column',
    border: 1,
    borderColor: 'black',
    width: '25%',
    marginTop: 16,
  },
  col1: {
    marginTop: 17,
    height: '60px',
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  col2: {
    height: '60px',
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    labelAlign: 'center'
  },
  col3: {
    height: '60px',
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  col3label: {
    height: '43px',
    borderWidth: 1,
    borderColor: 'black',
    fontSize: 8,
    flex: 1,
    flexDirection: 'column'
  },
  labelCol3: {
    borderBottomWidth: 1,
    borderColor: 'black',
    height: '20px',
    fontSize: 9,
    flex: 1,
    flexDirection: 'column'
  },
  label: {
    flex: 1,
    width: '80%',
    labelAlign: 'center',
    fontSize: 10
  },
  label2: {
    flex: 1,
    labelAlign: 'center',
    fontSize: 10,
    marginTop: 25
  },
  img: {
    width: 60,
  },
  imgSennova: {
    width: 100
  },
  headerlabel: {
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
  sectionlabel: {
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
    labelAlign: 'center',
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
    labelAlign: 'center',
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
  labelHeaderSensorial: {
    fontSize: 13,
    fontWeight: '700',
    labelAlign: 'center'
  },
  tableColSensorial: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    labelAlign: 'center',
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
    labelAlign: 'center'
  },
  tableMayor: {
    width: '80%',
    height: '85%',  
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
  },
  headTable: {
    fontSize: 10,
    height: '30px',
    width: '100%',
    flexWrap: 'wrap',
    margin: 0,
    fontWeight: '700',
    labelAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headTableDes: {
    fontSize: 14,
    labelAlign: 'center',
    height: '30px',
  },
  tableColVar: {
    height: '25px',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    labelAlign: 'center',
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
  },
  firmas: {
    flexDirection: 'row',
    width: '100%',
    marginTop: '300px'
  },
  recuadros: {
    height: '80px',
    width: '250px',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'flex-end',
    alignItems: 'center',
    labelAlign: 'center',
    flexDirection: 'column'
  },
  firmaslabel: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  document: {
    width: '700px',
    justifyContent: 'center'
  }
}

const PDFReport = () => {

return (
    <div className='flex justify-center items-center'>
    <div style={styles.document}>
      <div style={styles.header} >
        <div style={styles.row1}>
          <div className='border-1 border-black mt-4 flex justify-center h-[60px]'>
            <img style={styles.img} src={logoSena} />
          </div>
          <div className='border-1 border-black h-[60px] flex justify-center'>
            <img style={styles.img} src={logoENCC} />
          </div>
        </div>
        <div style={styles.row2}>
          <div className='border-1 border-black text-center justify-center items-center h-[60px]'>
            <label className='flex text-sm text-center justify-center'>Centro de Gestión y Desarrollo Sostenible </label>
            <label className='flex text-sm justify-center'>Surcolombiano</label>
            <label className='flex text-sm justify-center'>Escuela Nacional de la Calidad del Café </label>
          </div>
          <div className='border-1 border-black h-[60px] flex items-center justify-center'>
            <label className='flex text-sm justify-center items-center text-center'>INFORME SERVICIO ANALISIS FISICO SENSORIAL</label>
          </div>
        </div>
        <div style={styles.row3}>
          <div className='border-1 border-black flex h-[60px] justify-center'>
            <img style={styles.imgSennova} src={logoSennova} />
          </div>
          <div className='flex flex-col border-1 border-black h-[60px]'>
            <label style={styles.labelCol3}>CÓDIGO: {/* {data.muestra_id} */}</label>
            <label style={styles.labelCol3}>VERSIÓN: 01</label>
            <label style={styles.labelCol3}>FECHA: 2023-05-05</label>
            <label style={styles.labelCol3}>PÁGINA: </label>
            {/* <label style={styles.labelCol3} render={({ pageNumber, totalPages }) => (
              `PÁGINA: ${pageNumber} de ${totalPages}`
            )}  /> */}
          </div>
        </div>
      </div>
        
      <div className='flex flex-col m-8'>
        <label className='text-sm font-bold mb-5'>1. Objetivo</label>
        <label className='text-sm'>El objetivo del siguiente informe es presentar los resultados del análisis físico-sensorial obtenidos para la muestra de café {/* {data.muestra_id} */} descrita a continuación.</label>
      </div>
      <div className='flex flex-col m-8'>
        <label className='text-sm font-bold mb-5'>2. Información General:</label>
        <label className='text-sm'>Caficultor: {/* {data.caficultor_nombre} */}</label>
        <label className='text-sm'>Departamento: {/* {data.municipio} */}</label>
        <label className='text-sm'>Vereda: {/* {data.vereda} */}</label>
        <label className='text-sm'>Nombre de la finca: {/* {data.nombre_finca} */}</label>
        <label className='text-sm'>Código de la muestra: {/* {data.muestra_id} */}</label>
      </div>
      <div style={styles.section}>
        <label className='text-sm font-bold ml-8'>3. Especificaciones del Café:</label>
        <div className='flex flex-row border-1 border-black h-auto mt-3'>
          <div className='flex flex-col w-[350px]'>
            <div className='flex flex-row'>
              <div className='border-1 border-black w-[250px]'>
                <label className='text-sm'>Variedad del Café</label>
              </div>
              <div className='border-1 border-black w-[100px]'>
                <label style={styles.tableCell}>{/* {data.variedad} */}</label>
              </div>
            </div>
            <div className='flex flex-row h-[49px]'>
              <div className='border-1 border-black w-[250px]'>
                <label className='text-sm'>Altura sobre el nivel del mar</label>
              </div>
              <div className='border-1 border-black w-[100px]'>
                <label style={styles.tableCell}>{/* {data.altura_MSNM} */}</label>
              </div>
            </div>
          </div>
          <div className='flex flex-col w-[350px]'>
            <div className='flex flex-row'>
              <div className='border-1 border-black w-[250px]'>
                <label className='text-sm flex-wrap'>Método de muestreo: </label>
              </div>
              <div className='border-1 border-black w-[100px]'>
                <label className='text-sm flex-wrap'>{/* {data.variedad} */}</label>
              </div>
            </div>
            <div className='flex flex-row'>
              <div className='border-1 border-black w-[250px]'>
                <label className='text-sm'>Método para la preparacion de la muestra:</label>
              </div>
              <div className='border-1 border-black w-[100px]'>
                <label className='text-sm flex-wrap'>{/* {data.altura_MSNM} */}</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.tableFisicos}>
        <label className='flex text-sm font-bold m-8'>4. Datos Generales del Café:</label>
        <div className='flex flex-row'>
            <div className='flex flex-row'>
              <div className='flex flex-col w-[235px]'>
                <label className='border-1 border-black text-sm h-[30px]'>Tipo De Molienda: </label>
                <label className='border-1 border-black text-sm h-[30px]'>Tipo de Fermentacion: </label>
                <label className='border-1 border-black text-sm h-[30px]'>Densidad De Café Verede(g/l): </label>
                <label className='border-1 border-black text-sm h-[30px]'>Fecha De Procesamiento: </label>
                <label className='border-1 border-black text-sm h-[30px]'> Código de la muestra: </label>
              </div>
              <div className='flex flex-col'>
                <label style={styles.tableCellValorDatos}>{/* {data.tipo_molienda} */}</label>
                <label style={styles.tableCellValorDatos}>{/* {data.proceso_fermentacion} */}</label>
                <label style={styles.tableCellValorDatos}>{/* {data.densidad_cafe} */}</label>
                <label style={styles.tableCellValorDatos}>{/* {new Date(data.fecha).toLocaleDateString('es-CO')} */}</label>
                <label style={styles.tableCellValorDatos}>{/* {data.muestra_id} */}</label>
              </div>
          </div>
          <div className='flex flex-col'>
            <div className='flex flex-row'>
              <div className='flex flex-col w-[235px]'>
                <label className='border-1 border-black h-[30px] text-sm'> Tipo de Tostión: </label>
                <label className='border-1 border-black h-[30px] text-sm'> Tiempo de Fermentación: </label>
                <label className='border-1 border-black h-[30px] text-sm'> Actividad De Agua(Aw): </label>
                <label className='border-1 border-black h-[30px] text-sm'> Tipo De Secado: </label>
                <label className='border-1 border-black h-[30px] text-sm'> Presentación: </label>
              </div>
              <div className='flex flex-col'>
                <label style={styles.tableCellValorDatos}> {/* {data.tipo_tostion} */} </label>
                <label style={styles.tableCellValorDatos}> {/* {data.tiempo_fermentacion} */} </label>
                <label style={styles.tableCellValorDatos}> {/* {data.actividad_agua} */} </label>
                <label style={styles.tableCellValorDatos}> {/* {data.tiempo_secado} */} </label>
                <label style={styles.tableCellValorDatos}> {/* {data.presentacion} */} </label>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    <div style={styles.header} >
        <div style={styles.row1}>
          <div style={styles.col1}>
            <img style={styles.img} src={logoSena} />
          </div>
          <div style={styles.col1}>
            <img style={styles.img} src={logoENCC} />
          </div>
        </div>
        <div style={styles.row2}>
          <div style={styles.col2}>
            <label style={styles.label}>Centro de Gestión y Desarrollo Sostenible </label>
            <label style={styles.label}>Surcolombiano</label>
            <label style={styles.label}>Escuela Nacional de la Calidad del Café </label>
          </div>
          <div style={styles.col2}>
            <label style={styles.label2}>INFORME SERVICIO ANALISIS FISICO SENSORIAL</label>
          </div>
        </div>
        <div style={styles.row3}>
          <div style={styles.col3}>
            <img style={styles.imgSennova} src={logoSennova} />
          </div>
          <div style={styles.col3label}>
            <label style={styles.labelCol3}>CÓDIGO: {/* {data.muestra_id} */}</label>
            <label style={styles.labelCol3}>VERSIÓN: 01</label>
            <label style={styles.labelCol3}>FECHA: 2023-05-05</label>
            <label style={styles.labelCol3}>PÁGINA: </label>
            {/* <label style={styles.labelCol3} render={({ pageNumber, totalPages }) => (
              `PÁGINA: ${pageNumber} de ${totalPages}`
            )}  /> */}
          </div>
        </div>
      </div>
        <>
          <label style={styles.sectionTitleFisicos}>5. Análisis Físico:</label>
          <div style={styles.tableFisicos}>
            <div style={styles.tableColHeader}>
              <label style={styles.tableCellHeaderFisicos} >Análisis Físicos</label>
            </div>
            <div style={styles.plusCol}>
              {/* <div style={styles.halfTable}>
                {[...Array(15)].map((_, index) => (
                <div key={index} style={styles.tableRowFisicos}>
                  <div style={styles.tableColVariable}>
                    <label style={styles.tableCell}>{data.resultados[index].variable}</label>
                  </div>
                  <div style={styles.tableColValor}>
                    <label style={styles.tableCell}>{data.resultados[index].valor}</label>
                  </div>
                </div>
                ))}
              </div> */}
              {/* <div style={styles.halfTable}>
                {[...Array(15)].map((_, index) => (
                  <div key={index} style={styles.tableRowFisicos}>
                    <div style={styles.tableColVariable}>
                      <label style={styles.tableCell}>{data.resultados[index + 15].variable}</label>
                    </div>
                    <div style={styles.tableColValor}>
                      <label style={styles.tableCell}>{data.resultados[index + 15].valor}</label>
                    </div>
                  </div>
                ))}
              </div> */}
            </div>
          </div>
        </>
        <>
    <div style={styles.header} >
        <div style={styles.row1}>
          <div style={styles.col1}>
            <img style={styles.img} src={logoSena} />
          </div>
          <div style={styles.col1}>
            <img style={styles.img} src={logoENCC} />
          </div>
        </div>
        <div style={styles.row2}>
          <div style={styles.col2}>
            <label style={styles.label}>Centro de Gestión y Desarrollo Sostenible </label>
            <label style={styles.label}>Surcolombiano</label>
            <label style={styles.label}>Escuela Nacional de la Calidad del Café </label>
          </div>
          <div style={styles.col2}>
            <label style={styles.label2}>INFORME SERVICIO ANALISIS FISICO SENSORIAL</label>
          </div>
        </div>
        <div style={styles.row3}>
          <div style={styles.col3}>
            <img style={styles.imgSennova} src={logoSennova} />
          </div>
          <div style={styles.col3label}>
            <label style={styles.labelCol3}>CÓDIGO: {/* {data.muestra_id} */}</label>
            <label style={styles.labelCol3}>VERSIÓN: 01</label>
            <label style={styles.labelCol3}>FECHA: 2023-05-05</label>
            <label style={styles.labelCol3}>PÁGINA: </label>
            {/* <label style={styles.labelCol3} render={({ pageNumber, totalPages }) => (
              `PÁGINA: ${pageNumber} de ${totalPages}`
            )}  /> */}
          </div>
        </div>
      </div>
        <div style={styles.section}>
          <label style={styles.sectionTitle}>6. Resultados:</label>
            <div style={styles.headerSensorial}>
              <label style={styles.labelHeaderSensorial}> Datos Generales De La Muestra </label>
            </div>
          <div style={styles.tabelSensorial}>
            <div style={styles.tableMayor}>
                <div style={styles.plusCol}>
                  <div style={styles.halfTable}>
                    {/* <div style={styles.tableRowFisicos}> */}
                      <div style={styles.tableColSensorial}>
                        <label style={styles.headTable}> ATRIBUTO </label>
                      </div>
                        <label style={styles.tableCellDatosSensory}> Fragancia Aroma: </label>  
                        <label style={styles.tableCellDatosSensory}> Sabor: </label>  
                        <label style={styles.tableCellDatosSensory}> Retrogusto: </label>  
                        <label style={styles.tableCellDatosSensory}> Acidez: </label>  
                        <label style={styles.tableCellDatosSensory}> Cuerpo: </label>  
                        <label style={styles.tableCellDatosSensory}> Uniformidad: </label>  
                        <label style={styles.tableCellDatosSensory}> Balance: </label>  
                        <label style={styles.tableCellDatosSensory}> Taza limpia: </label>  
                        <label style={styles.tableCellDatosSensory}> Dulzor: </label>  
                        <label style={styles.tableCellDatosSensory}> Puntaje general: </label>  
                        <label style={styles.tableCellDatosSensory}> Puntaje total: </label>  
                    {/* </div> */}
                  </div>
                  <div style={styles.halfTable}>
                  {/* <div style={styles.tableRowFisicos}> */}
                    <div style={styles.tableColSensorial}>
                      <label style={styles.headTable}> PUNTAJE </label>
                    </div>
                        <label style={styles.tableCellDatosSensory}> {/* {datos.aroma}  */}</label>  
                        <label style={styles.tableCellDatosSensory}> {/* {datos.sabor} */} </label>  
                        <label style={styles.tableCellDatosSensory}> {/* {datos.postgusto} */} </label>  
                        <label style={styles.tableCellDatosSensory}> {/* {datos.acidez} */} </label>  
                        <label style={styles.tableCellDatosSensory}> {/* {datos.cuerpo} */} </label>  
                        <label style={styles.tableCellDatosSensory}> {/* {datos.uniformidad} */} </label>  
                        <label style={styles.tableCellDatosSensory}> {/* {datos.balance} */} </label>  
                        <label style={styles.tableCellDatosSensory}> {/* {datos.taza_limpia} */} </label>  
                        <label style={styles.tableCellDatosSensory}> {/* {datos.dulzura} */} </label>  
                        <label style={styles.tableCellDatosSensory}> {/* {datos.punteo} */} </label>  
                        <label style={styles.tableCellDatosSensory}> {/* {datos.punteo_final} */} </label>  
                  {/* </div> */}
                  </div>
                  <div style={styles.halfTable}>
                    <div style={styles.tableColSensorial}>
                      <label style={styles.headTable}> DESCRIPCIÓN SENSORIAL</label>
                      {/* <label style={styles.headTable}> SENSORIAL </label> */}
                    </div>
                      <label style={styles.headTableDes}> {/* {datos.notas} */} </label>
                  </div>
                </div>
            </div>
          </div>
          {/* <img src={radarChart} /> */}
        </div>
    <div style={styles.header}>
        <div style={styles.row1}>
          <div style={styles.col1}>
            <img style={styles.img} src={logoSena} />
          </div>
          <div style={styles.col1}>
            <img style={styles.img} src={logoENCC} />
          </div>
        </div>
        <div style={styles.row2}>
          <div style={styles.col2}>
            <label style={styles.label}>Centro de Gestión y Desarrollo Sostenible </label>
            <label style={styles.label}>Surcolombiano</label>
            <label style={styles.label}>Escuela Nacional de la Calidad del Café </label>
          </div>
          <div style={styles.col2}>
            <label style={styles.label2}>INFORME SERVICIO ANALISIS FISICO SENSORIAL</label>
          </div>
        </div>
        <div style={styles.row3}>
          <div style={styles.col3}>
            <img style={styles.imgSennova} src={logoSennova} />
          </div>
          <div style={styles.col3label}>
            <label style={styles.labelCol3}>CÓDIGO: {/* {data.muestra_id} */}</label>
            <label style={styles.labelCol3}>VERSIÓN: 01</label>
            <label style={styles.labelCol3}>FECHA: 2023-05-05</label>
            <label style={styles.labelCol3}>PÁGINA: </label>
            {/* <label style={styles.labelCol3} render={({ pageNumber, totalPages }) => (
              `PÁGINA: ${pageNumber} de ${totalPages}`
            )}  /> */}
          </div>
        </div>
      </div>
      <div style={styles.section}>
        <label style={styles.sectionTitle}> 7. Conclusión y recomendaciones: </label>
        <label style={styles.sectionlabel}> Se recomienda hacer un análisis de suelo, para que pueda hacer una regulación de pH y así realizar una
correcta fertilización del café, además se recomienda hacer una buena recolección seleccionando solo
frutos maduros evitando granos inmaduros y sobre maduros. </label>
      </div>
      <div style={styles.firmas}>
        <div style={styles.recuadros}>
              <label style={styles.firmaslabel}> Álvaro Murcia </label>
              <label style={styles.firmaslabel}> Instructor Análisis Sensorial - ENCC </label>
              <label style={styles.firmaslabel}> Pitalito </label>
        </div>
        <div style={styles.recuadros}>
              <label style={styles.firmaslabel}> Silvia Andrea Forero Artunduaga </label>
              <label style={styles.firmaslabel}> Instructor Análisis Sensorial - ENCC </label>
              <label style={styles.firmaslabel}> Pitalito </label>
        </div>
        <div style={styles.recuadros}>
              <label style={styles.firmaslabel}> Julio Mario Artunduaga </label>
              <label style={styles.firmaslabel}> Responsable Gestión Técnica - ENCC </label>
              <label style={styles.firmaslabel}> Pitalito </label>
        </div>
      </div>
      </>
    </div>
    </div>

    );
};

export default PDFReport