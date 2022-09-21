const tienda = document.getElementById("tienda");
const miCarrito = document.getElementById("carrito");

let stock = [
  { id: 1, nombre: "Remera de Golden State Warriors", precio: 50 },
  { id: 2, nombre: "Remera de San Antonio Spurs", precio: 35 },
  { id: 3, nombre: "Remera de Los Angeles Lakers", precio: 45 },
  { id: 4, nombre: "Remera de New Orleans Pelicans", precio: 35 },
];

let carrito = JSON.parse(localStorage.getItem("item")) || [];
let precioTotal = JSON.parse(localStorage.getItem("precio")) || null;

stock.forEach((prod) => {
  const div = document.createElement("div");
  div.classList.add("shop__prod");
  div.innerHTML = `
  <h3 class="prod__title">${prod.nombre}</h3>
  <p>Precio: USD$${prod.precio}</p>
  <button id="agregar${prod.id}" class="botonAgregar">Agregar Al Carrito</button>
  `;

  tienda.appendChild(div);

  const boton = document.getElementById(`agregar${prod.id}`);

  boton.addEventListener("click", (event) => {
    agregarAlCarrito(prod.id);
  });
});

const agregarAlCarrito = (prodId) => {
  const item = stock.find((prod) => prod.id === prodId);
  carrito.push(item);
  precioTotal += item.precio;
  guardarPrecio();
  guardarCarrito();
  mostrarCarrito();
};

const guardarPrecio = () =>
  localStorage.setItem("precio", JSON.stringify(precioTotal));

const guardarCarrito = () =>
  localStorage.setItem("item", JSON.stringify(carrito));

const mostrarCarrito = () => {
  miCarrito.innerHTML = "";
  miCarrito.innerHTML += "Carrito:";
  carrito.forEach((prod) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <p>${prod.nombre}</p>
    <p>Precio: ${prod.precio}</p>
    <button class="botonEliminar" onclick="eliminarDelCarrito(${prod.id})">Eliminar del carrito</button>
    `;
    miCarrito.appendChild(div);
  });
  if (precioTotal > 0) {
    miCarrito.innerHTML += `
    <p class="precioTotal">Precio total: USD$${precioTotal}</p>
    <button class="botonComprar">Comprar</button>
    `;
  }
};

const eliminarDelCarrito = (prodId) => {
  const item = carrito.find((prod) => prod.id === prodId);
  let indice = carrito.indexOf(item);
  carrito.splice(indice, 1);
  precioTotal -= item.precio;
  guardarPrecio();
  guardarCarrito();
  mostrarCarrito();
};

document.addEventListener("DOMContentLoaded", (event) => {
  mostrarCarrito();
});
