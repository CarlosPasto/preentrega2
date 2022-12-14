//array vacio para el carrito
const carrito = [];

const ordenarMenorMayor = () => {

    productos.sort((a, b) => a.precio - b.precio)
    mostrarListaOrdenada()

};
const ordenarMayorMenor = () => {

    productos.sort((a, b) => b.precio - a.precio)
    mostrarListaOrdenada()

};

const mostrarListaOrdenada = () => {
    const listaOrdenada = productos.map(producto => {
        return '- ' + producto.nombre + ' $' + producto.precio
    });
    alert('Lista de precios:' + '\n\n' + listaOrdenada.join('\n '));

    comprarProductos(listaOrdenada);
};

const comprarProductos = (listaDeProductos) => {
    let seguirComprando;
    let productoNombre = '';
    let productoCantidad = 0;
    do {
        productoNombre = prompt('Que Producto Desea Comprar' + '\n\n' + listaDeProductos.join('\n'));
        productoCantidad = parseInt(prompt('¿cuantos queres comprar?'));

        const producto = productos.find(producto => producto.nombre.toLowerCase() === productoNombre.toLowerCase());

        if (producto) {
            agregarAlCarrito(producto, producto.id, productoCantidad);
        } else {
            alert('el producto no se encuentra disponible');
        }

        seguirComprando = confirm('¿Desea agregar otro producto?')
    } while (seguirComprando);

    confirmarCompra();

};

const agregarAlCarrito = (producto, productoId, productoCantidad) => {
    const productoRepetido = carrito.find(producto => producto.id === productoId);
    if (productoRepetido) {
        productoRepetido.cantidad += productoCantidad

    } else {
        producto.cantidad += productoCantidad;
        carrito.push(producto)
    }
    console.log(carrito)
};

const eliminarProductoCarrito = (productoNombre) => {
    carrito.forEach((producto, index) => {
        if (producto.nombre === productoNombre) {
            if (producto.cantidad > 1) {
                producto.cantidad--
            } else {
                carrito.splice(index, 1)
            }
        }
    })
    confirmarCompra()

};

const confirmarCompra = () => {
    const listaProductos = carrito.map(producto => {
        return '- ' + producto.nombre + ' │Cantidad: ' + producto.cantidad
    });
    const confirmar = confirm('checkout: '
        + '\n\n' + listaProductos.join('\n')
        + '\n\nPara continuar presione "aceptar" sino "cancelar" para eliminar productos del carrito.'


    );

    if (confirmar) {
        finalizarCompra(listaProductos);
    } else {
        const productoAEliminar = prompt('ingrese nombre de producto a eliminar');
        eliminarProductoCarrito(productoAEliminar);
    }
};
const finalizarCompra = (listaDeProductos) => {
    const cantidadTotal = carrito.reduce((acc, elemento) => acc + elemento.cantidad, 0);
    const precioTotal = carrito.reduce((acc, elemento) => acc + (elemento.precio * elemento.cantidad), 0);

    alert('detalle de tu compra:'
        + '\n\n' + listaDeProductos.join('\n')
        + '\n\nTotal de productos; ' + cantidadTotal
        + '\n\nEl total de su compra es: $' + precioTotal
        + '\n\nGracias por su compra!'



    );

};





ordenarMenorMayor()




