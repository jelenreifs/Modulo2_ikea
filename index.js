
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

app.post("/add", function(req, res) {
    let seccion = req.body.seccion
   // seccion = seccion.toLowerCase()
    let add = {
        nombre : req.body.nombre,
        descripcion : req.body.descripccion,
        img : req.body.img,
        precio : req.body.precio,
  }
  

    if (seccion == "armarios") {
        almacen.armarios.push(add)
    } else if (seccion == "mesas") {
        añmacen.mesas.push(add)
    } else if (seccion == "sillas") {
        almacen.sillas.push(add)

  }

  res.send(add) 
  
})



app.listen(3000, function() {
  console.log('Escuchando puerto 3000');
});










