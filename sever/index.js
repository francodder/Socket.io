// # REQUIRES

// Requerimos express
const express = require('express')
// Inicializamos express
const app = express()
// Obtenemos un módulo de express que nos permite usar rutas
const path = require('path')


// # SETTINGS

/* Esta línea hace que si hay un puerto predeterminado en el ambiente de producción lo tome,
   de lo contrarío optará por el puerto 3000 */
app.set('port', process.env.PORT || 3000)


// # STATIC FILES

// Enviamos la carpeta "public" al navegador
// path.join(...) obtiene la dirección de la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')))


// # SERVER START
const server = app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
})


// # WEBSOCKETS

// Requerimos el módulo socket.io
const socketIO = require('socket.io')

// Le decimos a socketIO quien es el servidor. Con io ya podemos comenzar a establecer comunicaciones
const io = socketIO(server)

/* Aquí hacemos que el socket esté a la escucha del evento "connection". Una vez disparado
   ejecutará la función (callback) con el código en su interior */ 
/* La función recibe como parámetro el socket del cliente, lo que le permitirá contestarle a
   ese socket en específico */
// Cada usuario que se conecte (en este caso por localhost:3000) generará un socket diferente
io.on('connection', (socket) => {

    // Muestra quien se conectó
    console.log('Usuario conectado', socket.id)

    /* Aquí escuchamos el evento "send" del socket del cliente, en caso de dispararse ejecuta
       una función que recibe como parámetro el obj enviado por el cliente */
    socket.on('send', (data) => {
        
        // De esta manera disparamos un evento en todos los sockets de los clientes.
        io.sockets.emit('send:server', data)
    })
})