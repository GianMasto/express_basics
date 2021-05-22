import express from 'express'
import { readFile } from 'fs/promises';

const app = express()

const PORT = 8080

const getProductos = async () => {
  return JSON.parse(await readFile('productos.txt', 'utf8'))
}

const visitas = {
  items: 0,
  item: 0
}



app.get('/items',  async (req, res) => {

  visitas.items++

  try {
    const productos = await getProductos()
  
    res.json({
      items: productos,
      cantidad: productos.length
    })
  } 
  catch(error) {
    console.error(error)
  }

})

app.get('/item-random',  async (req, res) => {

  visitas.item++

  try {
    const productos = await getProductos()
    const producto = productos[Math.floor(Math.random() * productos.length)]
  
    res.json({
      item: producto
    })
  } 
  catch(error) {
    console.error(error)
  }
})

app.get('/visitas', (req, res) => {
  res.json({visitas})
})


const server = app.listen(PORT, () => {
  console.log(`Server escuchando en el puerto: ${PORT}`);
})

server.on('error', error =>  console.error(`Error en el server ${error}`))