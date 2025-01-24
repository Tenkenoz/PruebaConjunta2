

    class Producto {
        static contadorProductos = 0;
        constructor(nombre, precio, categoria, imagen) {
            this.nombre = nombre;
            this.precio = precio;
            this.categoria = categoria;
            this.imagen = imagen;
            this.id = ++Producto.contadorProductos;
        }
        toString() {
            return `Nombre: ${this.nombre}, Precio: $${this.precio.toFixed(2)}, Categoría: ${this.categoria}`;
        }
        }
    

    class Carrito {
        constructor() {
            this.productos = [];
        }

        agregar(producto) {
            this.productos.push(producto);
        }

        get mostrartotal() {
            return this.productos.reduce((acc, producto) => {
                let precioFinal = producto.categoria === "Electrónica" 
                    ? producto.precio * 0.9 
                    : producto.precio;
                return acc + precioFinal;
            }, 0);
        }

        get resumen() {
            let text = this.productos.map(producto => producto.toString()).join("<br>");
            let descuentoAplicado = this.productos.filter(p => p.categoria === "Electrónica").length;
            text += `<br>Total: $${this.mostrartotal.toFixed(2)}`;
            text += `<br>Aplicado descuento a ${descuentoAplicado} producto(s)`;
            return text;
        }
    }

    const carrito = new Carrito();
    const resumenDiv = document.getElementById("resumen");

    function agregarAlCarrito(elemento) {
        let nombre = elemento.querySelector(".titulo").innerText;
        let precio = parseFloat(elemento.querySelector(".precio").innerText.replace("$", ""));
        let categoria = elemento.querySelector(".categoria").innerText;
        let imagen = elemento.querySelector("img").src;

        let producto = new Producto(nombre, precio, categoria, imagen);
        carrito.agregar(producto);

        actualizarResumen(producto);
    }

    function actualizarResumen(producto) {
        let productoDiv = document.createElement("div");
        productoDiv.innerHTML = `
            <h2>${producto.nombre}</h2>
            <img height="50px" src="${producto.imagen}" alt="${producto.nombre}">
            <p>Precio: $${producto.precio.toFixed(2)}</p>
            <p>Categoría: ${producto.categoria}</p>
        `;
        resumenDiv.appendChild(productoDiv);

        let totalResumen = document.createElement("p");
        totalResumen.innerHTML = carrito.resumen;
        resumenDiv.innerHTML = "";
        resumenDiv.appendChild(totalResumen);
    }

    document.getElementById("producto1").addEventListener("click", () => agregarAlCarrito(producto1));
    document.getElementById("producto2").addEventListener("click", () => agregarAlCarrito(producto2));
    document.getElementById("producto3").addEventListener("click", () => agregarAlCarrito(producto3));
