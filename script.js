/* Sección donde están los productos */
const tienda = document.getElementById("tienda");
const miCarrito = document.getElementById("carrito");

class Productos {
  constructor() {
    this.productos = [
      {
        id: 1,
        nombre: "Remera de Warriors",
        precio: 50,
      },
      {
        id: 2,
        nombre: "Remera de Lakers",
        precio: 50,
      },
      {
        id: 3,
        nombre: "Remera de Spurs",
        precio: 50,
      },
    ];
    this.productosDeseados = [];
  }

  renderizarProductos() {
    const producto = document.createElement("div");
    this.productos.forEach((prod) => {
      producto.innerHTML += `<article id="${prod.id}"><h3>${prod.nombre}</h3>
      <p>Precio: ${prod.precio}</p><button class="carrito">Agregar al carrito</button></article>`;
    });
    tienda.append(producto);
  }

  agregarAlCarrito(nuevoProd) {
    this.productos.forEach((prod) => {
      if (prod.id === nuevoProd) {
        this.productosDeseados.push(prod);
      }
    });
  }

  eliminarDelCarrito(prodAEliminar) {
    this.productosDeseados.forEach((prod) => {
      if (prod.id === prodAEliminar) {
        let index = this.productosDeseados.findIndex(
          (prod) => prodAEliminar === prod.id
        );
        this.productosDeseados.splice(index, 1);
        console.log(this.productosDeseados);
      }
    });
  }

  mostrarCarrito() {
    miCarrito.innerHTML = "";
    this.productosDeseados.forEach((prod) => {
      miCarrito.innerHTML += `<p id="${prod.id}">${prod.nombre}<button class="eliminar">Eliminar</button></p>\n`;
    });
  }
}

const prod1 = new Productos();

document.addEventListener("DOMContentLoaded", (event) => {
  prod1.renderizarProductos();
  const botonesAgregar = document.querySelectorAll(".carrito");

  /* Mostrar carrito de compras al ir agregando productos */
  botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", (event) => {
      let prodId = boton.parentElement.id;
      prod1.agregarAlCarrito(parseInt(prodId));
      prod1.mostrarCarrito();
      const botonesEliminar = document.querySelectorAll(".eliminar");
      botonesEliminar.forEach((boton) => {
        boton.addEventListener("click", (event) => {
          let prodAEliminar = boton.parentElement.id;
          prod1.eliminarDelCarrito(parseInt(prodAEliminar));
        });
      });
    });
  });
});
