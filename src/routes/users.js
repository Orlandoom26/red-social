const express = require("express");
const router = express.Router();
const usersControllers = require("../controllers/users.controllers");

/* Registrar Usuarios. */
router.post("/register", function (req, res, next) {
  usersControllers
    .register(req.body)
    .then((resultado) => {
      res.status(201).json({
        usuario_registrado: resultado,
        mensaje: "Registrado el usuario con exito",
      });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
});

/* Actualizar Usuarios. */
router.put("/update/:id", function (req, res, next) {
  usersControllers
    .edit(req.body, req.params.id)
    .then((resultado) => {
      res.status(201).json({
        usuario_actualizado: resultado,
        mensaje: "Editado con éxito el usuario",
      });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
});

/* Eliminar Usuarios. */
router.delete("/delete/:id", function (req, res, next) {
  usersControllers
    .delete(req.params.id, req.body)
    .then((resultado) => {
      res
        .status(200)
        .json({
          usuario_eliminado: resultado,
          mensaje: "Eliminado con éxito el usuario",
        });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
});

module.exports = router;
