import history from 'connect-history-api-fallback'
import mongoose from 'mongoose'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'

const app = express()

app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost:27017/none', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(() => { 
	console.log('Conectado a la base de datos')
	err => { console.log(`Ha ocurrido un error ${err}`) }
})

app.use('/api', require('./api/note'))

app.use(history())
// app.use(express.static(path.join(__dirname, 'public')))

app.set('port', process.env.PORT || 3000)
app.listen(app.get('port'), () => {
	console.log(`Servidor iniciado en el puerto ${app.get('port')}`)
})
