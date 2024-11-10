const express = require("express");
const router = express.Router();
const postsControllers = require("../controllers/posts.controllers");

/* Registrar Publicaciones. */
router.post("/add/:username", function (req, res, next) {
  postsControllers
    .add(req.body, req.params.username)
    .then((resultado) => {
      res.status(201).json({
        publicacion_realizada: resultado,
        mensaje: "Se ha realizado la publicacion",
      });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
});

/* Actualizar Publicaciones. */
router.put("/update/:id", function (req, res, next) {
  postsControllers
    .update(req.body, req.params.id)
    .then((resultado) => {
      res.status(201).json({
        publicacion_actualizado: resultado,
        mensaje: "Editado con éxito la publicacion",
      });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
});

/* Eliminar Publicaciones. */
router.delete("/delete/:id", function (req, res, next) {
    postsControllers
    .delete(req.params.id)
    .then((resultado) => {
      res.status(200).json({
        publicacion_eliminado: resultado,
        mensaje: "Eliminado con éxito la publicacion",
      });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
});

module.exports = router;
