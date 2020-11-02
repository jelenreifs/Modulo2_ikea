
const express = require("express");
let almacen = require("./almacen.js")
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get("/almacen", function (req, res) {
    res.send(almacen)
})


app.get("/almacen/:seccion", function (req, res) {
  let tipo = req.params.seccion;

  if (almacen[tipo] !== undefined) {
    res.send(almacen[tipo]);
  } else {
    let respuesta = {
      error: true,
      mensaje: "Esa sección no existe",
    };
    res.send(respuesta);
  }
});

/* app.get("/almacen/:seccion", function (req, res) {
    let seccion = req.params.seccion;
    seccion = seccion.toLowerCase();
    let boolean = false;
    if (seccion == "armarios") {
        res.send(almacen.armarios)
        boolean = true;
    } else if (seccion = "mesas") {
        res.send(almacen.mesas)
        boolean = true;
    } else if (seccion = "sillas") {
        res.send(almacen.sillas)
        boolean = true;
    }
    if (boolean == false) {
        res.send({ error: true, mensaje: "No disponemos de esa seccion" })
    }
}) */

/* app.post('/almacen', function (req, res) {
  let tipo = req.body.seccion;
  
  let almacen;

let producto = {
  imagen : req.body.img,
  nombre : req.body.nombre,
  descripcion: req.body.descripcion,
  precio: req.body.precio
  };
  
 
  almacen[tipo].push(producto);
  res.send(almacen)  
})

app.listen(3000, function() {
  console.log('Escuchando puerto 3000');
}); */


app.post("/almacen", function(req, res) {
    let seccion = req.body.seccion
  //seccion = seccion.toLowerCase()
    let nombre = req.body.nombre
    let descripccion = req.body.descripccion
    let img = req.body.img
    let precio = req.body.precio

    let producto = {
      nombre : nombre,
      descripcion : descripccion,
      imagen : img,
      precio : precio
  }

    let boolean = false

    if (seccion == "armarios") {
        almacen.armarios.push(producto)
        boolean = true
    } else if (seccion == "mesas") {
        almacen.mesas.push(producto)
        boolean = true
    } else if (seccion == "sillas") {
        almacen.sillas.push(producto)
        boolean = true
    }
    if (boolean = false) {
        res.send({ error: true, mensaje: "Esa seccion no existe" })
    }
})


app.listen(3000, function() {
  console.log('Escuchando puerto 3000');
});










