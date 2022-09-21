const tienda = document.getElementById("tienda");
const miCarrito = document.getElementById("carrito");
const botonCarrito = document.getElementById("botonCarrito");
const miCompra = document.getElementById("comprar");

let stock = [
  { id: 1, nombre: "Remera de Golden State Warriors", precio: 50 },
  { id: 2, nombre: "Remera de San Antonio Spurs", precio: 35 },
  { id: 3, nombre: "Remera de Los Angeles Lakers", precio: 45 },
  { id: 4, nombre: "Remera de New Orleans Pelicans", precio: 35 },
  { id: 5, nombre: "Remera de Los Angeles Clippers", precio: 45 },
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
  if (carrito.length > 0) {
    miCarrito.innerHTML = "";
    carrito.forEach((prod) => {
      const div = document.createElement("div");
      div.innerHTML = `
      <p>${prod.nombre}</p>
      <p>Precio: ${prod.precio}</p>
      <button class="botonEliminar" onclick="eliminarDelCarrito(${prod.id})">Eliminar del carrito</button>
      `;
      miCarrito.appendChild(div);
    });
    miCarrito.innerHTML += `
      <p class="precioTotal">Precio total: USD$${precioTotal}</p>
      <button onclick="finalizarCompra(${precioTotal})" class="botonComprar">Comprar</button>
      `;
  } else {
    miCarrito.innerHTML = "";
    miCarrito.innerHTML += `
    <p class="precioTotal">Su carrito se encuentra vacío.</p>
    `;
  }
};

const finalizarCompra = (precioTotal) => {
  let cuotas;
  let metodoDePago;

  miCompra.classList.toggle("carritoNone");
  miCompra.classList.toggle("carritoShow");

  miCompra.innerHTML = `
  <h4>Elija el método de pago de su preferencia:</h4>
  <select name="metodoPago" id="metodoPago">
  <option value="efectivo">Efectivo en red de cobranza</option>
  <option value="tarjetaDeCredito">Tarjeta de crédito</option>
  <option value="tarjetaDeDebito">Tarjeta de débito</option>
</select>
<button type="submit" id="metodoSubmit">Elegir</button>
  `;

  let botonMetodo = document.getElementById("metodoSubmit");

  botonMetodo.addEventListener("click", (event) => {
    event.preventDefault();
    metodoDePago = document.getElementById("metodoPago").value;
    miCompra.innerHTML = "";
    if (metodoDePago === "efectivo") {
      miCompra.innerHTML += `<p>El Total a pagar es de: USD$${precioTotal}</p>`;
    } else if (metodoDePago === "tarjetaDeCredito") {
      miCompra.innerHTML += `
      <select name="cantidadCuotas" id="cantidadCuotas">
      <option value="4">4 Cuotas</option>
      <option value="8">8 Cuotas</option>
      <option value="12">12 Cuotas</option>
    </select>
    <button type="submit" id="cuotasSubmit">Elegir</button>`;

      let botonCuotas = document.getElementById("cuotasSubmit");
      botonCuotas.addEventListener("click", (event) => {
        event.preventDefault();
        cuotas = document.getElementById("cantidadCuotas").value;
        miCompra.innerHTML = "";
        miCompra.innerHTML += `
        <p>El total a pagar es: ${precioTotal} en ${cuotas} cuotas de USD$${
          precioTotal / cuotas
        }</p>
        `;
      });
    } else if (metodoDePago === "tarjetaDeDebito") {
      miCompra.innerHTML += `Al pagar con tarjeta de débito se le realizará un descuento del 25% por lo que el total a pagar es de: USD$${
        precioTotal - precioTotal / 4
      }`;
    }
  });
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

botonCarrito.addEventListener("click", (event) => {
  miCarrito.classList.toggle("carritoNone");
  miCarrito.classList.toggle("carritoShow");
  miCompra.classList.remove("carritoShow");
  miCompra.classList.add("carritoNone");
});
