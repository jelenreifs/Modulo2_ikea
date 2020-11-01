let almacenTodos = "";

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
    let imagen = document.getElementById("fotoProducto").value;
    let nombre = document.getElementById("nombreProducto").value;
    let descripcion = parseInt(document.getElementById("descripcionProducto").value);
    let precio = parseInt(document.getElementById("precioProducto").value);

  let producto = {
    imagen,
    nombre,
    descripcion,
    precio,
  };

  fetch("/almacen", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(producto),
  })
    .then(response => response.json())
    .then(data => {
        
         let almacenArray = Object.values(data);
     
        let [armarios, sillas, mesas] = almacenArray
        
      for (let i = 0; i < armarios.length; i++) {
        armarios += `
        <div class="producto" >
            <img src="${armarios[i].img}" alt="${armarios[i].nombre}">
                <div class="info-producto">
                    <h4>${armarios[i].nombre}</h4>
                    <p>${armarios[i].descripccion}</p>
                    <p>Precio: ${armarios[i].precio}</p>
                </div>
        </div>`;
    
      }
      for (let i = 0; i < mesas.length; i++) {
        mesas += `
          <div class="producto" >
            <img src="${mesas[i].img}" alt="${mesas[i].nombre}">
                <div class="info-producto">
                    <h4>${mesas[i].nombre}</h4>
                    <p>${mesas[i].descripccion}</p>
                    <p>Precio: ${mesas[i].precio}</p>
                </div>
        </div>`;
        }
        
    for (let i = 0; i < sillas.length; i++) {
        sillas += `
          <div class="producto" >
            <img src="${sillas[i].img}" alt="${sillas[i].nombre}">
                <div class="info-producto">
                    <h4>${sillas[i].nombre}</h4>
                    <p>${sillas[i].descripccion}</p>
                    <p>Precio: ${sillas[i].precio}</p>
                </div>
        </div>`;
        }
        
    document.getElementById('resultado').innerHTML = armarios + mesas + sillas ;  
    
    });
}


       