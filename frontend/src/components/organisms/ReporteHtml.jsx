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
  /* document: {
    width: '300px',
    justifyContent: 'center'
  } */
}

const PDFReportHtml = ({ data, datos }) => {

  const [chartBase64, setChartBase64] = React.useState('');

  const handleBase64Ready = (base64Image) => {
    setChartBase64(base64Image);
  };

return (
    <div className='flex justify-center items-center'>
    <div>
    <div className='flex flex-row w-[500px] mt-12 justify-center items-center ml-[40px]' >
        <div className='w-[150px]'>
          <div className='border-1 border-black flex justify-center items-center h-[60px]'>
            <img className='w-[40px] h-[40px] flex' src={logoSena} />
          </div>
          <div className='border-1 border-black h-[60px] flex justify-center items-center'>
            <img className='w-[40px] h-[40px] flex' src={logoENCC} />
          </div>
        </div>
        <div className='w-[400px]'>
          <div className='border-1 border-black text-center justify-center items-center h-[60px]'>
            <label className='flex text-xs text-center justify-center'>Centro de Gestión y Desarrollo Sostenible </label>
            <label className='flex text-xs justify-center'>Surcolombiano</label>
            <label className='flex text-xs justify-center'>Escuela  Nacional de la Calidad del Café </label>
          </div>
          <div className='border-1 border-black h-[60px] flex items-center justify-center'>
            <label className='flex text-xs justify-center items-center text-center'>INFORME SERVICIO ANALISIS FISICO SENSORIAL</label>
          </div>
        </div>
        <div className='w-[150px]'>
          <div className='border-1 border-black flex h-[60px] justify-center items-center'>
            <img className='w-[90px] h-[90px]' src={logoSennova} />
          </div>
          <div className='flex flex-col'>
            <label className='text-[9px] border-1 border-black h-[15px]'>CÓDIGO: {data.muestra_id}</label>
            <label className='text-[9px] border-1 border-black h-[15px]'>VERSIÓN: 01</label>
            <label className='text-[9px] border-1 border-black h-[15px]'>FECHA: {data.fecha}</label>
            <label className='text-[9px] border-1 border-black h-[15px]'>PÁGINA: </label>
            {/* <label className='text-[9px] border-1 border-black' render={({ pageNumber, totalPages }) => (
              `PÁGINA: ${pageNumber} de ${totalPages}`
            )}  /> */}
          </div>
        </div>
      </div>
        
      <div className='flex flex-col mt-8 ml-16'>
        <label className='text-[10px] font-bold mb-5'>1. Objetivo</label>
        <label className='text-[10px] w-[490px]'>El objetivo del siguiente informe es presentar los resultados del análisis físico-sensorial obtenidos para la muestra de café {data.muestra_id} descrita a continuación.</label>
      </div>
      <div className='flex flex-col mb-8 mt-8 ml-16'>
        <label className='text-[10px] font-bold mb-5'>2. Información General:</label>
        <label className='text-[10px]'>Caficultor: {data.caficultor_nombre}</label>
        <label className='text-[10px]'>Departamento: {data.municipio}</label>
        <label className='text-[10px]'>Vereda: {data.vereda}</label>
        <label className='text-[10px]'>Nombre de la finca: {data.nombre_finca}</label>
        <label className='text-[10px]'>Código de la muestra: {data.muestra_id}</label>
      </div>
      <div>
        <label className='text-[10px] font-bold ml-16'>3. Especificaciones del Café:</label>
        <div className='flex flex-row border-1 w-[500px] h-auto mt-6 ml-[40px]'>
          <div className='flex flex-col w-[250px]'>
            <div className='flex flex-row'>
              <div className='border-1 border-black w-[250px]'>
                <label className='text-[10px]'>Variedad del Café</label>
              </div>
              <div className='border-1 border-black w-[100px]'>
                <label style={styles.tableCell}>{data.variedad}</label>
              </div>
            </div>
            <div className='flex flex-row h-[49px]'>
              <div className='border-1 border-black w-[250px]'>
                <label className='text-[10px]'>Altura sobre el nivel del mar</label>
              </div>
              <div className='border-1 border-black w-[100px]'>
                <label style={styles.tableCell}>{data.altura_MSNM}</label>
              </div>
            </div>
          </div>
          <div className='flex flex-col w-[250px]'>
            <div className='flex flex-row'>
              <div className='border-1 border-black w-[250px]'>
                <label className='text-[10px] flex-wrap'>Método de muestreo: </label>
              </div>
              <div className='border-1 border-black w-[100px]'>
                <label className='text-[10px] flex-wrap'>{data.variedad}</label>
              </div>
            </div>
            <div className='flex flex-row'>
              <div className='border-1 border-black w-[250px]'>
                <label className='text-[10px]'>Método para la preparacion de la muestra:</label>
              </div>
              <div className='border-1 border-black w-[100px]'>
                <label className='text-[10px] flex-wrap'>{data.altura_MSNM}</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col w-[500px]'>
        <label className='flex text-[10px] font-bold mt-8 mb-8 ml-16'>4. Datos Generales del Café:</label>
        <div className='flex flex-row mb-24'>
            <div className='flex flex-row ml-[40px] w-[500px]'>
              <div className='flex flex-col w-[160px]'>
                <label className='border-1 border-black text-[10px] h-[30px]'>Tipo De Molienda: </label>
                <label className='border-1 border-black text-[10px] h-[30px]'>Tipo de Fermentacion: </label>
                <label className='border-1 border-black text-[10px] h-[30px]'>Densidad De Café Verede(g/l): </label>
                <label className='border-1 border-black text-[10px] h-[30px]'>Fecha De Procesamiento: </label>
                <label className='border-1 border-black text-[10px] h-[30px]'> Código de la muestra: </label>
              </div>
              <div className='flex flex-col w-[90px]'>
                <label className='text-[10px] border-1 border-black h-[30px]'>{data.tipo_molienda ? data.tipo_molienda : 'No especifica'}</label>
                <label className='text-[10px] border-1 border-black h-[30px]'>{data.proceso_fermentacion}</label>
                <label className='text-[10px] border-1 border-black h-[30px]'>{data.densidad_cafe ? data.densidad_cafe : 'No especifica'}</label>
                <label className='text-[10px] border-1 border-black h-[30px]'>{new Date(data.fecha).toLocaleDateString('es-CO')}</label>
                <label className='text-[10px] border-1 border-black h-[30px]'>{data.muestra_id}</label>
              </div>
          </div>
          <div className='flex flex-col'>
            <div className='flex flex-row'>
              <div className='flex flex-col w-[160px]'>
                <label className='border-1 border-black h-[30px] text-[10px]'> Tipo de Tostión: </label>
                <label className='border-1 border-black h-[30px] text-[10px]'> Tiempo de Fermentación: </label>
                <label className='border-1 border-black h-[30px] text-[10px]'> Actividad De Agua(Aw): </label>
                <label className='border-1 border-black h-[30px] text-[10px]'> Tipo De Secado: </label>
                <label className='border-1 border-black h-[30px] text-[10px]'> Presentación: </label>
              </div>
              <div className='flex flex-col w-[90px]'>
                <label className='text-[10px] border-1 border-black h-[30px]'> {data.tipo_tostion ? data.tipo_tostion : 'No especifica'} </label>
                <label className='text-[10px] border-1 border-black h-[30px]'> {data.tiempo_fermentacion} </label>
                <label className='text-[10px] border-1 border-black h-[30px]'> {data.actividad_agua ? data.actividad_agua : 'No especifica'} </label>
                <label className='text-[10px] border-1 border-black h-[30px]'> {data.tiempo_secado} </label>
                <label className='text-[10px] border-1 border-black h-[30px]'> {data.presentacion} </label>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      {data ? (
        <>
        <div className='flex flex-row w-[500px] mt-12 justify-center items-center ml-[40px] mb-8' >
          <div className='w-[150px]'>
            <div className='border-1 border-black flex justify-center items-center h-[60px]'>
              <img className='w-[40px] h-[40px] flex' src={logoSena} />
            </div>
            <div className='border-1 border-black h-[60px] flex justify-center items-center'>
              <img className='w-[40px] h-[40px] flex' src={logoENCC} />
            </div>
          </div>
          <div className='w-[400px]'>
            <div className='border-1 border-black text-center justify-center items-center h-[60px]'>
              <label className='flex text-xs text-center justify-center'>Centro de Gestión y Desarrollo Sostenible </label>
              <label className='flex text-xs justify-center'>Surcolombiano</label>
              <label className='flex text-xs justify-center'>Escuela  Nacional de la Calidad del Café </label>
            </div>
            <div className='border-1 border-black h-[60px] flex items-center justify-center'>
              <label className='flex text-xs justify-center items-center text-center'>INFORME SERVICIO ANALISIS FISICO SENSORIAL</label>
            </div>
          </div>
          <div className='w-[150px]'>
            <div className='border-1 border-black flex h-[60px] justify-center items-center'>
              <img className='w-[90px] h-[90px]' src={logoSennova} />
            </div>
            <div className='flex flex-col'>
              <label className='text-[9px] border-1 border-black h-[15px]'>CÓDIGO: {data.muestra_id}</label>
              <label className='text-[9px] border-1 border-black h-[15px]'>VERSIÓN: 01</label>
              <label className='text-[9px] border-1 border-black h-[15px]'>FECHA: 2023-05-05</label>
              <label className='text-[9px] border-1 border-black h-[15px]'>PÁGINA: </label>
              {/* <label className='text-[9px] border-1 border-black' render={({ pageNumber, totalPages }) => (
                `PÁGINA: ${pageNumber} de ${totalPages}`
              )}  /> */}
            </div>
          </div>
        </div>
          <>
            <label className='text-sm font-bold ml-16'>5. Análisis Físico:</label>
            <div className='w-[520px] ml-[40px]'>
              <div className='bg-[#C6E0B4] w-[500px] border-1 border-black mt-5'>
                <label className='flex justify-center'>Análisis Físicos</label>
              </div>
              <div className='flex flex-row w-[500px] mb-60'>
                <div className='flex flex-col'>
                  {[...Array(15)].map((_, index) => (
                  <div key={index} className='flex flex-row'>
                    <div className='border-1 border-black w-[210px] h-[30px]'>
                      <label className='text-sm h-[30px]'>{data.resultados[index].variable}</label>
                    </div>
                    <div className='w-[40px] border-1 border-black flex justify-center h-[30px]'>
                      <label className='text-sm h-[30px]'>{data.resultados[index].promedio_valor}</label>
                    </div>
                  </div>
                  ))}
                </div>
                <div className='flex flex-col'>
                  {[...Array(15)].map((_, index) => (
                    <div key={index} className='flex flex-row'>
                      <div className='border-1 border-black w-[210px] h-[30px]'>
                        <label className='text-sm h-[30px]'>{data.resultados[index + 15].variable}</label>
                      </div>
                      <div className='w-[39px] border-1 border-black flex justify-center h-[30px]'>
                        <label className='text-sm h-[30px]'>{data.resultados[index + 15].promedio_valor}</label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
          </>
      ): ''}
      {datos ? (
        <>
        <div className='flex flex-row w-[500px] mt-12 justify-center items-center ml-[40px]' >
        <div className='w-[150px]'>
          <div className='border-1 border-black flex justify-center items-center h-[60px]'>
            <img className='w-[40px] h-[40px] flex' src={logoSena} />
          </div>
          <div className='border-1 border-black h-[60px] flex justify-center items-center'>
            <img className='w-[40px] h-[40px] flex' src={logoENCC} />
          </div>
        </div>
        <div className='w-[400px]'>
          <div className='border-1 border-black text-center justify-center items-center h-[60px]'>
            <label className='flex text-xs text-center justify-center'>Centro de Gestión y Desarrollo Sostenible </label>
            <label className='flex text-xs justify-center'>Surcolombiano</label>
            <label className='flex text-xs justify-center'>Escuela  Nacional de la Calidad del Café </label>
          </div>
          <div className='border-1 border-black h-[60px] flex items-center justify-center'>
            <label className='flex text-xs justify-center items-center text-center'>INFORME SERVICIO ANALISIS FISICO SENSORIAL</label>
          </div>
        </div>
        <div className='w-[150px]'>
          <div className='border-1 border-black flex h-[60px] justify-center items-center'>
            <img className='w-[90px] h-[90px]' src={logoSennova} />
          </div>
          <div className='flex flex-col'>
            <label className='text-[9px] border-1 border-black h-[15px]'>CÓDIGO: {data.muestra_id}</label>
            <label className='text-[9px] border-1 border-black h-[15px]'>VERSIÓN: 01</label>
            <label className='text-[9px] border-1 border-black h-[15px]'>FECHA: 2023-05-05</label>
            <label className='text-[9px] border-1 border-black h-[15px]'>PÁGINA: </label>
            {/* <label className='text-[9px] border-1 border-black' render={({ pageNumber, totalPages }) => (
              `PÁGINA: ${pageNumber} de ${totalPages}`
            )}  /> */}
          </div>
        </div>
      </div>
        <div style={styles.section}>
          <label className='text-sm font-bold mt-8 ml-16'>6. Resultados:</label>
            <div className='bg-[#C6E0B4] border-1 border-black mt-7 w-[500px] ml-[40px]'>
              <label className='text-sm font-bold flex justify-center'> Datos Generales De La Muestra </label>
            </div>
          <div className='border-1 border-black flex justify-center w-[500px] ml-[40px]'>
            <div className='border-1 border-black w-[430px] mt-7'>
                <div className='flex flex-row'>
                  
                  <div className='border-1 border-black flex flex-col'>
                    <label className='text-xs font-bold border-1 border-black w-[142px] h-[33px] flex justify-center items-center'> ATRIBUTO </label>
                    
                      <label className='border-1 border-black w-[142px] text-[12px]'> Fragancia Aroma: </label>  
                      <label className='border-1 border-black w-[142px] text-[12px]'> Sabor: </label>  
                      <label className='border-1 border-black w-[142px] text-[12px]'> Retrogusto: </label>  
                      <label className='border-1 border-black w-[142px] text-[12px]'> Acidez: </label>  
                      <label className='border-1 border-black w-[142px] text-[12px]'> Cuerpo: </label>  
                      <label className='border-1 border-black w-[142px] text-[12px]'> Uniformidad: </label>  
                      <label className='border-1 border-black w-[142px] text-[12px]'> Balance: </label>  
                      <label className='border-1 border-black w-[142px] text-[12px]'> Taza limpia: </label>  
                      <label className='border-1 border-black w-[142px] text-[12px]'> Dulzor: </label>  
                      <label className='border-1 border-black w-[142px] text-[12px]'> Puntaje general: </label>  
                      <label className='border-1 border-black w-[142px] text-[12px]'> Puntaje total: </label>  
                  </div>
                      <div className='border-1 border-black flex flex-col'>
                        <label className='text-xs font-bold border-1 border-black w-[142px] h-[33px] flex justify-center items-center text-center'> PUNTAJE </label>
                          
                          <label className='border-1 border-black w-[142px] text-[12px] flex justify-center'> {datos.aroma} </label>  
                          <label className='border-1 border-black w-[142px] text-[12px] flex justify-center'> {datos.sabor} </label>  
                          <label className='border-1 border-black w-[142px] text-[12px] flex justify-center'> {datos.postgusto} </label>  
                          <label className='border-1 border-black w-[142px] text-[12px] flex justify-center'> {datos.acidez} </label>  
                          <label className='border-1 border-black w-[142px] text-[12px] flex justify-center'> {datos.cuerpo} </label>  
                          <label className='border-1 border-black w-[142px] text-[12px] flex justify-center'> {datos.uniformidad} </label>  
                          <label className='border-1 border-black w-[142px] text-[12px] flex justify-center'> {datos.balance} </label>  
                          <label className='border-1 border-black w-[142px] text-[12px] flex justify-center'> {datos.taza_limpia} </label>  
                          <label className='border-1 border-black w-[142px] text-[12px] flex justify-center'> {datos.dulzura} </label>  
                          <label className='border-1 border-black w-[142px] text-[12px] flex justify-center'> {datos.punteo} </label>  
                          <label className='border-1 border-black w-[142px] text-[12px] flex justify-center'> {datos.punteo_final} </label>  
                  
                    </div>
                   
                  <div className='border-1 border-black flex flex-col'>
                      <label className='text-xs font-bold border-1 border-black w-[142px] flex justify-center items-center text-center'> DESCRIPCIÓN SENSORIAL</label>
                      <label className='text-sm mt-5 text-justify'> Aqui puedes agregar tus notas catador {/* {datos.notas} */} </label>
                  </div>
                  </div>
            </div>
          </div>
          <div className='bg-[#C6E0B4] border-1 border-black w-[500px] ml-[40px]'>
            <label className='text-sm font-bold flex justify-center'> Análisis de atributos </label>
          </div>
          <div className='border-1 border-black flex justify-center w-[500px] ml-[40px] mb-36'>
              <div className='flex justify-center mt-8'>
                <RadarChart datos={datos} onBase64Ready={handleBase64Ready} />
            </div>
          </div>
          
        </div>
        <div className='flex flex-row w-[500px] mt-12 justify-center items-center ml-[40px]' >
        <div className='w-[150px]'>
          <div className='border-1 border-black flex justify-center items-center h-[60px]'>
            <img className='w-[40px] h-[40px] flex' src={logoSena} />
          </div>
          <div className='border-1 border-black h-[60px] flex justify-center items-center'>
            <img className='w-[40px] h-[40px] flex' src={logoENCC} />
          </div>
        </div>
        <div className='w-[400px]'>
          <div className='border-1 border-black text-center justify-center items-center h-[60px]'>
            <label className='flex text-xs text-center justify-center'>Centro de Gestión y Desarrollo Sostenible </label>
            <label className='flex text-xs justify-center'>Surcolombiano</label>
            <label className='flex text-xs justify-center'>Escuela  Nacional de la Calidad del Café </label>
          </div>
          <div className='border-1 border-black h-[60px] flex items-center justify-center'>
            <label className='flex text-xs justify-center items-center text-center'>INFORME SERVICIO ANALISIS FISICO SENSORIAL</label>
          </div>
        </div>
        <div className='w-[150px]'>
          <div className='border-1 border-black flex h-[60px] justify-center items-center'>
            <img className='w-[90px] h-[90px]' src={logoSennova} />
          </div>
          <div className='flex flex-col'>
            <label className='text-[9px] border-1 border-black h-[15px]'>CÓDIGO: {data.muestra_id}</label>
            <label className='text-[9px] border-1 border-black h-[15px]'>VERSIÓN: 01</label>
            <label className='text-[9px] border-1 border-black h-[15px]'>FECHA: 2023-05-05</label>
            <label className='text-[9px] border-1 border-black h-[15px]'>PÁGINA: </label>
            {/* <label className='text-[9px] border-1 border-black' render={({ pageNumber, totalPages }) => (
              `PÁGINA: ${pageNumber} de ${totalPages}`
            )}  /> */}
          </div>
        </div>
      </div>
      <div className='flex flex-col w-[520px]'>
        <label className='text-sm font-bold ml-16 mb-3'> 7. Conclusión y recomendaciones: </label>
        <label className='text-sm ml-[40px]'> Se recomienda hacer un análisis de suelo, para que pueda hacer una regulación de pH y así realizar una
correcta fertilización del café, además se recomienda hacer una buena recolección seleccionando solo
frutos maduros evitando granos inmaduros y sobre maduros. </label>
      </div>
      <div className='flex flex-row mt-[300px] w-[500px] ml-[40px]'>
        <div className='flex flex-col h-[120px] border-1 border-black w-[250px] justify-end items-center text-center'>
              <label className='text-sm font-bold'> Álvaro Murcia </label>
              <label className='text-sm'> Instructor Análisis Sensorial - ENCC </label>
              <label className='text-sm'> Pitalito </label>
        </div>
        <div className='flex flex-col h-[120px] border-1 border-black w-[250px] justify-end items-center text-center'>
              <label className='text-sm font-bold'> Silvia Andrea Forero Artunduaga </label>
              <label className='text-sm'> Instructor Análisis Sensorial - ENCC </label>
              <label className='text-sm'> Pitalito </label>
        </div>
        <div className='flex flex-col h-[120px] border-1 border-black w-[250px] justify-end items-center text-center'>
              <label className='text-sm font-bold'> Julio Mario Artunduaga </label>
              <label className='text-sm'> Responsable Gestión Técnica - ENCC </label>
              <label className='text-sm'> Pitalito </label>
        </div>
      </div>
      </>
      ): ''}
    </div>
    </div>

    );
};

export default PDFReportHtml