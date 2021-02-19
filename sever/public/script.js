// io es una var global que se genera cuando importamos el script socket.io.js
// De esta manera ya establecemos una comunicación entre el servidor y el cliente.
const socket = io()

// Capturamos los elementos HTML
let messageInput = document.getElementById('message-input')
let usernameInput = document.getElementById('username-input')
let sendBtn = document.getElementById('send')
let output = document.getElementById('output')
let actions = document.getElementById('actions')

// Creamos el evento enviar mensaje
sendBtn.addEventListener('click', () => {

    // Eviamos los datos usuario y mensaje al servidor
    // Como 1er param recibe el nombre del evento, como segundo el objeto a enviar
    socket.emit('send', {
        username: usernameInput.value,
        message: messageInput.value
    })
})

// Ponemos a la escucha el socket del cliente a comunicaciones del servidor
socket.on('send:server', (data) => {

    // Aquí actualizamos las burbujas
    console.log(data)
})