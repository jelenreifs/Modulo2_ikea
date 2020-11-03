const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let almacen = require("./almacen")
let cesta = []

app.get("/almacen", function (req, res) {
    res.send(almacen);
})

app.get("/almacen/:seccion", function (req, res) {
    let seccion = req.params.seccion;
    //seccion = seccion.toLowerCase();
    let boolean = false;

    if (seccion == "armarios") {
        res.send(almacen.armarios)
        boolean = true;
    } else if (seccion == "mesas") {
        res.send(almacen.mesas)
        boolean = true;
    } else if (seccion == "sillas") {
        res.send(almacen.sillas)
        boolean = true;
    }

    if (boolean == false) {
        res.send({ error: true, mensaje: "No disponemos de esa seccion" })
    }

})

app.post("/add", function (req, res) {
    let seccion = req.body.seccion
   // seccion = seccion.toLowerCase()
    let add = {
        nombre: nombre = req.body.nombre,
        descripccion: descripccion = req.body.descripccion,
        img: img = req.body.img,
        precio: precio = req.body.precio,
    }

    if (seccion == "armarios") {
        almacen.armarios.push(add)
        res.send(almacen)
    } else if (seccion == "mesas") {
        almacen.mesas.push(add)
        res.send(almacen)
    } else if (seccion == "sillas") {
        almacen.sillas.push(add)
        res.send(almacen)
    }

})

app.put("/editar", function (req, res) {
    let seccion = req.body.seccion
    seccion = seccion.toLowerCase()
    let nombre = req.body.nombre
    let nombreCambiado = req.body.nombreCambiado
    let imgCambiado = req.body.img
    let descripccionCambiado = req.body.descripccion
    let precioCambiado = req.body.precio

    let booleanSeccion = false
    //let booleanProducto = false

    if (seccion == "armarios") {
        for (let i = 0; i < almacen.armarios.length; i++) {
            if (nombre == almacen.armarios[i].nombre) {
                almacen.armarios[i].nombre = nombre
                almacen.armarios[i].img = imgCambiado
                almacen.armarios[i].descripccion = descripccionCambiado
                almacen.armarios[i].precio = precioCambiado
                booleanProducto = true
            }
        }
        booleanSeccion = true
        res.send(almacen)
    } else if (seccion == "mesas") {
        for (let i = 0; i < almacen.mesas.length; i++) {
            if (nombre == almacen.mesas[i].nombre) {
                almacen.mesas[i].nombre = nombreCambiado
                almacen.mesas[i].img = imgCambiado
                almacen.mesas[i].descripccion = descripccionCambiado
                almacen.mesas[i].precio = precioCambiado
                booleanProducto = true
            }
        }
        booleanSeccion = true
        res.send(almacen)
    } else if (seccion == "sillas") {
        for (let i = 0; i < almacen.sillas.length; i++) {
            if (nombre == almacen.sillas[i].nombre) {
                almacen.sillas[i].nombre = nombreCambiado
                almacen.sillas[i].img = imgCambiado
                almacen.sillas[i].descripccion = descripccionCambiado
                almacen.sillas[i].precio = precioCambiado
                booleanProducto = true
            }
        }
        booleanSeccion = true
        res.send(almacen)
    }

    if (booleanSeccion == false) {
        res.send({ error: true, mensaje: "No existe esa seccion" })
    }

    if (booleanProducto == false) {
        res.send({ error: true, mensaje: "No existe ese producto" })
    }

})

app.delete("/borrar", function (req, res) {
    let nombre = req.body.nombre

    let booleanProducto = false

    if (booleanProducto == false) {
        for (let i = 0; i < almacen.armarios.length; i++) {
            if (nombre == almacen.armarios[i].nombre) {
                almacen.armarios.splice(i, 1)
                booleanProducto = true
                res.send(almacen)
            }
        }
    }

    if (booleanProducto == false) {
        for (let i = 0; i < almacen.mesas.length; i++) {
            if (nombre == almacen.mesas[i].nombre) {
                almacen.mesas.splice(i, 1)
                booleanProducto = true
                res.send(almacen)
            }
        }
    }
    if (booleanProducto == false) {
        for (let i = 0; i < almacen.sillas.length; i++) {
            if (nombre == almacen.sillas[i].nombre) {
                almacen.sillas.splice(i, 1)
                booleanProducto = true
                res.send(almacen)
            }
        }
    }

    if (booleanProducto == false) {
        res.send({ error: true, mensaje: "No existe ese producto" })
    }
})



app.get("/cesta", function (req, res) {
    res.send(cesta)
})

app.post("/cesta", function (req, res) {
    let nombre = req.body.nombre
    let cantidad = parseInt(req.body.cantidad)


    let booleanCesta = false

    if (cesta[0] != undefined) {

        for (let i = 0; i < cesta.length; i++) {
            if (nombre == cesta[i].nombre) {
                cesta[i].cantidad += cantidad
                booleanCesta = true
            }
        }
    }

    if (booleanCesta == false) {
        for (let i = 0; i < almacen.armarios.length; i++) {
            if (nombre == almacen.armarios[i].nombre) {
                almacen.armarios[i].cantidad = cantidad
                cesta.push(almacen.armarios[i])
                booleanCesta = true
               
                res.send(cesta)
            }
        }
    }

    if (booleanCesta == false) {
        for (let i = 0; i < almacen.mesas.length; i++) {
            if (nombre == almacen.mesas[i].nombre) {
                almacen.mesas[i].cantidad = cantidad
                cesta.push(almacen.mesas[i])
                booleanCesta = true
                res.send(cesta)
            }
        }
    }
    if (booleanCesta == false) {
        for (let i = 0; i < almacen.sillas.length; i++) {
            if (nombre == almacen.sillas[i].nombre) {
                almacen.sillas[i].cantidad = cantidad
                cesta.push(almacen.sillas[i])
                booleanCesta = true
                res.send(cesta)
            }
        }
    }

    if (booleanCesta == false) {
        res.send({ error: true, mensaje: "No existe ese producto" })
    }

    
    res.send(cesta)

})




app.delete('/cesta', function (req, res) {

    let producto = {
    nombre: nombre = req.body.nombre,
        descripccion: descripccion = req.body.descripccion,
        img: img = req.body.img,
        precio: precio = req.body.precio,
    }

    for (let i = 0; i < cesta.length; i++) {
        if (cesta[i].nombre === nombre) {
            res.send(producto)
            cesta.splice(i, 1);
        }
    }
  
});

app.listen(3000, function() {
  console.log('Escuchando puerto 3000');
});
