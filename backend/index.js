import express from 'express'
import Fincas  from './src/routes/fincas.routes.js'
import User from './src/routes/esteno.routes.js'
import Lotes from './src/routes/lotes.routes.js'
import Variedades from './src/routes/variables.routes.js'

const app = express()

app.use(express.json())/*recive los datos y los convierte en un json y luego se los pasa a las rutas */
app.use('/fincas',Fincas)
app.use('/user',User)
app.use('/lote',Lotes)
app.use('/var',Variedades)

app.listen(3000)
console.log('Server funcionando GG 🙈')
