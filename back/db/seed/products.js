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
  const names = ['PAZ','LAGARDE', 'DON VALENTIN', 'RUTINI', 'LUIGI BOSCA', 'OASIS', 'MANOS NEGRAS', 'PORTILLO', 'SALENTEIN']
  const types = ['MALBEC', 'ROSADO', 'BLANCO', 'PETIT NOIR', 'SYRAH', 'CABERNET SAUVIGNON', 'OTRO CABERNET', 'BLANCO BIEN SUAVE', 'HERMOSO', 'DELIZIA']

  return `${names[+Math.random(1).toString().split('.')[1][0]]} ${types[+Math.random(1).toString().split('.')[1][0]]}`
}
function weightGenerator () {
  return Math.random(1).toString().split('.')[1].slice(0,3)
}

function randomCategory() {
  const cats = [`oro verde`,`enjuague paladar`,`suave hito`]
  return [cats[Math.floor(Math.random() *2) +1]]
}


function wineGenerator () {
  let name = nameGenerator()
  return {
    name,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    weight: weightGenerator(),
    brand: name.split(' ')[0],
    quantity: weightGenerator(),
    image_path: randomLink(),
    price: weightGenerator(),
    categories: [],
  }
}

let arr = []
for(let i=0; i<15; i++) {
  arr.push(wineGenerator())
}

module.exports = arr