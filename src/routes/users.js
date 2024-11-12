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
    .edit(req.body.token, req.body, req.params.id)
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
    .delete(req.body.token, req.params.id)
    .then((resultado) => {
      res.status(200).json({
        usuario_eliminado: resultado,
        mensaje: "Eliminado con éxito el usuario",
      });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
});

/* Publicaciones de Usuarios. */
router.get("/posts/:username", function (req, res, next) {
  usersControllers
    .userPosts(req.body.token, req.params.username)
    .then((resultado) => {
      res.status(200).json({
        publicaciones_usuario: resultado,
        mensaje: "Publicaciones ",
      });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
});

/* Feed de un Usuario. */
router.get("/feed/:username", function (req, res, next) {
  usersControllers
    .feed(req.body.token, req.params.username)
    .then((resultado) => {
      res.status(200).json({
        feed: resultado,
        mensaje: "Se ha cargado la feed exitosamente",
      });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
});

// Iniciar Sesion
router.post("/login", function (req, res, next) {
  usersControllers
    .login(req.body)
    .then((resultado) => {
      res
        .status(200)
        .json({
          data: resultado,
          mensaje: "Has iniciado sesion con exito",
        });
    })
    .catch((error) => {
      res.status(400).json({ mensaje: error });
    });
});

module.exports = router;
