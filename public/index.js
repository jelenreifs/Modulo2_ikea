let almacenTodos = "";


fetch('/almacen')
    .then(response => response.json())
    .then(data => {

        // Devuelve un array con los valores correspondientes al objeto
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


function addProducto() {
    let imagen = document.getElementById('fotoProducto').value;
    let nombre = document.getElementById('nombreProducto').value;
    let descripcion = document.getElementById('descripcionProducto').value;
    let precio = parseInt(document.getElementById('precioProducto').value);

    let select = document.getElementById('categorias');
    let seccion = select.options[select.selectedIndex].value;
    console.log(seccion);


    let add = {
        imagen,
        nombre,
        descripcion,
        precio
    };

    fetch('/add', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(add)
    })
        .then(response => response.json())
        .then(data => {
            let almacenArray = Object.values(data);

            let producto = "";
            
             for (let i = 0; i < almacenArray.length; i++) {
            for (let j = 0; j < almacenArray.length; j++) {
                producto +=
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
                document.getElementById('resultado').innerHTML = producto;
            });
        
    
}


       