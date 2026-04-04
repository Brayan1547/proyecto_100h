let carrito = JSON.parse(localStorage.getItem('carrito_aire')) || [];

function agregarAlCarrito(boton) {
    const nombre = boton.getAttribute('data-nombre');
    const precio = parseInt(boton.getAttribute('data-precio'));
    const index = carrito.findIndex(item => item.nombre === nombre);

    if (index !== -1) {
        carrito[index].cantidad += 1;
    } else {
        carrito.push({ nombre: nombre, precio: precio, cantidad: 1 });
    }

    localStorage.setItem('carrito_aire', JSON.stringify(carrito));
    mostrarEnModal(nombre);
}

function mostrarEnModal(ultimoNombre) {
    const listaHtml = document.getElementById('lista-carrito'); 
    let totalP = 0;
    let totalCash = 0;

    listaHtml.innerHTML = ""; 

    carrito.forEach((item, index) => {
        totalP += item.cantidad;
        totalCash += (item.precio * item.cantidad);
        
        // Aquí creamos la lista con el botn [X] correctamentes
        listaHtml.innerHTML += `
            <p style="margin-bottom: 10px;">
                • ${item.nombre} (x${item.cantidad})
                <span onclick="eliminarItem(${index})" style="color: #ff4d4d; cursor: pointer; font-weight: bold; margin-left: 15px;"> [X] </span>
            </p>`;
    });

    document.getElementById('mensaje-producto').innerText = `Sumaste: ${ultimoNombre}`;
    document.getElementById('total-prendas').innerText = totalP;
    document.getElementById('total-precio').innerText = totalCash.toLocaleString();
    document.getElementById("miModal").style.display = "flex";    
} // <- Esta llave cierra mostrarEnModal y deja libre a la siguiente funcio

// funciona poruqe esta afuera
function eliminarItem(posicion) {
    //  Quita el producto de la lista
    carrito.splice(posicion, 1);

    //  Guarda el cambio en lapagina
    localStorage.setItem('carrito_aire', JSON.stringify(carrito));

    // Si no quedan productos, cierra el modal. Si quedan, actualiza la lista.
    if (carrito.length === 0) {
        cerrarModal();
    } else {
        mostrarEnModal("Producto eliminado");
    }
}

function cerrarModal(){
    document.getElementById("miModal").style.display = "none";
}

function vaciarCarrito() {
    carrito = [];
    localStorage.removeItem('carrito_aire');
    cerrarModal();
    alert("El carrito se ha vaciado");
}