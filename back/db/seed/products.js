
const categories = require("./categories");

function randomLink () {
  const names = [
    'https://frappe.com.ar/img/productos/1003552.png',
    'https://frappe.com.ar/img/productos/122223.png',
    'https://frappe.com.ar/img/productos/1006826.png',
    'https://frappe.com.ar/img/productos/100023.png',
    'https://frappe.com.ar/img/productos/1006487.png',
    'https://frappe.com.ar/img/productos/1003444.png',
    'https://frappe.com.ar/img/productos/110298.png',
    'https://frappe.com.ar/img/productos/1048.png',
    'https://frappe.com.ar/img/productos/1003481.png',
    'https://frappe.com.ar/img/productos/1029.png',
    'https://frappe.com.ar/img/productos/1036.png',
    'https://frappe.com.ar/img/productos/1003471.png',
    'https://frappe.com.ar/img/productos/1003478.png',
    'https://frappe.com.ar/img/productos/1003406.png',
    'https://frappe.com.ar/img/productos/1003391.png'
  ]

  return `${names[Math.floor(Math.random() * 13) + 1 ]}`
}

function nameGenerator () {
  const names = ['PAZ','LAGARDE', 'DON VALENTIN', 'RUTINI', 'LUIGI BOSCA', 'OASIS', 'MANOS NEGRAS', 'PORTILLO', 'SALENTEIN', 'BON VOYAGE']
  const types = ['MALBEC', 'ROSADO', 'BLANCO', 'PETIT NOIR', 'SYRAH', 'CABERNET SAUVIGNON', 'TANAT', 'HERMOSO', 'DELIZIA', 'TORRONTES']

  return `${names[+Math.random(1).toString().split('.')[1][0]]} ${types[+Math.random(1).toString().split('.')[1][0]]}`
}

function weightGenerator () {
  return Math.random(5).toString().split('.')[1].slice(0,3)
}

function randomDescription() {
  const names = ["Vino que sin llegar a ser dulce ofrece sensaciones azucaradas", "Vino ligero, fresco, fácil de tomar y con buen paso de boca. Ausencia total de complejidades aromáticas", "Vino de gran crianza; se trata de aromas penetrantes que dan sensación de frescura y matices mentolados", "Vino joven y sin terminar", "Vino tinto de color intenso y tonos apagados por su poca acidez", "Vino con aromas densos e intensos originados por los aceites esenciales que contiene"]
  
  return `${[names[Math.floor(Math.random() * 6)]]}`  
}


function wineGenerator () {
  let name = nameGenerator()
  return {
    name,
    description: randomDescription(),
    weight: "750cc",
    brand: name.split(' ')[0],
    quantity: weightGenerator(),
    image_path: randomLink(),
    price: weightGenerator(),
    categories
  }
}

let arr = []
for(let i=0; i<20; i++) {
  arr.push(wineGenerator())
}

module.exports = arr