const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let almacen = require("./almacen")

app.get("/almacen", function(req, res) {
    res.send(almacen)
})

app.get("/almacen/:seccion", function(req, res) {
    let seccion = req.params.seccion;
    seccion = seccion.toLowerCase();
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

app.post("/add", function(req, res) {
    let seccion = req.body.seccion
    seccion = seccion.toLowerCase()
    let add = {
        nombre: nombre = req.body.nombre,
        descripccion: descripccion = req.body.descripccion,
        img: img = req.body.img,
        precio: precio = req.body.precio,
    }

    if (seccion == "armarios") {
        almacen.armarios.push(add)
    } else if (seccion == "mesas") {
        almacen.mesas.push(add)
    } else if (seccion == "sillas") {
        almacen.sillas.push(add)

  }
  res.send(almacen)

})

 app.put("/editar", function(req, res) {
    let seccion = req.body.seccion
    let nombre = req.body.nombre
    let img = req.body.img
    let descripccion = req.body.descripccion
    let precio = req.body.precio

    let booleanSeccion = false
    let booleanProducto = false

    if (seccion == "armarios") {
        for (let i = 0; i < almacen.armarios.length; i++) {
            almacen.armarios[i].nombre = nombre
            almacen.armarios[i].img = img
            almacen.armarios[i].descripccion = descripccion
            almacen.armarios[i].precio = precio
            booleanProducto = true
        }
        booleanSeccion = true
        res.send(almacen)
    } else if (seccion == "mesas") {
        for (let i = 0; i < almacen.mesas.length; i++) {
            almacen.mesas[i].nombre = nombre
            almacen.mesas[i].img = img
            almacen.mesas[i].descripccion = descripccion
            almacen.mesas[i].precio = precio
            booleanProducto = true
        }
        booleanSeccion = true
        res.send(almacen)
    } else if (seccion == "sillas") {
        for (let i = 0; i < almacen.sillas.length; i++) {
            almacen.sillas[i].nombre = nombre
            almacen.sillas[i].img = img
            almacen.sillas[i].descripccion = descripccion
            almacen.sillas[i].precio = precio
            booleanProducto = true
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

app.delete("/borrar", function(req, res) {
    let seccion = req.body.seccion
    let nombre = req.body.nombre

    let booleanSeccion = false
    let booleanProducto = false

    if (seccion == "armarios") {
        for (let i = 0; i < almacen.armarios.length; i++) {
            if (nombre == almacen.armarios[i].nombre)
               // almacen.armarios[i].splice(i, 1)
                 almacen.armarios.splice(i, 1)
            booleanProducto = true
        }
        booleanSeccion = true
        res.send(almacen)
 
      


    } else if (seccion == "mesas") {
        for (let i = 0; i < almacen.mesas.length; i++) {
            if (nombre == almacen.mesas[i].nombre)
                //almacen.mesas[i].splice(i, 1)
                almacen.mesas.splice(i, 1)
            booleanProducto = true
        }
        booleanSeccion = true
         res.send(almacen)
       
    


    } else if (seccion == "sillas") {
        for (let i = 0; i < almacen.sillas.length; i++) {
            if (nombre == almacen.sillas[i].nombre)
                //almacen.sillas[i].splice(i, 1)
                 almacen.sillas.splice(i, 1)
            booleanProducto = true
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

app.listen(3000, function() {
  console.log('Escuchando puerto 3000');
});
