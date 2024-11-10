let express = require("express");
const commentsControllers = require("../controllers/comments.controllers");
let router = express.Router();

/* Registrar Comentario. */
router.post("/add/:username/:postId", function (req, res, next) {
  commentsControllers
    .add(req.body, req.params.username, req.params.postId)
    .then((resultado) => {
      res.status(201).json({
        comentario_realizado: resultado,
        mensaje: "Se ha publicado el comentario",
      });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
});

module.exports = router;
