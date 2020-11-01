let almacenTodos = "";

function buscarProducto() {
    let seccion = document.getElementById("productoBuscar").value;
    fetch(`/almacen/${seccion}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                window.alert(data.mensaje);
            } else {
                let productos = "";
                for (let i = 0; i < data.length; i++) {
                    productos += `
                <div class="producto" >
                    <img src="${data[i].img}" alt="${data[i].nombre}">
                        <div class="info-producto">
                            <h4>${data[i].nombre}</h4>
                            <p>${data[i].descripccion}</p>
                            <p>Precio: ${data[i].precio}</p>
                        </div>
                </div>` ;
                }
                document.getElementById("resultado").innerHTML = productos;
            }
        })
}

fetch('/almacen')
    .then(response => response.json())
    .then(data => {
        let almacenArray = Object.values(data);

        for (let i = 0; i < almacenArray.length; i++) {
            for (let j = 0; j < almacenArray.length; j++) {
                almacenTodos +=
                    `<div class="producto">
                        <img src="${almacenArray[i][j].img}" alt="${almacenArray[i][j].nombre}">
                            <div class="info-producto">
                                <h4>${almacenArray[i][j].nombre}</h4>
                                <p>${almacenArray[i][j].descripccion}</p>
                                <p>Precio: ${almacenArray[i][j].precio}</p>
                            </div>
                     </div>`
            }
        }
         document.getElementById('resultado').innerHTML = almacenTodos;
    })
        
       