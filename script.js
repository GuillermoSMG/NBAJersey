const tienda = document.getElementById("tienda");
const miCarrito = document.getElementById("carrito");
const botonCarrito = document.getElementById("botonCarrito");
const miCompra = document.getElementById("comprar");

document.addEventListener("DOMContentLoaded", async () => {
  let productosProm = await fetch("./stock.json");
  let productosJson = await productosProm.json();
  let productos = productosJson.productos;

  productos.forEach((prod) => {
    const div = document.createElement("div");
    div.classList.add(
      "border",
      "d-flex",
      "justify-content-center",
      "align-items-center",
      "flex-column",
      "col-4"
    );
    div.innerHTML = `
          <h4 class="fw-semibold">${prod.nombre}</h4>
          <p>Precio: USD$${prod.precio}</p>
          <button id="agregar${prod.id}" class="botonAgregar">Agregar Al Carrito</button>
    `;

    tienda.appendChild(div);

    const boton = document.getElementById(`agregar${prod.id}`);

    /* Agregar artículo al carrito */
    boton.addEventListener("click", (event) => {
      agregarAlCarrito(prod.id);
      agregado(prod.nombre);
    });

    const agregarAlCarrito = (prodId) => {
      const existe = carrito.some((prod) => prod.id === prodId);

      if (existe) {
        /* Si el producto ya existe en el carrito se suma 1 a la cantidad */
        const prod = carrito.map((prod) => {
          if (prod.id === prodId) {
            prod.cantidad++;
            precioTotal += prod.precio;
          }
        });
      } else {
        /* Si el producto no existe en el carrito se agrega directamente con cantidad 1 */
        const item = productos.find((prod) => prod.id === prodId);
        precioTotal += item.precio;
        carrito.push(item);
      }
      guardarPrecio();
      guardarCarrito();
      mostrarCarrito();
    };
  });
});

let carrito = JSON.parse(localStorage.getItem("item")) || [];
let precioTotal = JSON.parse(localStorage.getItem("precio")) || null;

/* Guardar precio en Local Storage */
const guardarPrecio = () =>
  localStorage.setItem("precio", JSON.stringify(precioTotal));

/* Guardar carrito en Local Storage */
const guardarCarrito = () =>
  localStorage.setItem("item", JSON.stringify(carrito));

const mostrarCarrito = () => {
  if (carrito.length > 0) {
    miCarrito.innerHTML = "";
    carrito.forEach((prod) => {
      /* Crear los artículos en la sección carrito */
      const div = document.createElement("div");
      div.classList.add("p-4");
      div.innerHTML = `
      <p class="fw-bold">${prod.nombre}</p>
      <p>Precio: ${prod.precio}</p>
      <p>Cantidad: ${prod.cantidad}</p>
      <button class="botonEliminar" onclick="eliminarDelCarrito(${prod.id})">Eliminar del carrito</button>
      `;
      miCarrito.appendChild(div);
    });
    miCarrito.innerHTML += `<div class="w-100 d-flex justify-content-center align-items-center p-3">
      <p class="precioTotal">Precio total: USD$${precioTotal}</p>
      <button onclick="finalizarCompra(${precioTotal})" class="botonComprar">Comprar</button>
      </div>`;
  } else {
    miCarrito.innerHTML = "";
    miCarrito.innerHTML += `
    <p class="precioTotal">Su carrito se encuentra vacío.</p>
    `;
  }
  botonCarrito.innerHTML = "Carrito";
  botonCarrito.innerHTML += `\t${carrito.length}`;
};

const finalizarCompra = (precioTotal) => {
  let cuotas;
  let metodoDePago;

  miCompra.classList.toggle("d-none");
  miCompra.classList.toggle("d-flex");

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
      /* Método de pago en efectivo */
      miCompra.innerHTML += `<p>El Total a pagar es de: USD$${precioTotal}</p>`;
    } else if (metodoDePago === "tarjetaDeCredito") {
      /* Método de tarjeta de crédito */
      /* Elección de cuotas */
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
      /* Método de pago tarjeta de débito */
      /* Descuentos pertinentes */
      miCompra.innerHTML += `Al pagar con tarjeta de débito se le realizará un descuento del 25% por lo que el total a pagar es de: USD$${
        precioTotal - precioTotal / 4
      }`;
    }
  });
};

const eliminarDelCarrito = (prodId) => {
  const item = carrito.find((prod) => prod.id === prodId);
  let indice = carrito.indexOf(item);

  /* Si la cantidad del artículo a borrar es > 1, se le resta 1 a la cantidad */
  if (item.cantidad > 1) {
    item.cantidad--;
    precioTotal -= item.precio;
  } else {
    /* Si la cantidad del producto a eliminar es = 1, se elimina directamente */
    carrito.splice(indice, 1);
    precioTotal -= item.precio;
  }
  eliminado(item.nombre);
  guardarPrecio();
  guardarCarrito();
  mostrarCarrito();
};

botonCarrito.addEventListener("click", (event) => {
  miCarrito.classList.toggle("d-none");
  miCarrito.classList.toggle("d-flex");
  miCompra.classList.remove("d-flex");
  miCompra.classList.add("d-none");
});

/* Incorporación de Toastify JS */
/* Al agregar al carrito */
function agregado(prodName) {
  Toastify({
    text: `${prodName} se ha agregado al carrito.`,
    time: 1000,
  }).showToast();
}

/* Al eliminar del carrito */
function eliminado(prodName) {
  Toastify({
    text: `${prodName} se ha elimiado del carrito.`,
    time: 1000,
    style: {
      background:
        "linear-gradient(270deg, rgba(255,0,0,1) 23%, rgba(255,101,101,1) 80%)",
    },
  }).showToast();
}
