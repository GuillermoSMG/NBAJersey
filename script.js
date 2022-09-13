class Productos {
  constructor() {
    this.productos = {
      1: {
        id: 1,
        nombre: "Remera de Warriors",
        precio: 50,
      },
      2: {
        id: 2,
        nombre: "Remera de Lakers",
        precio: 50,
      },
      3: {
        id: 3,
        nombre: "Remera de Spurs",
        precio: 50,
      },
    };
    this.productosDeseados = [];
  }

  agregarAlCarrito() {
    /*Pido el número del producto deseado*/
    let nuevoProducto = parseInt(
      prompt(
        "Elija el producto que desea agregar al carrito de compras:\n1 - Remera de Warrios USD$50.\n2 - Remera de Lakers USD$50.\n3 - Remera de Spurs USD$50.\nIngrese 0 para finalizar la compra."
      )
    );

    if (this.productosDeseados !== 0) {
      while (nuevoProducto !== 0) {
        if (this.productos[nuevoProducto]) {
          /* Agrego el producto deseado al array de this.productosDeseados */
          this.productosDeseados.push(nuevoProducto);
          alert(`Se ha agregado el producto ${nuevoProducto} correctamente`);
          /* Vuelvo a pedir producto deseado */
          nuevoProducto = parseInt(
            prompt(
              "Elija el producto que desea agregar al carrito de compras:\n1 - Remera de Warrios USD$50.\n2 - Remera de Lakers USD$50.\n3 - Remera de Spurs USD$50.\nIngrese 0 para finalizar la compra."
            )
          );
        } else {
          /* Si el producto deseado no existe: */
          alert("Producto Inexistente.");
          /* Vuelvo a pedir producto deseado */
          nuevoProducto = parseInt(
            prompt(
              "Elija el producto que desea agregar al carrito de compras:\n1 - Remera de Warrios USD$50.\n2 - Remera de Lakers USD$50.\n3 - Remera de Spurs USD$50.\nIngrese 0 para finalizar la compra."
            )
          );
        }
      }
    }
    console.log("Carrito: ", this.productosDeseados);
  }

  eliminarDelCarrito() {
    let eliminar = confirm("Desea eliminar un producto?");
    while (eliminar && this.productosDeseados.length > 0) {
      /* Pido producto para eliminar */
      let productoAEliminar = parseInt(
        prompt(
          `Tu carrito: ${this.mostrarCarrito()}\nIngrese el numero de producto que desea eliminar`
        )
      );
      /* Elimino el producto */
      this.productosDeseados.splice(
        this.productosDeseados.indexOf(productoAEliminar),
        1
      );
      alert(`Se ha eliminado el producto ${productoAEliminar} correctamente`);
      eliminar = confirm("Desea eliminar un producto?");
    }
    console.log(this.productosDeseados);
  }

  mostrarCarrito() {
    /* Uso los valores ingresados por el usuario para crear un carrito con nombre e id de los productos */
    let carrito = [];
    this.productosDeseados.forEach((prod) => {
      carrito += `\n${this.productos[prod].id} - ${this.productos[prod].nombre}`;
    });
    return carrito;
  }

  comprarProducto() {
    if (this.productosDeseados.length > 0) {
      /* Pido que ingrese el metodo de pago que desea */
      let metodoDePago = parseInt(
        prompt(
          "Elija el método de pago que desea utilizar:\n1 - Efectivo en red de cobranza.\n2 - Tarjeta de débito(Descuento del 20% en el total de su compra).\n3 - tarjeta de crédito(Hasta 12 cuotas sin recargo)"
        )
      );

      let precioTotal = 50 * this.productosDeseados.length;
      let cantidadDeCuotas;

      /* Efectuo los descuentos e impuestos correspondientes, y la elección de cantidad de cuotas */

      if (metodoDePago === 1) {
        alert(`El precio total es de USD$${precioTotal}`);
      } else if (metodoDePago === 2) {
        alert(`El precio total es de 
        USD$${precioTotal - precioTotal / 5}`);
      } else if (metodoDePago === 3) {
        cantidadDeCuotas = parseInt(
          prompt(
            `Elija la cantidad de cuotas que desee:\n1 - 4 Cuotas de USD$${
              precioTotal / 4
            }.\n2 - 8 cuotas de USD$${precioTotal / 8}.\n3 - 12 cuotas de USD$${
              precioTotal / 12
            }`
          )
        );
        let cuotas = {
          1: 4,
          2: 8,
          3: 12,
        };
        alert(
          `Usted a elegido ${cuotas[cantidadDeCuotas]} cuotas de USD$${
            precioTotal / cuotas[cantidadDeCuotas]
          }`
        );
      } else {
        alert("Opción inválida.");
        metodoDePago = parseInt(
          prompt(
            "Elija el método de pago que desea utilizar:\n1 - Efectivo en red de cobranza.\n2 - Tarjeta de débito(Descuento del 20% en el total de su compra).\n3 - tarjeta de crédito(Hasta 12 cuotas sin recargo)"
          )
        );
      }
    }
  }
}

const prod1 = new Productos();

prod1.agregarAlCarrito();
prod1.eliminarDelCarrito();
prod1.comprarProducto();
